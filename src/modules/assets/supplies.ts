import { AssetData } from "./types"
import { SupplyId } from "../entities"

const PREFIX = "supplies"

export interface AssetSuppliesData {
    base: AssetData
}
export const assetSuppliesMap: Record<SupplyId, AssetSuppliesData> = {
    [SupplyId.AnimalFeed]: {
        base: {
            assetUrl: `${PREFIX}/animal-feed.png`
        },
    },
    [SupplyId.BasicFertilizer]: {
        base: {
            assetUrl: `${PREFIX}/basic-fertilizer.png`
        },
    },
    [SupplyId.FruitFertilizer]: {
        base: {
            assetUrl: `${PREFIX}/fruit-fertilizer.png`
        },
    }
}

