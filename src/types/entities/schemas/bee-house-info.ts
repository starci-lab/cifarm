import { AbstractSchema } from "./abstract"
import { BeeHouseCurrentState } from "@/types"

export interface BeeHouseInfoSchema extends AbstractSchema {
    currentYieldTime: number
    currentState: BeeHouseCurrentState
    thieves: Array<string>  
    harvestQuantityRemaining?: number
    harvestQuantityMin?: number
    harvestQuantityDesired?: number
    isQuality?: boolean
    growthAcceleration: number
    qualityYield: number
    diseaseResistance: number
    harvestYieldBonus: number
    harvestCount: number
}
