import { SpinPrizeEntity } from "./spin-prize"
import { InventoryTypeEntity } from "./inventory-type"
import { SupplyType } from "../enums"

export interface SupplyEntity {
    type: SupplyType
    price: number
    availableInShop: boolean
    fertilizerEffectTimeReduce?: number
    inventoryTypeId: string
    inventoryType: InventoryTypeEntity
    spinPrizeIds: Array<string>
    spinPrizes?: Array<SpinPrizeEntity>
}