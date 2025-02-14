import { PlacedItemSchema } from "@/modules/entities"
import { Scene } from "phaser"
import { CacheKey } from "../types"

export const getPlacedItemsWithSeedGrowthInfo = ({
    scene,
    placedItems
}: GetPlacedItemsWithSeedGrowthInfoParams) => {
    // if placedItems is not provided, get from cache
    if (!placedItems) {
        // get the placedItems from cache
        placedItems = scene.cache.obj.get(CacheKey.PlacedItems) as Array<PlacedItemSchema>
    }
    // get the first two planted placed items
    return placedItems.filter((placedItem) => placedItem.seedGrowthInfo)
}

export interface GetPlacedItemsWithSeedGrowthInfoParams {
  // scene to display the modal
  scene: Scene;
  // the inventories to check, if not specified, will try to get from cache
  placedItems?: Array<PlacedItemSchema>;
}