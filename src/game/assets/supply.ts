import { Scene } from "phaser"
import { TextureConfig } from "./types"
import { SupplyId } from "@/modules/entities"
import { fetchAsset } from "./fetch"

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
            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/supplies/basic-fertilizer.png",
            key: "basic-fertilizer",
        },
    },
    [SupplyId.AnimalFeed]: {
        name: "Animal Feed",
        textureConfig: {
            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/supplies/animal-feed.png",
            key: "animal-feed",
        },
    },
    [SupplyId.FruitFertilizer]: {
        name: "Fruit Fertilizer",
        textureConfig: {
            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/supplies/fruit-fertilizer.png",
            key: "fruit-fertilizer",
        },
    },
}

// Function to load all supply assets
export const loadSupplyAssets = async (scene: Scene) => {
    // Load all supply assets
    for (const supplyData of Object.values(supplyAssetMap)) {
        const { key, assetUrl, useExisting } = supplyData.textureConfig
        if (!useExisting) {
            if (!assetUrl) {
                throw new Error("Asset URL not found")
            }
            await fetchAsset({
                key,
                assetUrl,
                scene,
            })
        }
    }
}
