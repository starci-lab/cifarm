import { UuidAbstractEntity } from "./abstract"
import { CropEntity } from "./crop"
import { SupplyEntity } from "./supply"
import { SpinSlotEntity } from "./spin-slot"
import { SpinPrizeType, AppearanceChance } from "../enums"

export interface SpinPrizeEntity extends UuidAbstractEntity {
    type: SpinPrizeType
    cropId?: string
    crop?: CropEntity
    supplyId?: string
    supply?: SupplyEntity
    golds?: number
    tokens?: number
    quantity?: number
    appearanceChance: AppearanceChance
    spinSlotIds: Array<string>
    spinSlots?: Array<SpinSlotEntity>
}