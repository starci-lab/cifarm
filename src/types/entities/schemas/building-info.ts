import { PlacedItemSchema } from "./placed-item"

export interface BuildingInfoSchema {
    id: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    currentUpgrade: number
    placedItemId: string
    placedItem?: PlacedItemSchema
}
