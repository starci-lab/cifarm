import { SpinPrizeSchema } from "./spin-prize"
import { InventoryTypeSchema } from "./inventory-type"
import { SupplyId, SupplyType } from "../enums"
import { StaticAbstractSchema } from "./abstract"

export interface SupplySchema extends StaticAbstractSchema<SupplyId> {
    type: SupplyType
    price: number
    availableInShop: boolean
    fertilizerEffectTimeReduce?: number
    inventoryTypeId: string
    inventoryType: InventoryTypeSchema
    spinPrizeIds: Array<string>
    spinPrizes?: Array<SpinPrizeSchema>
}