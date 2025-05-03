import { PlacedItemType } from "../enums"
import { PlacedItemSchema, PlacedItemTypeSchema } from "../schemas"
import { StaticData } from "./types"

export interface GetSellInfoParams {
  placedItem: PlacedItemSchema;
  staticData: StaticData;
}

export interface GetSellInfoResponse {
    sellable: boolean;
    sellPrice?: number;
}

export const getSellInfo = ({
    placedItem,
    staticData,
}: GetSellInfoParams): GetSellInfoResponse => {
    const placedItemType = staticData.placedItemTypes?.find(
        (placedItemType) => placedItemType.id === placedItem.placedItemType
    )
    if (!placedItemType) throw new Error("Placed item type not found")
    return getSellInfoFromPlacedItemType({
        placedItemType,
        staticData,
    })
}

export interface GetSellInfoFromPlacedItemTypeParams {
    placedItemType: PlacedItemTypeSchema;
    staticData: StaticData;
}
export const getSellInfoFromPlacedItemType = ({
    placedItemType,
    staticData,
}: GetSellInfoFromPlacedItemTypeParams): GetSellInfoResponse => {
    switch (placedItemType.type) {
    case PlacedItemType.Animal: {
        const animal = staticData.animals?.find(
            (animal) => animal.id === placedItemType.animal
        )
        if (!animal) throw new Error("Animal not found")
        return {
            sellable: animal.sellable ?? false,
            sellPrice: animal.sellPrice,
        }
    }
    case PlacedItemType.Tile: {
        console.log(staticData.tiles)
        const tile = staticData.tiles?.find(
            (tile) => tile.id === placedItemType.tile
        )
        if (!tile) throw new Error("Tile not found")
        return {
            sellable: tile.sellable ?? false,
            sellPrice: tile.sellPrice,
        }
    }
    case PlacedItemType.Pet: {
        const pet = staticData.pets?.find(
            (pet) => pet.id === placedItemType.pet
        )
        if (!pet) throw new Error("Pet not found")
        return {
            sellable: pet.sellable ?? false,
            sellPrice: pet.sellPrice,
        }
    }
    case PlacedItemType.Building: {
        const building = staticData.buildings?.find(
            (building) => building.id === placedItemType.building
        )
        if (!building) throw new Error("Building not found")
        return {
            sellable: building.sellable ?? false,
            sellPrice: building.sellPrice,
        }
    }
    case PlacedItemType.Fruit: {
        const fruit = staticData.fruits?.find(
            (fruit) => fruit.id === placedItemType.fruit
        )
        if (!fruit) throw new Error("Fruit not found")
        return {
            sellable: fruit.sellable ?? false,
            sellPrice: fruit.sellPrice,
        }
    }
    }
}

