import { AbstractSchema } from "./abstract"
import { PlacedItemSchema } from "./placed-item"
import { UserSchema } from "./user"
import { CropCurrentState, CropId } from "../enums"
import { CropSchema } from "./crop"

export interface SeedGrowthInfoSchema extends AbstractSchema {
    currentStage: number
    currentStageTimeElapsed: number
    currentPerennialCount: number
    harvestQuantityRemaining: number
    harvestCount: number
    isQuality: boolean
    cropId: CropId
    crop: CropSchema
    currentState: CropCurrentState
    thiefedBy: Array<UserSchema>
    isFertilized: boolean
    placedItemId: string
    placedItem?: PlacedItemSchema
}