import { AbstractSchema } from "./abstract"
import { CropSchema } from "./crop"
import { SupplySchema } from "./supply"
import { SpinSlotSchema } from "./spin-slot"
import { SpinPrizeType, AppearanceChance } from "../enums"

export interface SpinPrizeSchema extends AbstractSchema {
    type: SpinPrizeType
    cropId?: string
    crop?: CropSchema
    supplyId?: string
    supply?: SupplySchema
    golds?: number
    tokens?: number
    quantity?: number
    appearanceChance: AppearanceChance
    spinSlotIds: Array<string>
    spinSlots?: Array<SpinSlotSchema>
}