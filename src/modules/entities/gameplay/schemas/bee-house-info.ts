import { AbstractSchema } from "./abstract"
import { BeeHouseCurrentState } from "../enums"

export interface BeeHouseInfoSchema extends AbstractSchema {
    currentYieldTime: number
    currentState: BeeHouseCurrentState
    thieves: Array<string>  
    harvestQuantityRemaining?: number
    harvestQuantityMin?: number
    harvestQuantityDesired?: number
    isQuality?: boolean
    growthAcceleration: number
    qualityYieldChance: number
    diseaseResistance: number
    harvestYieldBonus: number
    harvestCount: number
}
