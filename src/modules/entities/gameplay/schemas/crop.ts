import { ProductSchema } from "./product"
import { InventoryTypeSchema } from "./inventory-type"
import { SpinPrizeSchema } from "./spin-prize"
import { CropId } from "../enums"
import { StaticAbstractSchema } from "./abstract"

export interface CropSchema extends StaticAbstractSchema<CropId> {
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    growthStageDuration: number
    growthStages: number
    price: number
    premium: boolean
    unlockLevel: number
    perennialCount: number
    nextGrowthStageAfterHarvest: number
    minHarvestQuantity: number
    maxHarvestQuantity: number
    basicHarvestExperiences: number
    qualityHarvestExperiences: number
    availableInShop: boolean
    productIds?: string
    products?: Array<ProductSchema>
    inventoryTypeId?: string
    inventoryType?: InventoryTypeSchema
    spinPrizeIds: Array<string>
    spinPrizes?: Array<SpinPrizeSchema>
}
