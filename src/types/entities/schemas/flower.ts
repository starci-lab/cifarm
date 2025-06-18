import { FlowerId } from "@/types"
import { AbstractPlantSchema } from "./abstract"

export interface FlowerSchema extends AbstractPlantSchema<FlowerId> {
    honeyYieldCoefficient: number
    honeyQualityChancePlus: number 
}
