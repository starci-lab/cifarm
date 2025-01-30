import { StringAbstractEntity } from "./abstract"
import { TileEntity } from "./tile"
import { BuildingEntity } from "./building"
import { AnimalEntity } from "./animal"
import { PlacedItemEntity } from "./placed-item"
import { PlacedItemType } from "../enums"

export interface PlacedItemTypeEntity extends StringAbstractEntity {
    type: PlacedItemType
    tileId?: string
    tile?: TileEntity
    buildingId?: string
    building?: BuildingEntity
    animalId?: string
    animal?: AnimalEntity
    placedItems: Array<PlacedItemEntity>
}