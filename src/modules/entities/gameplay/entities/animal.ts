import { AnimalId, AnimalType } from "../enums"
import { ProductEntity } from "./product"
import { InventoryTypeEntity } from "./inventory-type"
import { PlacedItemTypeEntity } from "./placed-item-type"

export interface AnimalEntity {
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
    products: Array<ProductEntity>
    inventoryTypeId: string
    inventoryType: InventoryTypeEntity
    placedItemTypeId?: string
    placedItemType?: PlacedItemTypeEntity
}
