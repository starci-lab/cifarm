import { AssetData } from "./types"
import { SupplyId } from "../entities"

const PREFIX = "supplies"

export interface AssetSuppliesData {
    base: AssetData
}
export const assetSuppliesMap: Record<SupplyId, AssetSuppliesData> = {
    [SupplyId.AnimalFeed]: {
        base: {
            name: "Animal feed",
            assetUrl: `${PREFIX}/animal-feed.png`
        },
    },
    [SupplyId.BasicFertilizer]: {
        base: {
            name: "Basic fertilizer",
            assetUrl: `${PREFIX}/basic-fertilizer.png`
        },
    },
    [SupplyId.FruitFertilizer]: {
        base: {
            name: "Fruit fertilizer",
            assetUrl: `${PREFIX}/fruit-fertilizer.png`
        },
    }
}

