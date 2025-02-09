import { CacheKey } from "@/game/types"
import { CropId, InventoryEntity, InventoryTypeEntity } from "@/modules/entities"
import { Scene } from "phaser"

export const getInventorySeed = ({
    cropId,
    scene,
    inventories,
}: GetInventorySeedParams) => {
    // if inventories is not provided, get from cache
    if (!inventories) {
        // get the inventories from cache
        inventories = scene.cache.obj.get(CacheKey.Inventories) as Array<InventoryEntity>
    }
    const inventoryTypes: Array<InventoryTypeEntity> = scene.cache.obj.get(CacheKey.InventoryTypes)
    // get the corresponding inventory type
    const inventoryType = inventoryTypes.find((type) => type.cropId === cropId)
    // if inventory type is not found, throw an error
    if (!inventoryType) {
        throw new Error(`Inventory type not found for cropId: ${cropId}`)
    }
    // get the inventory entity
    return inventories.find(({ inventoryTypeId }) => inventoryTypeId === inventoryType.id)
}

export interface GetInventorySeedParams {
  // cropId to check
  cropId: CropId;
  // scene to display the modal
  scene: Scene;
  // the inventories to check, if not specified, will try to get from cache
  inventories?: Array<InventoryEntity>;
}
