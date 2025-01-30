import { UuidAbstractEntity } from "./abstract"
import { UserEntity } from "./user"
import { SeedGrowthInfoEntity } from "./seed-grow-info"
import { TileInfoEntity } from "./tile-info"
import { AnimalInfoEntity } from "./animal-info"
import { BuildingInfoEntity } from "./building-info"
import { PlacedItemTypeEntity } from "./placed-item-type"

export interface PlacedItemEntity extends UuidAbstractEntity {
    x: number
    y: number
    userId?: string
    user?: UserEntity
    inventoryId?: string
    seedGrowthInfoId?: string
    seedGrowthInfo?: SeedGrowthInfoEntity
    tileInfoId?: string
    tileInfo?: TileInfoEntity
    animalInfoId?: string
    animalInfo?: AnimalInfoEntity
    buildingInfoId?: string
    buildingInfo?: BuildingInfoEntity
    placedItemIds?: Array<string>
    placedItems?: Array<PlacedItemEntity>
    parentId?: string
    parent?: PlacedItemEntity
    placedItemTypeId?: string
    placedItemType?: PlacedItemTypeEntity
}