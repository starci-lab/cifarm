import { SpinPrizeSchema } from "./spin-prize"
import { AbstractSchema } from "./abstract"

export interface SpinSlotSchema extends AbstractSchema {
    spinPrizeId: string
    spinPrize: SpinPrizeSchema
}