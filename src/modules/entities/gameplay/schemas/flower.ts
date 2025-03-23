import { FlowerId } from "../enums"
import { AbstractPlantSchema } from "./abstract"

export interface FlowerSchema extends AbstractPlantSchema<FlowerId> {
    honeyYieldCoefficient: number
    honeyQualityChancePlus: number 
}
