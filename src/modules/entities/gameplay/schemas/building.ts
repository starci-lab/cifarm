import { AnimalType, BuildingId } from "../enums"
import { UpgradeSchema } from "./upgrade"
import { PlacedItemTypeSchema } from "./placed-item-type"

export interface BuildingSchema {
    id: BuildingId
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    availableInShop: boolean
    type?: AnimalType
    maxUpgrade: number
    price?: number
    upgrades?: Array<UpgradeSchema>
    upgradeIds: Array<string>
    placedItemTypeId?: string
    placedItemType?: PlacedItemTypeSchema
}
