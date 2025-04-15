import React, { FC, useEffect, useState } from "react"
import {
    PlantCurrentState,
    PlacedItemSchema,
    PlantType,
} from "@/modules/entities"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { Spacer, ExtendedBadge, Image } from "@/components"
import {
    assetProductMap,
    assetCropMap,
    assetFlowerMap,
    assetStateMap,
} from "@/modules/assets"
import { sessionDb } from "@/modules/dexie"
import useSWR from "swr"
import { cn } from "@/lib/utils"
import { formatTime } from "@/modules/common"
import { Stats } from "../Stats"
interface TileContentProps {
  placedItem: PlacedItemSchema;
}

interface PlantData {
  key: string;
  timeElapsed: number;
  name: string;
}

export const TileContent: FC<TileContentProps> = ({ placedItem }) => {
    const { swr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        GRAPHQL_QUERY_STATIC_SWR
    )

    const placedItemType = swr.data?.data.placedItemTypes.find(
        (placedItemType) => placedItemType.id === placedItem?.placedItemType
    )
    if (!placedItemType) {
        throw new Error("Placed item type not found")
    }

    const getPlantData = (): PlantData | null => {
        switch (placedItem.plantInfo?.plantType) {
        case PlantType.Crop: {
            const crop = swr.data?.data.crops.find(
                (crop) => crop.id === placedItem.plantInfo?.crop
            )
            if (!crop) {
                throw new Error("Crop not found")
            }
            const product = swr.data?.data.products.find(
                (product) => product.crop === crop.id
            )
            if (!product) {
                throw new Error("Product not found")
            }
            return {
                key: assetProductMap[product.displayId].base.assetKey,
                timeElapsed:
            crop.growthStageDuration -
            placedItem.plantInfo?.currentStageTimeElapsed,
                name: assetCropMap[crop.displayId].name,
            }
        }
        case PlantType.Flower: {
            const flower = swr.data?.data.flowers.find(
                (flower) => flower.id === placedItem.plantInfo?.flower
            )
            if (!flower) {
                throw new Error("Flower not found")
            }
            const product = swr.data?.data.products.find(
                (product) => product.flower === flower.id
            )
            if (!product) {
                throw new Error("Product not found")
            }
            return {
                key: assetProductMap[product.displayId].base.assetKey,
                timeElapsed:
            flower.growthStageDuration -
            placedItem.plantInfo?.currentStageTimeElapsed,
                name: assetFlowerMap[flower.displayId].name,
            }
        }
        default: {
            return null
        }
        }
    }

    const plantData = getPlantData()
    const [timeElapsed, setTimeElapsed] = useState(plantData?.timeElapsed ?? 0)

    useEffect(() => {
        if (
            placedItem.plantInfo?.currentState === PlantCurrentState.NeedWater ||
      placedItem.plantInfo?.currentState === PlantCurrentState.FullyMatured
        ) {
            return
        }
        const interval = setInterval(() => {
            setTimeElapsed(timeElapsed - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [timeElapsed])

    const { data: asset } = useSWR(placedItem.id, async () => {
        let key: string | undefined
        switch (placedItem.plantInfo?.currentState) {
        case PlantCurrentState.NeedWater: {
            key =
          assetStateMap.plant[PlantCurrentState.NeedWater]?.phaser.base.assetKey
            break
        }
        case PlantCurrentState.FullyMatured: {
            key = plantData?.key
            break
        }
        case PlantCurrentState.IsInfested: {
            key =
          assetStateMap.plant[PlantCurrentState.IsInfested]?.phaser.base.assetKey
            break
        }
        case PlantCurrentState.IsWeedy: {
            key =
            assetStateMap.plant[PlantCurrentState.IsWeedy]?.phaser.base.assetKey
            break
        }
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
        switch (placedItem.plantInfo?.currentState) {
        case PlantCurrentState.NeedWater:
            return (
                <div className="border p-2 rounded-md flex items-center gap-4">
                    <Image
                        src={asset?.data ? URL.createObjectURL(asset.data) : ""}
                        className="w-16 h-16 object-contain"
                    />
                    <div className="text-sm text-muted-foreground">
              The plant needs watering to continue growing. Use a watering can
              on it to resume its growth.
                    </div>
                </div>
            )
        case PlantCurrentState.IsWeedy:
            return (
                <div className="border p-2 rounded-md flex items-center gap-4">
                    <Image
                        src={asset?.data ? URL.createObjectURL(asset.data) : ""}
                        className="w-16 h-16 object-contain"
                    />
                    <div className="text-sm text-muted-foreground">
              The plant is weedy, which may reduce the yield when harvested. Use
              a herbicide on it to get rid of the weeds.
                    </div>
                </div>
            )
        case PlantCurrentState.IsInfested:
            return (
                <div className="border p-2 rounded-md flex items-center gap-4">
                    <Image
                        src={asset?.data ? URL.createObjectURL(asset.data) : ""}
                        className="w-16 h-16 object-contain"
                    />
                    <div className="text-sm text-muted-foreground">
              The plant is infested, which may reduce the yield when harvested.
              Use a pesticide on it to get rid of the pests.
                    </div>
                </div>
            )
        case PlantCurrentState.FullyMatured:
            return (
                <div className="border p-2 rounded-md flex items-center gap-4">
                    <Image
                        src={asset?.data ? URL.createObjectURL(asset.data) : ""}
                        className="w-16 h-16 object-contain"
                    />
                    <div className="flex flex-col">
                        <div className="text-sm text-muted-foreground">
                Your plant is ready to harvest.
                        </div>
                        <div className="flex items-center">
                            <div className="text-lg font-bold">
                                {`${placedItem.plantInfo.harvestQuantityRemaining}/20`}
                            </div>
                        </div>
                    </div>
                </div>
            )
        case PlantCurrentState.Normal:
            throw new Error("Plant is not ready to harvest")
        }
    }

    return (
        <>
            <div>
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
                {placedItem.plantInfo &&
          placedItem.plantInfo?.currentState !==
            PlantCurrentState.FullyMatured && (
                    <>
                        <div>
                            <div className="flex gap-1 items-center">
                                <div
                                    className={cn("text-4xl font-bold", {
                                        "text-destructive":
                        placedItem.plantInfo?.currentState ===
                        PlantCurrentState.NeedWater,
                                    })}
                                >
                                    {`${formatTime(timeElapsed)}`}
                                </div>
                            </div>
                        </div>
                        <Spacer y={4} />
                    </>
                )}
                {placedItem.plantInfo &&
          placedItem.plantInfo.currentState !== PlantCurrentState.Normal && (
                    <>
                        {renderState()}
                        <Spacer y={4} />
                    </>
                )}
                <Stats
                    growthAcceleration={placedItem.plantInfo?.growthAcceleration}
                    qualityYield={placedItem.plantInfo?.qualityYield}
                    diseaseResistance={placedItem.plantInfo?.diseaseResistance}
                    harvestYieldBonus={placedItem.plantInfo?.harvestYieldBonus}
                />
            </div>
        </>
    )
}
