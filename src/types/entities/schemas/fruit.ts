import { FruitId } from "@/types"
import { StaticAbstractSchema } from "./abstract"

export interface FruitSchema extends StaticAbstractSchema<FruitId> {
    youngGrowthStageDuration: number
    matureGrowthStageDuration: number
    fertilizerTime: number
    growthStages: number
    price: number
    unlockLevel: number
    availableInShop: boolean
    minHarvestQuantity: number
    maxHarvestQuantity: number
    basicHarvestExperiences: number
    qualityHarvestExperiences: number
    sellable?: boolean
    sellPrice?: number
    isNFT?: boolean
}