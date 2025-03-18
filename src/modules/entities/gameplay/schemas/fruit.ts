import { FruitId } from "../enums"
import { StaticAbstractSchema } from "./abstract"

export interface FruitSchema extends StaticAbstractSchema<FruitId> {
    growthStageDuration: number
    growthStages: number
    price: number
    unlockLevel: number
    availableInShop: boolean
    minHarvestQuantity: number
    maxHarvestQuantity: number
    basicHarvestExperiences: number
    qualityHarvestExperiences: number
}