import { AnimalCurrentState } from "../enums"
import { UserEntity } from "./user"
import { PlacedItemEntity } from "./placed-item"

export interface AnimalInfoEntity {
    id: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    currentGrowthTime: number
    currentHungryTime: number
    currentYieldTime: number
    isAdult: boolean
    isQuality: boolean
    yieldCount: number
    currentState: AnimalCurrentState
    harvestQuantityRemaining?: number
    thiefedBy: Array<UserEntity>
    immunized: boolean
    placedItemId: string
    placedItem?: PlacedItemEntity
}
