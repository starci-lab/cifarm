import { PlacedItemEntity } from "./placed-item"

export interface BuildingInfoEntity {
    id: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    currentUpgrade: number
    placedItemId: string
    placedItem?: PlacedItemEntity
}
