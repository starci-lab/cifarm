import { Scene } from "phaser"
import { BaseData } from "./types"
import { SupplyId } from "@/modules/entities"
import { loadTexture } from "./utils"

export interface SupplyAssetData {
  name: string;
  base: BaseData;
}

export const supplyAssetMap: Record<
  SupplyId,
  SupplyAssetData
> = {
    [SupplyId.BasicFertilizer]: {
        name: "Basic Fertilizer",
        base: {
            textureConfig: {
                assetUrl: "supplies/basic-fertilizer.png",
                key: "basic-fertilizer",
            },
        },
    },
    [SupplyId.AnimalFeed]: {
        name: "Animal Feed",
        base: {
            textureConfig: {
                assetUrl: "supplies/animal-feed.png",
                key: "animal-feed",
            },
        },
    },
    [SupplyId.FruitFertilizer]: {
        name: "Fruit Fertilizer",
        base: {
            textureConfig: {
                assetUrl: "supplies/fruit-fertilizer.png",
                key: "fruit-fertilizer",
            },
        },
    },
}

// Function to load all supply assets
export const loadSupplyAssets = async (scene: Scene) => {
    // Load all supply assets
    const promises: Promise<void>[] = []
    for (const supplyData of Object.values(supplyAssetMap)) {
        if (supplyData.base) {
            promises.push(loadTexture(scene, supplyData.base.textureConfig))
        }
    }
    await Promise.all(promises)
}
