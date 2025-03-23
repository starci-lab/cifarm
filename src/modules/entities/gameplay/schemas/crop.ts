import { CropId } from "../enums"
import { AbstractPlantSchema } from "./abstract"

export interface CropSchema extends AbstractPlantSchema<CropId> {
    perennialCount: number
}
