import {
    assetAnimalMap,
    assetBuildingMap,
    assetFruitMap,
    assetPetMap,
    assetTileMap,
} from "@/modules/assets"
import {
    PlacedItemType,
    StaticData,
} from "@/modules/entities"

export const getPlacedItemTypeName = (
    placedItemTypeId: string,
    staticData: StaticData
) => {
    const placedItemType = staticData.placedItemTypes?.find(
        (placedItemType) => placedItemType.id === placedItemTypeId
    )
    if (!placedItemType) {
        throw new Error("Placed item type not found")
    }
    switch (placedItemType?.type) {
    case PlacedItemType.Animal: {
        const animal = staticData.animals?.find(
            (animal) => animal.id === placedItemTypeId
        )
        if (!animal) {
            throw new Error("Animal not found")
        }
        return assetAnimalMap[animal.displayId].name
    }
    case PlacedItemType.Building: {
        const building = staticData.buildings?.find(
            (building) => building.id === placedItemTypeId
        )
        if (!building) {
            throw new Error("Building not found")
        }
        return assetBuildingMap[building.displayId].name
    }
    case PlacedItemType.Fruit: {
        const fruit = staticData.fruits?.find(
            (fruit) => fruit.id === placedItemTypeId
        )
        if (!fruit) {
            throw new Error("Fruit not found")
        }
        return assetFruitMap[fruit.displayId].name
    }
    case PlacedItemType.Pet: {
        const pet = staticData.pets?.find((pet) => pet.id === placedItemTypeId)
        if (!pet) {
            throw new Error("Pet not found")
        }
        return assetPetMap[pet.displayId].name
    }
    case PlacedItemType.Tile: {
        const tile = staticData.tiles?.find(
            (tile) => tile.id === placedItemTypeId
        )
        if (!tile) {
            throw new Error("Tile not found")
        }
        return assetTileMap[tile.displayId].name
    }
    }
}
