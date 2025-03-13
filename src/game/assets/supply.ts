import { Scene } from "phaser"
import { TextureConfig } from "./types"
import { SupplyId } from "@/modules/entities"

export interface SupplyAssetData {
  name: string;
  textureConfig: TextureConfig;
}

export const supplyAssetMap: Record<
  SupplyId,
  SupplyAssetData
> = {
    [SupplyId.BasicFertilizer]: {
        name: "Basic Fertilizer",
        textureConfig: {
            assetUrl: "supplies/basic-fertilizer.png",
            key: "basic-fertilizer",
        },
    },
    [SupplyId.AnimalFeed]: {
        name: "Animal Feed",
        textureConfig: {
            assetUrl: "supplies/animal-feed.png",
            key: "animal-feed",
        },
    },
}

// Function to load inventory assets in Phaser scene
export const loadSupplyAssets = (scene: Scene) => {
    Object.keys(supplyAssetMap).forEach((supplyId) => {
        const _supplyId = supplyId as SupplyId 
        const supplyData = supplyAssetMap[_supplyId]

        if (!supplyData) {
            throw new Error(
                `Supply asset data not found for supplyId: ${supplyId}`
            )
        }

        const { key, assetUrl, useExisting } = supplyData.textureConfig
        if (useExisting) {
            return
        }
        scene.load.image(key, assetUrl)
    })
}
