import { SupplyId, SupplyType } from "../enums"
import { StaticAbstractSchema } from "./abstract"

export interface SupplySchema extends StaticAbstractSchema<SupplyId> {
    type: SupplyType
    price: number
    availableInShop: boolean
    fertilizerEffectTimeReduce?: number
    inventoryType: string
    unlockLevel?: number
}