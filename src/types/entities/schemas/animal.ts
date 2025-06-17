import { AnimalId, AnimalType } from "../enums"
import { ProductSchema } from "./product"
import { InventoryTypeSchema } from "./inventory-type"
import { PlacedItemTypeSchema } from "./placed-item-type"
import { StaticAbstractSchema } from "./abstract"

export interface AnimalSchema extends StaticAbstractSchema<AnimalId> {
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    yieldTime: number
    offspringPrice: number
    isNFT: boolean
    price?: number
    growthTime: number
    availableInShop: boolean
    sellable?: boolean
    sellPrice?: number
    hungerTime: number
    unlockLevel: number
    minHarvestQuantity: number
    maxHarvestQuantity: number
    basicHarvestExperiences: number
    qualityHarvestExperiences: number
    type: AnimalType
    productIds: Array<string>
    products: Array<ProductSchema>
    inventoryTypeId: string
    inventoryType: InventoryTypeSchema
    placedItemTypeId?: string
    placedItemType?: PlacedItemTypeSchema
}
