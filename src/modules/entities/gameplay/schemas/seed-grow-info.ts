import { AbstractSchema } from "./abstract"
import { PlacedItemSchema } from "./placed-item"
import { UserSchema } from "./user"
import { CropCurrentState } from "../enums"

export interface SeedGrowthInfoSchema extends AbstractSchema {
    currentStage: number
    currentStageTimeElapsed: number
    currentPerennialCount: number
    harvestQuantityRemaining: number
    harvestCount: number
    isQuality: boolean
    crop: string
    currentState: CropCurrentState
    thiefedBy: Array<UserSchema>
    isFertilized: boolean
    placedItemId: string
    placedItem?: PlacedItemSchema
}