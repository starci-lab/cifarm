import { StaticAbstractSchema } from "./abstract"
import { AnimalId, BuildingId, PlacedItemType, PlacedItemTypeId, TileId } from "../enums"

export interface PlacedItemTypeSchema extends StaticAbstractSchema<PlacedItemTypeId> {
    type: PlacedItemType
    tile?: TileId
    building?: BuildingId
    animal?: AnimalId
}