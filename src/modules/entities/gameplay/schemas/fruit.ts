import { FruitId } from "../enums"
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
}