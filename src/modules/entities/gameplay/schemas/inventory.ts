import { InventoryTypeId } from "../enums"

export interface InventorySchema {
    id: string
    quantity: number
    user?: string
    inventoryType: InventoryTypeId
    inToolbar?: boolean
    index: number
}