import React, { FC, useEffect, useState } from "react"
import { AnimalCurrentState, PlacedItemSchema } from "@/modules/entities"
import { formatTime, cn } from "@/utils"
import {
    DialogFooter,
    Spacer,
    ExtendedButton,
    ExtendedBadge,
    DialogBody,
    Separator,
} from "@/components"
import useSWR from "swr"
import { sessionDb } from "@/modules/dexie"
import { Stats } from "../Stats"
import { assetStateMap, assetProductMap } from "@/modules/assets"
import { StateContainer } from "../StateContainer"
import { useAppSelector } from "@/redux"

interface AnimalContentProps {
  placedItem: PlacedItemSchema;
}

export const AnimalContent: FC<AnimalContentProps> = ({ placedItem }) => {
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)

    const placedItemType = staticData?.placedItemTypes.find(
        (placedItemType) => placedItemType.id === placedItem?.placedItemType
    )
    if (!placedItemType) {
        throw new Error("Placed item type not found")
    }
    const animal = staticData?.animals.find(
        (animal) => animal.id === placedItemType.animal
    )

    if (!animal) {
        throw new Error("Animal not found")
    }
    if (!placedItem.animalInfo) {
        throw new Error("Placed item animal info not found")
    }
    const _timeElapsed = placedItem.animalInfo.isAdult
        ? animal.yieldTime - (placedItem.animalInfo.currentYieldTime ?? 0)
        : animal.growthTime - (placedItem.animalInfo.currentGrowthTime ?? 0)

    const [timeElapsed, setTimeElapsed] = useState(0)
    useEffect(() => {
        setTimeElapsed(_timeElapsed)
    }, [])

    useEffect(() => {
        if (placedItem.animalInfo?.currentState === AnimalCurrentState.Hungry) {
            return
        }
        const interval = setInterval(() => {
            setTimeElapsed(timeElapsed - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [timeElapsed])

    const _hungryTimeElapsed =
    animal.hungerTime - (placedItem.animalInfo?.currentHungryTime ?? 0)
    const [hungryTimeElapsed, setHungryTimeElapsed] = useState(0)

    useEffect(() => {
        setHungryTimeElapsed(_hungryTimeElapsed)
    }, [])

    useEffect(() => {
        if (hungryTimeElapsed === 0) return
        if (placedItem.animalInfo?.currentState === AnimalCurrentState.Hungry)
            return
        const interval = setInterval(() => {
            setHungryTimeElapsed(hungryTimeElapsed - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [hungryTimeElapsed])

    useEffect(() => {
        if (hungryTimeElapsed === 0) {
            return
        }
        if (placedItem.animalInfo?.currentState === AnimalCurrentState.Hungry) {
            return
        }
        const interval = setInterval(() => {
            setHungryTimeElapsed(hungryTimeElapsed - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [hungryTimeElapsed])

    const product = staticData?.products.find(
        (product) => product.animal === animal.id
    )
    if (!product) {
        throw new Error("Product not found")
    }

    const { data: asset } = useSWR(placedItem.id, async () => {
        let key: string | undefined
        switch (placedItem.animalInfo?.currentState) {
        case AnimalCurrentState.Hungry:
            key =
          assetStateMap.animal[AnimalCurrentState.Hungry]?.phaser.base.assetKey
            break
        case AnimalCurrentState.Sick:
            key =
          assetStateMap.animal[AnimalCurrentState.Sick]?.phaser.base.assetKey
            break
        case AnimalCurrentState.Yield:
            key = assetProductMap[product.displayId].base.assetKey
            break
        }
        if (!key) {
            return
        }
        const asset = await sessionDb.assets.get({
            key,
        })
        if (!asset) {
            throw new Error("Asset not found")
        }
        return asset
    })

    const renderState = () => {
        switch (placedItem.animalInfo?.currentState) {
        case AnimalCurrentState.Hungry:
            return (
                <div className="p-3 flex items-center gap-4 bg-content-6">
                    <StateContainer
                        assetUrl={asset?.data ? URL.createObjectURL(asset.data) : ""}
                    />
                    <div className="text-sm text-muted-foreground">
              The animal is hungry. Purchase animal feed from the shop and feed
              it to the animal to resume its growth.
                    </div>
                </div>
            )
        case AnimalCurrentState.Sick:
            return (
                <div className="p-3 flex items-center gap-4 bg-content-6">
                    <StateContainer
                        assetUrl={asset?.data ? URL.createObjectURL(asset.data) : ""}
                    />
                    <div className="text-sm text-muted-foreground">
              The animal is sick. Consider purchasing animal medicine from the
              shop and using it on your animal to get rid of the sickness.
                    </div>
                </div>
            )
        case AnimalCurrentState.Yield:
            return (
                <div className="p-3 flex items-center gap-4 bg-content-6">
                    <StateContainer
                        assetUrl={asset?.data ? URL.createObjectURL(asset.data) : ""}
                    />
                    <div className="flex flex-col">
                        <div className="text-sm text-muted-foreground">
                The animal is ready to harvest. Use the crate to harvest.
                        </div>
                        <div className="flex items-center">
                            <div className="text-lg font-bold">
                                {`${placedItem.animalInfo.harvestQuantityRemaining}/20`}
                            </div>
                        </div>
                    </div>
                </div>
            )
        case AnimalCurrentState.Normal:
            throw new Error("Animal is not ready to harvest")
        }
    }
    return (
        <>
            <DialogBody>
                <div className="flex items-center gap-4">
                    {placedItem.nftMetadata && (
                        <>
                            <div className="flex items-center gap-2">
                                <ExtendedBadge>NFT</ExtendedBadge>
                                <div className="text-sm text-muted-foreground">
                                    {placedItem.nftMetadata.nftName}
                                </div>
                            </div>
                            <Spacer y={4} />
                        </>
                    )}
                </div>
                <div className="bg-content-2 rounded-lg overflow-hidden">
                    <div className="gap-4">
                        {placedItem.animalInfo?.currentState !==
              AnimalCurrentState.Yield && (
                            <>
                                <div className="p-3 items-center">
                                    <div className="text-muted-foreground leading-none">
                                        {placedItem.animalInfo?.isAdult
                                            ? "Harvest time"
                                            : "Growth time"}
                                    </div>
                                    <Spacer y={2} />
                                    <div
                                        className={cn("text-4xl text-success leading-none", {
                                            "text-destructive":
                        placedItem.animalInfo?.currentState ===
                          AnimalCurrentState.Hungry ||
                        placedItem.animalInfo?.currentState ===
                          AnimalCurrentState.Sick,
                                        })}
                                    >
                                        {formatTime(timeElapsed)}
                                    </div>
                                </div>
                                <Separator />
                            </>
                        )}
                        <div className="p-3 flex items-center justify-between">
                            <div className="text-muted-foreground leading-none">
                Hungry time
                            </div>
                            <div className="leading-none">
                                {formatTime(hungryTimeElapsed)}
                            </div>
                        </div>
                    </div>
                    {placedItem.animalInfo &&
            placedItem.animalInfo.currentState !==
              AnimalCurrentState.Normal && <>{renderState()}</>}
                </div>
                <Spacer y={4} />
                <Stats
                    growthAcceleration={placedItem.animalInfo?.growthAcceleration}
                    qualityYield={placedItem.animalInfo?.qualityYield}
                    diseaseResistance={placedItem.animalInfo?.diseaseResistance}
                    harvestYieldBonus={placedItem.animalInfo?.harvestYieldBonus}
                />
                {placedItem.nftMetadata && (
                    <>
                        <Spacer y={4} />
                        <DialogFooter>
                            {<ExtendedButton className="w-full">Manage</ExtendedButton>}
                        </DialogFooter>
                    </>
                )}
            </DialogBody>
        </>
    )
}
