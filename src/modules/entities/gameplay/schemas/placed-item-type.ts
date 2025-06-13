import { StaticAbstractSchema } from "./abstract"
import { PlacedItemType, PlacedItemTypeId } from "../enums"

export interface PlacedItemTypeSchema extends StaticAbstractSchema<PlacedItemTypeId> {
    type: PlacedItemType
    sellable: boolean
    tile?: string
    building?: string
    animal?: string
    fruit?: string
    pet?: string
    terrain?: string
    decoration?: string
    sizeX: number
    sizeY: number
}