import { ProductEntity } from "./product"
import { InventoryTypeEntity } from "./inventory-type"
import { SpinPrizeEntity } from "./spin-prize"
import { CropId } from "../enums"

export interface CropEntity {
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
    products?: Array<ProductEntity>
    inventoryTypeId?: string
    inventoryType?: InventoryTypeEntity
    spinPrizeIds: Array<string>
    spinPrizes?: Array<SpinPrizeEntity>
}
