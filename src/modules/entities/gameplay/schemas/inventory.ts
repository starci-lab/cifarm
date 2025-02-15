import { AbstractSchema } from "./abstract"

export interface InventorySchema extends AbstractSchema {
    quantity: number
    user?: string
    inventoryType: string
    inToolbar?: boolean
    index: number
}