import { CacheKey } from "@/game/types"
import { CropId, InventoryEntity, InventoryType, InventoryTypeEntity } from "@/modules/entities"
import { Scene } from "phaser"

export const getFirstSeedInventory = ({
    cropId,
    scene,
    inventories,
}: GetFirstSeedInventoryParams) => {
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

export interface GetFirstSeedInventoryParams {
  // cropId to check
  cropId: CropId;
  // scene to display the modal
  scene: Scene;
  // the inventories to check, if not specified, will try to get from cache
  inventories?: Array<InventoryEntity>;
}

export interface GetFirstSeedInventoryParams {
    // cropId to check
    cropId: CropId;
    // scene to display the modal
    scene: Scene;
    // the inventories to check, if not specified, will try to get from cache
    inventories?: Array<InventoryEntity>;
}

// get all seed inventories
export const getSeedInventories = ({
    scene,
    inventories,
}: GetSeedInventoriesParams) => {
    // if inventories is not provided, get from cache
    if (!inventories) {
        // get the inventories from cache
        inventories = scene.cache.obj.get(CacheKey.Inventories) as Array<InventoryEntity>
    }
    const inventoryTypes: Array<InventoryTypeEntity> = scene.cache.obj.get(CacheKey.InventoryTypes)
    // get the inventory entities
    return inventoryTypes
        .filter((type) => type.type === InventoryType.Seed)
        .map((type) => inventories.find(({ inventoryTypeId }) => inventoryTypeId === type.id))
        .filter((inventory) => inventory) as Array<InventoryEntity>
}

export interface GetSeedInventoriesParams {
    // scene to display the modal
    scene: Scene;
    // the inventories to check, if not specified, will try to get from cache
    inventories?: Array<InventoryEntity>;
}

export const getToolbarInventories = ({
    scene,
    inventories,
}: GetToolbarInventoriesParams) => {
    // if inventories is not provided, get from cache
    if (!inventories) {
        // get the inventories from cache
        inventories = scene.cache.obj.get(CacheKey.Inventories) as Array<InventoryEntity>
    }

    return inventories.filter((inventory) => inventory.inToolbar)
}

export interface GetToolbarInventoriesParams {
    // scene to display the modal
    scene: Scene;
    // the inventories to check, if not specified, will try to get from cache
    inventories?: Array<InventoryEntity>;
}