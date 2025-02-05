import { AnimalEntity } from "./animal"
import { CropEntity } from "./crop"
import { InventoryEntity } from "./inventory"
import { ProductEntity } from "./product"
import { SupplyEntity } from "./supply"
import { TileEntity } from "./tile"
import { AvailableInType, InventoryType } from "../enums"

export interface InventoryTypeEntity {
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
    crop?: CropEntity
    animalId?: string
    animal?: AnimalEntity
    supplyId?: string
    supply?: SupplyEntity
    productId?: string
    product?: ProductEntity
    tileId?: string
    tile?: TileEntity
    inventories?: Array<InventoryEntity>
}