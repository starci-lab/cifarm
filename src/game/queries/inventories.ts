import { CacheKey } from "@/game/types"
import { CropId, InventorySchema, InventoryType, InventoryTypeSchema } from "@/modules/entities"
import { Scene } from "phaser"

export const getFirstSeedInventory = ({
    cropId,
    scene,
    inventories,
}: GetFirstSeedInventoryParams) => {
    // if inventories is not provided, get from cache
    if (!inventories) {
        // get the inventories from cache
        inventories = scene.cache.obj.get(CacheKey.Inventories) as Array<InventorySchema>
    }
    const inventoryTypes: Array<InventoryTypeSchema> = scene.cache.obj.get(CacheKey.InventoryTypes)
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
  inventories?: Array<InventorySchema>;
}

export interface GetFirstSeedInventoryParams {
    // cropId to check
    cropId: CropId;
    // scene to display the modal
    scene: Scene;
    // the inventories to check, if not specified, will try to get from cache
    inventories?: Array<InventorySchema>;
}

// get all seed inventories
export const getSeedInventories = ({
    scene,
    inventories,
}: GetSeedInventoriesParams) => {
    // if inventories is not provided, get from cache
    if (!inventories) {
        // get the inventories from cache
        inventories = scene.cache.obj.get(CacheKey.Inventories) as Array<InventorySchema>
    }
    const inventoryTypes: Array<InventoryTypeSchema> = scene.cache.obj.get(CacheKey.InventoryTypes)
    // get the inventory entities
    const result: Array<InventorySchema> = []
    for (const type of inventoryTypes) {
        if (type.type === InventoryType.Seed) {
            for (const inventory of inventories) {
                if (inventory.inventoryTypeId === type.id) {
                    result.push(inventory)
                    break
                }
            }
        }
    }
    return result
}

export interface GetSeedInventoriesParams {
    // scene to display the modal
    scene: Scene;
    // the inventories to check, if not specified, will try to get from cache
    inventories?: Array<InventorySchema>;
}

// get all seed inventories
export const getSpecificSeedInventories = ({
    cropId,
    scene,
    inventories,
}: GetSpecificSeedInventoriesParams) => {
    // if inventories is not provided, get from cache
    if (!inventories) {
        // get the inventories from cache
        inventories = scene.cache.obj.get(CacheKey.Inventories) as Array<InventorySchema>
    }
    const inventoryTypes: Array<InventoryTypeSchema> = scene.cache.obj.get(CacheKey.InventoryTypes)
    // get the inventory entities
    const result: Array<InventorySchema> = []
    for (const inventoryType of inventoryTypes) {
        if (inventoryType.cropId === cropId) {
            for (const inventory of inventories) {
                if (inventory.inventoryTypeId === inventoryType.id) {
                    result.push(inventory)
                    break
                }
            }
        }
    }
    return result
}

export interface GetSpecificSeedInventoriesParams {
    // crop id
    cropId: CropId
    // scene to display the modal
    scene: Scene;
    // the inventories to check, if not specified, will try to get from cache
    inventories?: Array<InventorySchema>;
}


export const getToolbarInventories = ({
    scene,
    inventories,
}: GetToolbarInventoriesParams) => {
    // if inventories is not provided, get from cache
    if (!inventories) {
        // get the inventories from cache
        inventories = scene.cache.obj.get(CacheKey.Inventories) as Array<InventorySchema>
    }

    return inventories.filter((inventory) => inventory.inToolbar)
}

export interface GetToolbarInventoriesParams {
    // scene to display the modal
    scene: Scene;
    // the inventories to check, if not specified, will try to get from cache
    inventories?: Array<InventorySchema>;
}