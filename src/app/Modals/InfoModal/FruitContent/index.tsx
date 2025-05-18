import React, { FC, useEffect, useState } from "react"
import { FruitCurrentState, PlacedItemSchema } from "@/modules/entities"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { ExtendedBadge, Spacer, ExtendedButton, DialogFooter, DialogBody } from "@/components"
import {    
    assetProductMap,
    assetStateMap,
} from "@/modules/assets"
import useSWR from "swr"
import { sessionDb } from "@/modules/dexie"
import { formatTime } from "@/modules/common"
import { cn } from "@/lib/utils"
import { Stats } from "../Stats"
import { StateContainer } from "../StateContainer"

interface FruitContentProps {
  placedItem: PlacedItemSchema;
}

export const FruitContent: FC<FruitContentProps> = ({ placedItem }) => {
    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(GRAPHQL_QUERY_STATIC_SWR)

    const placedItemType = staticSwr.data?.data.placedItemTypes.find(
        (placedItemType) => placedItemType.id === placedItem?.placedItemType
    )
    if (!placedItemType) throw new Error("Placed item type not found")

    const fruit = staticSwr.data?.data.fruits.find(fruit => fruit.id === placedItemType.fruit)
    if (!fruit) throw new Error("Fruit not found")

    if (!placedItem.fruitInfo) throw new Error("Placed item fruit info not found")

    const isMatured = placedItem.fruitInfo.currentStage === (staticSwr.data?.data.fruitInfo.matureGrowthStage ?? 0) - 1
    const growthStageDuration = isMatured
        ? fruit.matureGrowthStageDuration
        : fruit.youngGrowthStageDuration

    const [timeElapsed, setTimeElapsed] = useState(0)

    useEffect(() => {
        setTimeElapsed(growthStageDuration - (placedItem.fruitInfo?.currentStageTimeElapsed ?? 0))
    }, [growthStageDuration, placedItem.fruitInfo?.currentStageTimeElapsed])

    useEffect(() => {
        if (
            placedItem.fruitInfo?.currentState === FruitCurrentState.NeedFertilizer ||
            placedItem.fruitInfo?.currentState === FruitCurrentState.FullyMatured
        ) {
            return
        }
        const interval = setInterval(() => {
            setTimeElapsed((prev) => prev - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [placedItem.fruitInfo?.currentState])

    const product = staticSwr.data?.data.products.find(product => product.fruit === fruit.id)
    if (!product) throw new Error("Product not found")

    const { data: asset } = useSWR(placedItem.id, async () => {
        let key: string | undefined
        switch (placedItem.fruitInfo?.currentState) {
        case FruitCurrentState.NeedFertilizer:
            key = assetStateMap.fruit[FruitCurrentState.NeedFertilizer]?.phaser.base.assetKey
            break
        case FruitCurrentState.IsBuggy:
            key = assetStateMap.fruit[FruitCurrentState.IsBuggy]?.phaser.base.assetKey
            break
        case FruitCurrentState.FullyMatured:
            key = assetProductMap[product.displayId].base.assetKey
            break
        }
        if (!key) return
        const asset = await sessionDb.assets.get({ key })
        if (!asset) throw new Error("Asset not found")
        return asset
    })

    const renderState = () => {
        switch (placedItem.fruitInfo?.currentState) {
        case FruitCurrentState.NeedFertilizer:
            return (
                <div className="flex items-center gap-4 p-3 bg-content-6">
                    <StateContainer
                        assetUrl={asset?.data ? URL.createObjectURL(asset.data) : ""}
                    />
                    <div className="text-sm text-muted-foreground">
                            The fruit needs fertilizer to continue growing. Consider purchasing fertilizer from the shop.
                    </div>
                </div>
            )
        case FruitCurrentState.IsBuggy:
            return (
                <div className="flex items-center gap-4 p-3 bg-content-6">
                    <StateContainer
                        assetUrl={asset?.data ? URL.createObjectURL(asset.data) : ""}
                    />
                    <div className="text-sm text-muted-foreground">
                            The fruit is buggy. Use a bug net from the shop to protect your yield.
                    </div>
                </div>
            )
        case FruitCurrentState.FullyMatured:
            return (
                <div className="flex items-center gap-4 p-3 bg-content-6">
                    <StateContainer
                        assetUrl={asset?.data ? URL.createObjectURL(asset.data) : ""}
                    />
                    <div className="flex flex-col">
                        <div className="text-sm text-muted-foreground">
                                The fruit is ready to harvest. Use the crate to harvest it.
                        </div>
                        <div className="text-lg font-bold">
                            {`${placedItem.fruitInfo.harvestQuantityRemaining}/${placedItem.fruitInfo.harvestQuantityDesired}`}
                        </div>
                    </div>
                </div>
            )
        case FruitCurrentState.Normal:
            throw new Error("Fruit is not in a special state")
        }
    }

    return (
        <DialogBody>
            <div className="flex items-center gap-4">
                <ExtendedBadge>
                    {`Stage ${(placedItem.fruitInfo?.currentStage ?? 0) + 1}`}
                </ExtendedBadge>
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
            </div>
            <Spacer y={4} />
            <div className="bg-content-2 rounded-lg overflow-hidden">
                <div className="p-3">
                    <div className={
                        cn(
                            "text-4xl text-primary",
                            {
                                "text-destructive": placedItem.fruitInfo?.currentState === FruitCurrentState.NeedFertilizer
                            }
                        )
                    }>
                        {formatTime(timeElapsed)}
                    </div>
                </div>
                {placedItem.fruitInfo &&
          placedItem.fruitInfo.currentState !== FruitCurrentState.Normal && (
                    <>
                        {renderState()}
                    </>
                )}
            </div>
            <Spacer y={4} />
            <Stats
                growthAcceleration={placedItem.fruitInfo?.growthAcceleration}
                qualityYield={placedItem.fruitInfo?.qualityYield}
                diseaseResistance={placedItem.fruitInfo?.diseaseResistance}
                harvestYieldBonus={placedItem.fruitInfo?.harvestYieldBonus}
            />
            {placedItem.nftMetadata && (
                <>
                    <Spacer y={4} />
                    <DialogFooter>
                        <ExtendedButton className="w-full">Manage</ExtendedButton>
                    </DialogFooter>
                </>
            )}
        </DialogBody>
    )
}
