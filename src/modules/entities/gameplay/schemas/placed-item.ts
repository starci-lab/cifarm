import { AbstractSchema } from "./abstract"
import { UserSchema } from "./user"
import { TileInfoSchema } from "./tile-info"
import { AnimalInfoSchema } from "./animal-info"
import { BuildingInfoSchema } from "./building-info"
import { FruitInfoSchema } from "./fruit-info"
import { PlantInfoSchema } from "./plant-info"
import { BeeHouseInfoSchema } from "./bee-house-info"
import { NFTMetadataSchema } from "./nft-metadata"
import { PetInfoSchema } from "./pet-info"

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
    beeHouseInfo?: BeeHouseInfoSchema
    placedItemType: string
    fruitInfo?: FruitInfoSchema
    petInfo?: PetInfoSchema
    isStored?: boolean
    nftMetadata?: NFTMetadataSchema
}