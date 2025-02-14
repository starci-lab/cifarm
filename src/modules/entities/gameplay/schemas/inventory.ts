import { UserSchema } from "./user"
import { InventoryTypeSchema } from "./inventory-type"
import { InventoryTypeId } from "../enums"

export interface InventorySchema {
    id: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    quantity: number
    tokenId?: string
    isPlaced: boolean
    userId: string
    user?: UserSchema
    inventoryType: InventoryTypeId
    inToolbar?: boolean
}