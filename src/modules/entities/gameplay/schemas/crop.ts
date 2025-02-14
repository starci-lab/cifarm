import { ProductSchema } from "./product"
import { InventoryTypeSchema } from "./inventory-type"
import { SpinPrizeSchema } from "./spin-prize"
import { CropId } from "../enums"

export interface CropSchema {
    id: CropId
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    growthStageDuration: number
    growthStages: number
    price: number
    premium: boolean
    perennialCount: number
    nextGrowthStageAfterHarvest: number
    minHarvestQuantity: number
    maxHarvestQuantity: number
    basicHarvestExperiences: number
    premiumHarvestExperiences: number
    availableInShop: boolean
    productIds?: string
    products?: Array<ProductSchema>
    inventoryTypeId?: string
    inventoryType?: InventoryTypeSchema
    spinPrizeIds: Array<string>
    spinPrizes?: Array<SpinPrizeSchema>
}
