import { StringAbstractEntity } from "./abstract"
import { TileEntity } from "./tile"
import { BuildingEntity } from "./building"
import { AnimalEntity } from "./animal"
import { PlacedItemEntity } from "./placed-item"
import { AnimalId, BuildingId, PlacedItemType, TileId } from "../enums"

export interface PlacedItemTypeEntity extends StringAbstractEntity {
    type: PlacedItemType
    tileId?: TileId
    tile?: TileEntity
    buildingId?: BuildingId
    building?: BuildingEntity
    animalId?: AnimalId
    animal?: AnimalEntity
    placedItems: Array<PlacedItemEntity>
}