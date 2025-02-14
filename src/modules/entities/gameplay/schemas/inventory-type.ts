import { AnimalSchema } from "./animal"
import { CropSchema } from "./crop"
import { InventorySchema } from "./inventory"
import { ProductSchema } from "./product"
import { SupplySchema } from "./supply"
import { TileSchema } from "./tile"
import { AvailableInType, InventoryType } from "../enums"

export interface InventoryTypeSchema {
    id: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    type: InventoryType
    placeable: boolean
    deliverable: boolean
    asTool: boolean
    availableIn: AvailableInType
    maxStack: number
    cropId?: string
    crop?: CropSchema
    animalId?: string
    animal?: AnimalSchema
    supplyId?: string
    supply?: SupplySchema
    productId?: string
    product?: ProductSchema
    tileId?: string
    tile?: TileSchema
    inventories?: Array<InventorySchema>
}