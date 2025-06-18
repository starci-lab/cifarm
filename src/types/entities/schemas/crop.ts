import { CropId } from "@/types"
import { AbstractPlantSchema } from "./abstract"

export interface CropSchema extends AbstractPlantSchema<CropId> {
    perennialCount: number
}
