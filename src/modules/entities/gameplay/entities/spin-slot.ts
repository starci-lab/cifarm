import { SpinPrizeEntity } from "./spin-prize"
import { UuidAbstractEntity } from "./abstract"

export interface SpinSlotEntity extends UuidAbstractEntity {
    spinPrizeId: string
    spinPrize: SpinPrizeEntity
}