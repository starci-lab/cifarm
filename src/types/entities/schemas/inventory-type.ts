import { InventoryType, InventoryTypeId } from "@/types"
import { StaticAbstractSchema } from "./abstract"

export interface InventoryTypeSchema extends StaticAbstractSchema<InventoryTypeId> {
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    type: InventoryType
    placeable: boolean
    deliverable: boolean
    asTool: boolean
    maxStack: number
    crop?: string
    supply?: string
    product?: string 
    tool?: string
    stackable: boolean
}