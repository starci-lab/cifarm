import React, { FC, useEffect, useState } from "react"
import { FruitCurrentState, PlacedItemSchema } from "@/modules/entities"
import { formatTime } from "@/modules/common"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { DialogFooter, Spacer, Image, ExtendedButton, ExtendedBadge } from "@/components"
import {
    assetProductMap,
    assetStateMap,
} from "@/modules/assets"
import useSWR from "swr"
import { sessionDb } from "@/modules/dexie"
import { Stats } from "../Stats"
import { cn } from "@/lib/utils"
interface FruitContentProps {
  placedItem: PlacedItemSchema;
}
export const FruitContent: FC<FruitContentProps> = ({ placedItem }) => {
    const { swr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        GRAPHQL_QUERY_STATIC_SWR
    )

    const placedItemType = swr.data?.data.placedItemTypes.find(
        (placedItemType) => placedItemType.id === placedItem?.placedItemType
    )
    if (!placedItemType) {
        throw new Error("Placed item type not found")
    }
    const fruit = swr.data?.data.fruits.find(
        (fruit) => fruit.id === placedItemType.fruit
    )

    if (!fruit) {
        throw new Error("Fruit not found")
    }
    if (!placedItem.fruitInfo) {
        throw new Error("Placed item fruit info not found")
    }
    const fruitInfo = swr.data?.data.fruitInfo
    if (!fruitInfo) {
        throw new Error("Fruit info not found")
    }
    const isMatured =
    placedItem.fruitInfo.currentStage === fruitInfo.matureGrowthStage - 1
    const growthStageDuration = isMatured
        ? fruit.matureGrowthStageDuration
        : fruit.youngGrowthStageDuration

    const [timeElapsed, setTimeElapsed] = useState(
        growthStageDuration - (placedItem.fruitInfo.currentStageTimeElapsed ?? 0)
    )

    useEffect(() => {
        if (
            placedItem.fruitInfo?.currentState === FruitCurrentState.NeedFertilizer ||
      placedItem.fruitInfo?.currentState === FruitCurrentState.FullyMatured
        ) {
            return
        }
        const interval = setInterval(() => {
            setTimeElapsed(timeElapsed - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [timeElapsed])

    const product = swr.data?.data.products.find(
        (product) => product.fruit === fruit.id
    )
    if (!product) {
        throw new Error("Product not found")
    }

    const { data: asset } = useSWR(placedItem.id, async () => {
        let key: string | undefined
        switch (placedItem.fruitInfo?.currentState) {
        case FruitCurrentState.NeedFertilizer:
            key =
          assetStateMap.fruit[FruitCurrentState.NeedFertilizer]?.phaser.base.assetKey
            break
        case FruitCurrentState.IsBuggy:
            key =
          assetStateMap.fruit[FruitCurrentState.IsBuggy]?.phaser.base.assetKey
            break
        case FruitCurrentState.FullyMatured:
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
        switch (placedItem.fruitInfo?.currentState) {
        case FruitCurrentState.NeedFertilizer:
            return (
                <div className="border p-2 rounded-md flex items-center gap-4">
                    <Image
                        src={asset?.data ? URL.createObjectURL(asset.data) : ""}
                        className="w-16 h-16 object-contain"
                    />
                    <div className="text-sm text-muted-foreground">
              The fruit needs fertilizer to continue growing. Consider purchasing fertilizer from the shop and applying it to your fruit to resume its growth.
                    </div>
                </div>
            )
        case FruitCurrentState.IsBuggy:
            return (
                <div className="border p-2 rounded-md flex items-center gap-4">
                    <Image
                        src={asset?.data ? URL.createObjectURL(asset.data) : ""}
                        className="w-16 h-16 object-contain"
                    />
                    <div className="text-sm text-muted-foreground">
                    The fruit is infested with bugs, which may reduce the yield when harvested. Consider purchasing a bug net from the shop and using it on your fruit to get rid of the bugs.
                    </div>
                </div>
            )
        case FruitCurrentState.FullyMatured:
            return (
                <div className="border p-2 rounded-md flex items-center gap-4">
                    <Image
                        src={asset?.data ? URL.createObjectURL(asset.data) : ""}
                        className="w-16 h-16 object-contain"
                    />
                    <div className="flex flex-col">
                        <div className="text-sm text-muted-foreground">
                            The fruit is ready to harvest. Use the crate to harvest.
                        </div>
                        <div className="flex items-center">
                            <div className="text-lg font-bold">
                                {`${placedItem.fruitInfo.harvestQuantityRemaining}/20`}
                            </div>
                        </div>
                    </div>
                </div>
            )
        case FruitCurrentState.Normal:
            throw new Error("Fruit is not ready to harvest")
        }
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
                    placedItem.fruitInfo?.currentState !==
          FruitCurrentState.FullyMatured && (
                        <>
                            <div>
                                <div className="flex gap-1 items-center">
                                    <div className={cn("text-4xl font-bold", {
                                        "text-destructive": placedItem.fruitInfo?.currentState === FruitCurrentState.NeedFertilizer,
                                    })}>
                                        {`${formatTime(timeElapsed)}`}
                                    </div>
                                </div>
                            </div>
                            <Spacer y={4}/>
                        </>
                    )}
                {
                    placedItem.fruitInfo?.currentState !== FruitCurrentState.Normal && (
                        <>
                            {renderState()}
                            <Spacer y={4}/>
                        </>
                    )
                }
                <Stats
                    growthAcceleration={placedItem.fruitInfo?.growthAcceleration}
                    qualityYield={placedItem.fruitInfo?.qualityYield}
                    diseaseResistance={placedItem.fruitInfo?.diseaseResistance}
                    harvestYieldBonus={placedItem.fruitInfo?.harvestYieldBonus}
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
            </div>

        </>
    )
}
