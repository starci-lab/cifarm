import { AbstractSchema } from "./abstract"
import { UserSchema } from "./user"
import { SeedGrowthInfoSchema } from "./seed-grow-info"
import { TileInfoSchema } from "./tile-info"
import { AnimalInfoSchema } from "./animal-info"
import { BuildingInfoSchema } from "./building-info"
import { PlacedItemTypeId } from "../enums"

export interface PlacedItemSchema extends AbstractSchema {
    x: number
    y: number
    userId: string
    user?: UserSchema
    inventoryId?: string
    seedGrowthInfoId?: string
    seedGrowthInfo?: SeedGrowthInfoSchema
    tileInfoId?: string
    tileInfo?: TileInfoSchema
    animalInfoId?: string
    animalInfo?: AnimalInfoSchema
    buildingInfoId?: string
    buildingInfo?: BuildingInfoSchema
    placedItemIds?: Array<string>
    placedItemType: PlacedItemTypeId
    parentId?: string
    parent?: PlacedItemSchema
}