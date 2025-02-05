import { StringAbstractEntity } from "./abstract"
import { TileEntity } from "./tile"
import { BuildingEntity } from "./building"
import { AnimalEntity } from "./animal"
import { PlacedItemEntity } from "./placed-item"
import { AnimalId, BuildingId, PlacedItemType, PlacedItemTypeId, TileId } from "../enums"

export interface PlacedItemTypeEntity extends StringAbstractEntity {
    // override id to acheive the correct type
    id: PlacedItemTypeId
    type: PlacedItemType
    tileId?: TileId
    tile?: TileEntity
    buildingId?: BuildingId
    building?: BuildingEntity
    animalId?: AnimalId
    animal?: AnimalEntity
    placedItems: Array<PlacedItemEntity>
}