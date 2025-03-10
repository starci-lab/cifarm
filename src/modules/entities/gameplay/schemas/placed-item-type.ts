import { StaticAbstractSchema } from "./abstract"
import { PlacedItemType, PlacedItemTypeId } from "../enums"

export interface PlacedItemTypeSchema extends StaticAbstractSchema<PlacedItemTypeId> {
    type: PlacedItemType
    tile?: string
    building?: string
    animal?: string
}