import { AbstractSchema } from "./abstract"
import { PlacedItemSchema } from "./placed-item"
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
    thieves: Array<string>
    isFertilized: boolean
    placedItemId: string
    placedItem?: PlacedItemSchema
}