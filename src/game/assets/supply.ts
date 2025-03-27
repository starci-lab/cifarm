import { Scene } from "phaser"
import { TextureConfig } from "./types"
import { SupplyId } from "@/modules/entities"
import { loadTexture } from "./utils"

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
    [SupplyId.FruitFertilizer]: {
        name: "Fruit Fertilizer",
        textureConfig: {
            assetUrl: "supplies/fruit-fertilizer.png",
            key: "fruit-fertilizer",
        },
    },
}

// Function to load all supply assets
export const loadSupplyAssets = async (scene: Scene) => {
    // Load all supply assets
    const promises: Promise<void>[] = []
    for (const supplyData of Object.values(supplyAssetMap)) {
        promises.push(loadTexture(scene, supplyData.textureConfig))
    }
    await Promise.all(promises)
}
