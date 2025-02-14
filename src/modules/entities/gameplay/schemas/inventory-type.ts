import { AnimalSchema } from "./animal"
import { CropSchema } from "./crop"
import { InventorySchema } from "./inventory"
import { ProductSchema } from "./product"
import { SupplySchema } from "./supply"
import { TileSchema } from "./tile"
import { AvailableInType, InventoryType, InventoryTypeId } from "../enums"
import { StaticAbstractSchema } from "./abstract"

export interface InventoryTypeSchema extends StaticAbstractSchema<InventoryTypeId> {
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
    stackable: boolean
    inventories?: Array<InventorySchema>
}