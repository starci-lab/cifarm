import { UserEntity } from "./user"
import { InventoryTypeEntity } from "./inventory-type"

export interface InventoryEntity {
    id: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    quantity: number
    tokenId?: string
    isPlaced: boolean
    userId: string
    user?: UserEntity
    inventoryTypeId: string
    inventoryType: InventoryTypeEntity
}