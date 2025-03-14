import { AnimalCurrentState } from "../enums"
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
    thieves: Array<string>
    animal: string
    immunized: boolean
    placedItemId: string
    placedItem?: PlacedItemSchema
}
