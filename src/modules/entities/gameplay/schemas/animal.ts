import { AnimalId, AnimalType } from "../enums"
import { ProductSchema } from "./product"
import { InventoryTypeSchema } from "./inventory-type"
import { PlacedItemTypeSchema } from "./placed-item-type"

export interface AnimalSchema {
    id: AnimalId
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    yieldTime: number
    offspringPrice: number
    isNFT: boolean
    price?: number
    growthTime: number
    availableInShop: boolean
    hungerTime: number
    qualityProductChanceStack: number
    qualityProductChanceLimit: number
    minHarvestQuantity: number
    maxHarvestQuantity: number
    basicHarvestExperiences: number
    premiumHarvestExperiences: number
    type: AnimalType
    productIds: Array<string>
    products: Array<ProductSchema>
    inventoryTypeId: string
    inventoryType: InventoryTypeSchema
    placedItemTypeId?: string
    placedItemType?: PlacedItemTypeSchema
}
