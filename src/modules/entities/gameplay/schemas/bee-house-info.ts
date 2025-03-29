import { AbstractSchema } from "./abstract"
import { BeeHouseCurrentState } from "../enums"

export interface BeeHouseInfoSchema extends AbstractSchema {
    timesHarvested: number
    currentYieldTime: number
    currentState: BeeHouseCurrentState
    thieves: Array<string>  
    harvestQuantityRemaining?: number
    harvestQuantityDesired?: number
    isQuality?: boolean
}