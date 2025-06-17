import { BeeHouseCurrentState, BuildingKind, PlacedItemSchema, ProductType } from "@/types"
import React, { FC, useEffect, useState } from "react"
import useSWR from "swr"
import { sessionDb } from "@/modules/dexie"
import { DialogFooter, Spacer, Image, ExtendedButton, ExtendedBadge, DialogBody } from "@/components"
import {
    assetProductMap,
} from "@/modules/assets"
import { formatTime, cn } from "@/utils"
import { Stats } from "../../Stats"
import { useAppSelector } from "@/redux"

interface BeeHouseContentProps {
    placedItem: PlacedItemSchema;
}
export const BeeHouseContent: FC<BeeHouseContentProps> = ({ placedItem }) => {
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)

    const placedItemType = staticData?.placedItemTypes.find(
        (placedItemType) => placedItemType.id === placedItem?.placedItemType
    )
    if (!placedItemType) {
        throw new Error("Placed item type not found")
    }
    const building = staticData?.buildings.find(
        (building) => building.id === placedItemType.building
    )
    if (!building) {
        throw new Error("Building not found")
    }
    if (building.kind !== BuildingKind.BeeHouse) {
        throw new Error("Building is not a bee house")
    }

    if (!placedItem.buildingInfo) {
        throw new Error("Placed item building info not found")
    }

    if (!placedItem.beeHouseInfo) {
        throw new Error("Placed item bee house info not found")
    }

    if (!building.beeHouseYieldTime) {
        throw new Error("Building bee house yield time not found")
    }

    const _timeElapsed = building?.beeHouseYieldTime - (placedItem.beeHouseInfo.currentYieldTime ?? 0)

    const [timeElapsed, setTimeElapsed] = useState(0)

    useEffect(() => {
        if (placedItem.beeHouseInfo?.currentState === BeeHouseCurrentState.Yield) return
        setTimeElapsed(_timeElapsed)
    }, [])

    useEffect(() => {
        if (
            placedItem.beeHouseInfo?.currentState === BeeHouseCurrentState.Yield
        ) {
            return
        }
        const interval = setInterval(() => {
            setTimeElapsed(timeElapsed - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [timeElapsed])

    const product = staticData?.products.find(
        (product) => 
            product.type === ProductType.BeeHouse &&
            product.building === building.id
    )
    if (!product) {
        throw new Error("Product not found")
    }

    const { data: asset } = useSWR(placedItem.id, async () => {
        let key: string | undefined
        switch (placedItem.beeHouseInfo?.currentState) {
        case BeeHouseCurrentState.Yield:
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
        switch (placedItem.beeHouseInfo?.currentState) {
        case BeeHouseCurrentState.Yield:
            return (
                <div className="bg-content-6 p-2 flex items-center gap-4">
                    <Image
                        src={asset?.data ? URL.createObjectURL(asset.data) : ""}
                        className="w-16 h-16 object-contain"
                    />
                    <div className="flex flex-col">
                        <div className="text-sm text-muted-foreground">
                Your bee house is ready to harvest. Use the crate to harvest it.
                        </div>
                        <div className="flex items-center">
                            <div className="text-lg font-bold">
                                {`${placedItem.beeHouseInfo.harvestQuantityRemaining}/${placedItem.beeHouseInfo.harvestQuantityDesired}`}
                            </div>
                        </div>
                    </div>
                </div>
            )
        case BeeHouseCurrentState.Normal:
            throw new Error("Bee house is not in a special state")
        }
    }

    return (
        <DialogBody>
            <div className="flex items-center gap-4">
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
            </div>   
            <div className="rounded-lg bg-content-2 overflow-hidden">
                {
                    placedItem.beeHouseInfo.currentState !== BeeHouseCurrentState.Yield && (
                        <>
                            <div className="p-3">
                                <div className="text-muted-foreground leading-none">
                        Yield time
                                </div>
                                <Spacer y={2}/>
                                <div className={
                                    cn(
                                        "text-4xl text-success leading-none"
                                    )
                                }>
                                    {formatTime(timeElapsed)}
                                </div>
                            </div>
                        </>
                    )
                }
                {placedItem.beeHouseInfo &&
          placedItem.beeHouseInfo.currentState !== BeeHouseCurrentState.Normal && (
                    <>
                        {renderState()}
                    </>
                )}
            </div>
            <Spacer y={4}/>
            <Stats
                growthAcceleration={placedItem.beeHouseInfo?.growthAcceleration}
                qualityYield={placedItem.beeHouseInfo?.qualityYield}
                diseaseResistance={placedItem.beeHouseInfo?.diseaseResistance}
                harvestYieldBonus={placedItem.beeHouseInfo?.harvestYieldBonus}
            />
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
        </DialogBody>
    )
}
