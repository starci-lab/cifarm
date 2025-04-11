import { QueryStaticResponse } from "../apollo"
import { PlacedItemSchema, PlacedItemType    } from "../entities"
import { AnimalAge, assetAnimalMap } from "./animals"
import { assetBuildingMap } from "./buildings"
import { assetFruitMap } from "./fruits"
import { assetPetMap } from "./pets"
import { assetTileMap } from "./tiles"
import { AssetData, AssetMapData } from "./types"


export interface GetAssetDataFromPlacedItemParams<T extends boolean> {
    placedItem: PlacedItemSchema
    staticData: Partial<QueryStaticResponse>
    phaserMap?: T
}

type ResponseType<T> = T extends true ? AssetMapData : AssetData;

export const getAssetDataFromPlacedItem = <T extends boolean>({
    placedItem,
    staticData,
    phaserMap = false as T,
}: GetAssetDataFromPlacedItemParams<T>): ResponseType<T> => {
    if (!staticData.placedItemTypes) {
        throw new Error("Placed item types not found")
    }
    const placedItemType = staticData.placedItemTypes.find((placedItemType) => placedItemType.id === placedItem.placedItemType)
    if (!placedItemType) {
        throw new Error("Placed item type not found")
    }
    switch (placedItemType.type) {
    case PlacedItemType.Animal: {
        if (!staticData.animals) {
            throw new Error("Animals not found")
        }
        const animal = staticData.animals.find((animal) => animal.id === placedItemType.animal)
        if (!animal) {
            throw new Error("Animal not found")
        }
        const age = placedItem.animalInfo?.isAdult ? AnimalAge.Adult : AnimalAge.Baby
        if (!phaserMap) {
            return assetAnimalMap[animal.displayId].base.ages[age] as ResponseType<T>
        }
        return assetAnimalMap[animal.displayId].phaser.map.ages[age] as ResponseType<T>
    }
    case PlacedItemType.Building: {
        if (!staticData.buildings) {
            throw new Error("Buildings not found")
        }
        const building = staticData.buildings.find((building) => building.id === placedItemType.building)
        if (!building) {
            throw new Error("Building not found")
        }
        if (!phaserMap) {
            return assetBuildingMap[building.displayId].base as ResponseType<T>
        }
        return assetBuildingMap[building.displayId].phaser.map as ResponseType<T>
    }
    case PlacedItemType.Tile: {
        if (!staticData.tiles) {
            throw new Error("Tiles not found")
        }
        const tile = staticData.tiles.find((tile) => tile.id === placedItemType.tile)
        if (!tile) {
            throw new Error("Tile not found")
        }
        if (!phaserMap) {
            return assetTileMap[tile.displayId].base as ResponseType<T>
        }
        return assetTileMap[tile.displayId].phaser.map as ResponseType<T>
    }
    case PlacedItemType.Fruit: {
        if (!staticData.fruits) {
            throw new Error("Fruits not found")
        }
        const fruit = staticData.fruits.find((fruit) => fruit.id === placedItemType.fruit)
        if (!fruit) {
            throw new Error("Fruit not found")
        }
        if (!phaserMap) {   
            return assetFruitMap[fruit.displayId].base.stages[placedItem.fruitInfo?.currentStage ?? 0] as ResponseType<T>
        }
        return assetFruitMap[fruit.displayId].phaser.map.stages[placedItem.fruitInfo?.currentStage ?? 0] as ResponseType<T>
    }
    case PlacedItemType.Pet: {
        if (!staticData.pets) {
            throw new Error("Pets not found")
        }
        const pet = staticData.pets.find((pet) => pet.id === placedItemType.pet)
        if (!pet) {
            throw new Error("Pet not found")
        }
        if (!phaserMap) {
            return assetPetMap[pet.displayId].base as ResponseType<T>
        }
        return assetPetMap[pet.displayId].phaser.map as ResponseType<T>
    }
    }
}
