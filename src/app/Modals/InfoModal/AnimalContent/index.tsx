import React, { FC, useEffect, useState } from "react"
import { AnimalCurrentState, PlacedItemSchema } from "@/modules/entities"
import { formatTime } from "@/modules/common"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { DialogFooter, Spacer, Image, List, ExtendedButton, ExtendedBadge } from "@/components"
import {
    productAssetMap,
    stateAssetMap,
} from "@/game"
import useSWR from "swr"
import { sessionDb } from "@/modules/dexie"
import { StatsAttributeName, statsAttributeNameMap } from "@/modules/blockchain"
import { cn } from "@/lib/utils"
import { HARVEST_COUNT } from "../types"

interface AnimalContentProps {
  placedItem: PlacedItemSchema;
}
export const AnimalContent: FC<AnimalContentProps> = ({ placedItem }) => {
    const { swr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        GRAPHQL_QUERY_STATIC_SWR
    )

    const placedItemType = swr.data?.data.placedItemTypes.find(
        (placedItemType) => placedItemType.id === placedItem?.placedItemType
    )
    if (!placedItemType) {
        throw new Error("Placed item type not found")
    }
    const animal = swr.data?.data.animals.find(
        (animal) => animal.id === placedItemType.animal
    )

    if (!animal) {
        throw new Error("Animal not found")
    }
    if (!placedItem.animalInfo) {
        throw new Error("Placed item animal info not found")
    }
    const animalInfo = swr.data?.data.animalInfo
    if (!animalInfo) {
        throw new Error("Animal info not found")
    }
    const _timeElapsed = placedItem.animalInfo.isAdult
        ? animal.yieldTime - (placedItem.animalInfo.currentYieldTime ?? 0)
        : animal.growthTime - (placedItem.animalInfo.currentGrowthTime ?? 0)

    
    const [timeElapsed, setTimeElapsed] = useState(_timeElapsed)

    useEffect(() => {
        if (
            placedItem.animalInfo?.currentState === AnimalCurrentState.Hungry ||
      placedItem.animalInfo?.currentState === AnimalCurrentState.Sick
        ) {
            return
        }
        const interval = setInterval(() => {
            setTimeElapsed(timeElapsed - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [timeElapsed])

    const product = swr.data?.data.products.find(
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
          stateAssetMap.animal[AnimalCurrentState.Hungry]?.base
              .textureConfig.key
            break
        case AnimalCurrentState.Sick:
            key =
          stateAssetMap.animal[AnimalCurrentState.Sick]?.base.textureConfig
              .key
            break
        case AnimalCurrentState.Yield:
            key = productAssetMap[product.displayId].base.textureConfig.key
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
                <div className="border p-2 rounded-md flex items-center gap-4">
                    <Image
                        src={asset?.data ? URL.createObjectURL(asset.data) : ""}
                        className="w-16 h-16 object-contain"
                    />
                    <div className="text-sm text-muted-foreground">
              The animal is hungry. Purchase animal feed from the shop and feed it to the animal to resume its growth.
                    </div>
                </div>
            )
        case AnimalCurrentState.Sick:
            return (
                <div className="border p-2 rounded-md flex items-center gap-4">
                    <Image
                        src={asset?.data ? URL.createObjectURL(asset.data) : ""}
                        className="w-16 h-16 object-contain"
                    />
                    <div className="text-sm text-muted-foreground">
                    The animal is sick. Consider purchasing animal medicine from the shop and using it on your animal to get rid of the sickness.
                    </div>
                </div>
            )
        case AnimalCurrentState.Yield:
            return (
                <div className="border p-2 rounded-md flex items-center gap-4">
                    <Image
                        src={asset?.data ? URL.createObjectURL(asset.data) : ""}
                        className="w-16 h-16 object-contain"
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

    const renderStats = () => {
        return (
            <List
                enableScroll={false}
                items={
                    [HARVEST_COUNT, ...Object.values(StatsAttributeName)]
                } contentCallback={(name) => {
                    switch (name) {
                    case HARVEST_COUNT:
                        return <div className="flex justify-between px-3 py-2">
                            <div className="text-muted-foreground text-sm">Harvests</div>
                            <div>{placedItem.animalInfo?.harvestCount}</div>
                        </div>
                    case StatsAttributeName.GrowthAcceleration:
                        return <div className="flex justify-between px-3 py-2">
                            <div className="text-muted-foreground text-sm">{statsAttributeNameMap[name].name}</div>
                            <div>{placedItem.animalInfo?.growthAcceleration}</div>
                        </div>
                    case StatsAttributeName.QualityYieldChance:
                        return <div className="flex justify-between px-3 py-2">
                            <div className="text-muted-foreground text-sm">{statsAttributeNameMap[name].name}</div>
                            <div>{placedItem.animalInfo?.qualityYieldChance}</div>
                        </div>
                    case StatsAttributeName.DiseaseResistance:
                        return <div className="flex justify-between px-3 py-2">
                            <div className="text-muted-foreground text-sm">{statsAttributeNameMap[name].name}</div>
                            <div>{placedItem.animalInfo?.diseaseResistance}</div>
                        </div>
                    case StatsAttributeName.HarvestYieldBonus:
                        return <div className="flex justify-between px-3 py-2">
                            <div className="text-muted-foreground text-sm">{statsAttributeNameMap[name].name}</div>
                            <div>{placedItem.animalInfo?.harvestYieldBonus}</div>
                        </div>
                    }
                }} />
        )
    }

    return (
        <>
            <div>
                {
                    placedItem.nftMetadata && (
                        <>
                            <div className="flex items-center gap-2">
                                <ExtendedBadge>
                                    NFT
                                </ExtendedBadge>
                                <div className="text-sm text-muted-foreground">
                                    {placedItem.nftMetadata.nftName}
                                </div>
                            </div>
                            <Spacer y={4}/>
                        </>
                    )
                }
                {
                    placedItem.animalInfo?.currentState !==
          AnimalCurrentState.Yield && (
                        <>
                            <div>
                                <div className="flex gap-1 items-center">
                                    <div className={cn("text-4xl font-bold", {
                                        "text-destructive": placedItem.animalInfo?.currentState === AnimalCurrentState.Hungry,
                                    })}>
                                        {`${formatTime(timeElapsed)}`}
                                    </div>
                                </div>
                            </div>
                            <Spacer y={4}/>
                        </>
                    )}
                {
                    placedItem.animalInfo?.currentState !== AnimalCurrentState.Normal && (
                        <>
                            {renderState()}
                            <Spacer y={4}/>
                        </>
                    )
                }
                {renderStats()}
                {placedItem.nftMetadata && (
                    <>
                        <Spacer y={4}/>
                        <DialogFooter>
                            {
                                <ExtendedButton className="w-full">
                                        Manage
                                </ExtendedButton>
                            }
                        </DialogFooter>
                    </>
                ) 
                }
            </div>

        </>
    )
}
