import { AnimalCurrentState } from "../enums"
import { UserSchema } from "./user"
import { PlacedItemSchema } from "./placed-item"

export interface AnimalInfoSchema {
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
    thiefedBy: Array<UserSchema>
    animal: string
    immunized: boolean
    placedItemId: string
    placedItem?: PlacedItemSchema
}
