import React, { FC, useEffect, useState } from "react"
import {
    PlantCurrentState,
    PlacedItemSchema,
    PlantType,
} from "@/modules/entities"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { Spacer, Separator, ScaledImage } from "@/components"
import {
    assetProductMap,
    assetCropMap,
    assetFlowerMap,
    assetStateMap,
} from "@/modules/assets"
import { sessionDb } from "@/modules/dexie"
import useSWR from "swr"
import { Stats } from "../Stats"
import { formatTime } from "@/modules/common"
import { StateContainer } from "../StateContainer"
import { cn } from "@/lib/utils"

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
    const [timeElapsed, setTimeElapsed] = useState(0)
    useEffect(() => {
        setTimeElapsed(plantData?.timeElapsed ?? 0)
    }, [])

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
                <div className="flex items-center gap-4 p-3 bg-content-6">
                    <StateContainer
                        assetUrl={asset?.data ? URL.createObjectURL(asset.data) : ""}
                    />
                    <div className="text-sm text-muted-foreground">
              The plant needs watering to continue growing. Use a watering can
              on it to resume its growth.
                    </div>
                </div>
            )
        case PlantCurrentState.IsWeedy:
            return (
                <div className="flex items-center gap-4 p-3 bg-content-6">
                    <StateContainer
                        assetUrl={asset?.data ? URL.createObjectURL(asset.data) : ""}
                    />
                    <div className="text-sm text-muted-foreground">
              The plant is weedy, which may reduce the yield when harvested. Use
              a herbicide on it to get rid of the weeds.
                    </div>
                </div>
            )
        case PlantCurrentState.IsInfested:
            return (
                <div className="flex items-center gap-4 p-3 bg-content-6">
                    <StateContainer
                        assetUrl={asset?.data ? URL.createObjectURL(asset.data) : ""}
                    />
                    <div className="text-sm text-muted-foreground">
              The plant is infested, which may reduce the yield when harvested.
              Use a pesticide on it to get rid of the pests.
                    </div>
                </div>
            )
        case PlantCurrentState.FullyMatured:
            return (
                <div className="flex items-center gap-4 p-3 bg-content-6">
                    <StateContainer
                        assetUrl={asset?.data ? URL.createObjectURL(asset.data) : ""}
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

    const getPlantInfo = () => {
        if (!placedItem.plantInfo?.plantType) {
            return null
        }
        switch (placedItem.plantInfo?.plantType) {
        case PlantType.Crop: {
            const crop = swr.data?.data.crops.find(
                (crop) => crop.id === placedItem.plantInfo?.crop
            )
            if (!crop) {
                throw new Error("Crop not found")
            }
            const displayId = crop.displayId
            const { name, description, base: { stages } } = assetCropMap[displayId]
            const product = swr.data?.data.products.find(
                (product) => product.crop === crop.id
            )
            if (!product) {
                throw new Error("Product not found")
            }
            const assetUrl = assetProductMap[product.displayId].base.assetUrl
            const stage = stages[placedItem.plantInfo?.currentStage ?? 0]
            return {
                name,
                description,
                assetUrl,
                stage,
            }
        }
        case PlantType.Flower: {
            const flower = swr.data?.data.flowers.find(
                (flower) => flower.id === placedItem.plantInfo?.flower
            )
            if (!flower) {
                throw new Error("Flower not found")
            }
            const displayId = flower.displayId
            const { name, description, base: { stages } } = assetFlowerMap[displayId]
            const product = swr.data?.data.products.find(
                (product) => product.flower === flower.id
            )
            if (!product) {
                throw new Error("Product not found")
            }
            const assetUrl = assetProductMap[product.displayId].base.assetUrl
            const stage = stages[placedItem.plantInfo?.currentStage ?? 0]
            return {
                name,
                description,
                assetUrl,
                stage,
            }
        }
        }
    }

    const plantInfo = getPlantInfo()
    return (
        <div>
            { placedItem.plantInfo &&
             <>
                 <div className="bg-content-2 rounded-lg overflow-hidden">
                     <div className="px-3 py-2 text-lg text-secondary">
                         {plantInfo?.name}
                     </div>
                     <Separator />
                     <div className="flex gap-4 p-3 items-center">
                         <ScaledImage
                             src={plantInfo?.stage.assetUrl ?? ""}
                         />
                         <div>
                             <div>
                                 {`Stage ${(placedItem.plantInfo?.currentStage ?? 0) + 1}`}
                             </div>
                             <div className={
                                 cn(
                                     "text-4xl text-primary",
                                     {
                                         "text-destructive": placedItem.plantInfo.currentState === PlantCurrentState.NeedWater
                                     }
                                 )
                             }>
                                 {formatTime(timeElapsed)}
                             </div>
                         </div>
                     </div>
                     {placedItem.plantInfo &&
          placedItem.plantInfo.currentState !== PlantCurrentState.Normal && (
                         <>
                             {renderState()}
                         </>
                     )}
                 </div>
                 <Spacer y={4} />
             </>
            }
            <Stats
                growthAcceleration={placedItem.plantInfo?.growthAcceleration ?? 0}
                qualityYield={placedItem.plantInfo?.qualityYield ?? 0}
                diseaseResistance={placedItem.plantInfo?.diseaseResistance ?? 0}
                harvestYieldBonus={placedItem.plantInfo?.harvestYieldBonus ?? 0}
            />
        </div>
    )
}
