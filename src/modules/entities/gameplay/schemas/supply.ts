import { SpinPrizeSchema } from "./spin-prize"
import { InventoryTypeSchema } from "./inventory-type"
import { SupplyType } from "../enums"

export interface SupplySchema {
    type: SupplyType
    price: number
    availableInShop: boolean
    fertilizerEffectTimeReduce?: number
    inventoryTypeId: string
    inventoryType: InventoryTypeSchema
    spinPrizeIds: Array<string>
    spinPrizes?: Array<SpinPrizeSchema>
}