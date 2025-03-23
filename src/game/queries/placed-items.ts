import {
    PlacedItemSchema,
    PlacedItemType,
    PlacedItemTypeSchema,
} from "@/modules/entities"
import { Scene } from "phaser"
import { CacheKey } from "../types"
import { PlacedItemsSyncedMessage } from "@/hooks"

export const getPlacedItemsWithSeedGrowthInfo = ({
    scene,
    placedItems,
}: GetPlacedItemsWithSeedGrowthInfoParams) => {
    // if placedItems is not provided, get from cache
    if (!placedItems) {
    // get the placedItems from cache
        const { data } = scene.cache.obj.get(
            CacheKey.PlacedItems
        ) as PlacedItemsSyncedMessage
        placedItems = data
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
        const { data } = scene.cache.obj.get(
            CacheKey.PlacedItems
        ) as PlacedItemsSyncedMessage
        placedItems = data
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
