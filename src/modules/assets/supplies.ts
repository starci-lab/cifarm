import { AssetData, AssetTextureData, Metadata } from "./types"
import { SupplyId } from "../entities"
import { getAssetUrl } from "./utils"

const PREFIX = "/supplies"

export interface AssetSuppliesData extends Metadata {
    base: AssetData
    phaser: {
        item: AssetTextureData
    }
}

export const assetSuppliesMap: Record<SupplyId, AssetSuppliesData> = {
    [SupplyId.AnimalFeed]: {
        name: "Animal Feed",
        description: "Nutritious feed for farm animals.",
        base: {
            assetKey: "supplies-animal-feed",
            assetUrl: getAssetUrl(`${PREFIX}/animal-feed.png`)
        },
        phaser: {
            item: {
                assetKey: "supplies-animal-feed",
                assetUrl: getAssetUrl(`${PREFIX}/animal-feed.png`)
            },
        },
    },
    [SupplyId.BasicFertilizer]: {
        name: "Basic Fertilizer",
        description: "Standard fertilizer for crop growth.",
        base: {
            assetKey: "supplies-basic-fertilizer",
            assetUrl: `${PREFIX}/basic-fertilizer.png`
        },
        phaser: {
            item: {
                assetKey: "supplies-basic-fertilizer",
                assetUrl: `${PREFIX}/basic-fertilizer.png`
            },
        },
    },
    [SupplyId.FruitFertilizer]: {
        name: "Fruit Fertilizer",
        description: "Specialized fertilizer for fruit trees.",
        base: {
            assetKey: "supplies-fruit-fertilizer",
            assetUrl: `${PREFIX}/fruit-fertilizer.png`
        },
        phaser: {
            item: {
                assetKey: "supplies-fruit-fertilizer",
                assetUrl: `${PREFIX}/fruit-fertilizer.png`
            },
        },
    },
}

