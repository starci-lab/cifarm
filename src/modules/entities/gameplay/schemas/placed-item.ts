import { AbstractSchema } from "./abstract"
import { UserSchema } from "./user"
import { TileInfoSchema } from "./tile-info"
import { AnimalInfoSchema } from "./animal-info"
import { BuildingInfoSchema } from "./building-info"
import { FruitInfoSchema } from "./fruit-info"
import { PlantInfoSchema } from "./plant-info"

export interface PlacedItemSchema extends AbstractSchema {
    x: number
    y: number
    userId: string
    user?: UserSchema
    inventoryId?: string
    plantInfo?: PlantInfoSchema
    tileInfo?: TileInfoSchema
    animalInfo?: AnimalInfoSchema
    buildingInfo?: BuildingInfoSchema
    placedItemType: string
    fruitInfo?: FruitInfoSchema
}