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
    seedGrowthInfo?: SeedGrowthInfoSchema
    tileInfo?: TileInfoSchema
    animalInfo?: AnimalInfoSchema
    buildingInfo?: BuildingInfoSchema
    placedItemType: PlacedItemTypeId
}