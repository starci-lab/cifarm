import { AbstractSchema } from "./abstract"
import { PlacedItemSchema } from "./placed-item"
import { PlantCurrentState, PlantType } from "../enums"

export interface PlantInfoSchema extends AbstractSchema {
    currentStage: number
    currentStageTimeElapsed: number
    currentPerennialCount: number
    harvestQuantityRemaining: number
    harvestCount: number
    isQuality: boolean
    crop: string
    flower: string
    currentState: PlantCurrentState
    thieves: Array<string>
    isFertilized: boolean
    placedItemId: string
    placedItem?: PlacedItemSchema
    plantType: PlantType 
    qualityYield: number
    growthAcceleration: number
    harvestYieldBonus: number
    diseaseResistance: number
}