import {
    AnimalSchema,
    BuildingSchema,
    FruitSchema,
    PlacedItemSchema,
    PlacedItemType,
    PlacedItemTypeSchema,
    TileSchema,
} from "@/modules/entities"
import { Scene } from "phaser"
import { CacheKey, PlacedItemsData } from "../types"

export const getPlacedItemsWithSeedGrowthInfo = ({
    scene,
    placedItems,
}: GetPlacedItemsWithSeedGrowthInfoParams) => {
    // if placedItems is not provided, get from cache
    if (!placedItems) {
    // get the placedItems from cache
        const { placedItems: _placedItems } = scene.cache.obj.get(
            CacheKey.PlacedItems
        ) as PlacedItemsData
        placedItems = _placedItems
    }
    // get the first two planted placed items
    return placedItems.filter((placedItem) => placedItem.plantInfo)
}

export interface GetPlacedItemsWithSeedGrowthInfoParams {
  // scene to display the modal
  scene: Scene;
  // the inventories to check, if not specified, will try to get from cache
  placedItems?: Array<PlacedItemSchema>;
}

// Generalized function to get placed items by type
export const getPlacedItemsByType = ({
    scene,
    placedItems,
    type,
}: GetPlacedItemsByTypeParams) => {
    // If placedItems is not provided, get from cache
    if (!placedItems) {
        // Get the placedItems from cache
        const { placedItems: _placedItems } = scene.cache.obj.get(
            CacheKey.PlacedItems
        ) as PlacedItemsData
        placedItems = _placedItems
    }

    // Get the placedItemTypes from cache
    const placedItemTypes: Array<PlacedItemTypeSchema> = scene.cache.obj.get(
        CacheKey.PlacedItemTypes
    )

    // Filter placedItemTypes by the specified item type
    const placedItemTypeIds = placedItemTypes
        .filter((placedItemType) => placedItemType.type === type)
        .map((placedItemType) => placedItemType.id)

    // Return filtered placed items based on type
    return placedItems.filter((placedItem) =>
        placedItemTypeIds.includes(placedItem.placedItemType)
    )
}

// Define the params for the generalized function
export interface GetPlacedItemsByTypeParams {
    scene: Scene;
    placedItems?: Array<PlacedItemSchema>;
    type: PlacedItemType; // Specify the type of items to filter (Tile, Building, or Fruit)
}

export const getSellPriceFromPlacedItemType = ({
    scene,
    placedItemType,
}: GetSellPriceFromPlacedItemTypeParams) => {
    switch (placedItemType.type) {
    case PlacedItemType.Tile:
    {
        const tiles = scene.cache.obj.get(CacheKey.Tiles) as Array<TileSchema>
        const tile = tiles.find((tile) => tile.id === placedItemType.tile)
        if (!tile) {
            throw new Error("Tile not found")
        }
        return tile.sellPrice   
    }
    case PlacedItemType.Building:
    {
        const buildings = scene.cache.obj.get(CacheKey.Buildings) as Array<BuildingSchema>
        const building = buildings.find((building) => building.id === placedItemType.building)
        if (!building) {
            throw new Error("Building not found")
        }
        return building.sellPrice
    }
    case PlacedItemType.Fruit:
    {
        const fruits = scene.cache.obj.get(CacheKey.Fruits) as Array<FruitSchema>
        const fruit = fruits.find((fruit) => fruit.id === placedItemType.fruit)
        if (!fruit) {
            throw new Error("Fruit not found")
        }
        return fruit.sellPrice
    }
    case PlacedItemType.Animal:
    {
        const animals = scene.cache.obj.get(CacheKey.Animals) as Array<AnimalSchema>
        const animal = animals.find((animal) => animal.id === placedItemType.animal)
        if (!animal) {
            throw new Error("Animal not found")
        }
        return animal.sellPrice
    }
    }
}

export interface GetSellPriceFromPlacedItemTypeParams {
    scene: Scene;
    placedItemType: PlacedItemTypeSchema;
}
