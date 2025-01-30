import { AnimalType } from "../enums"
import { UpgradeEntity } from "./upgrade"
import { PlacedItemTypeEntity } from "./placed-item-type"

export interface BuildingEntity {
    id: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    availableInShop: boolean
    type?: AnimalType
    maxUpgrade: number
    price?: number
    upgrades?: Array<UpgradeEntity>
    upgradeIds: Array<string>
    placedItemTypeId?: string
    placedItemType?: PlacedItemTypeEntity
}
