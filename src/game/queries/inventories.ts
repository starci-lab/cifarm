import { CacheKey } from "@/game/types"
import { IPaginatedResponse } from "@/modules/apollo"
import { CropId, CropSchema, InventoryKind, InventorySchema, InventoryType, InventoryTypeSchema } from "@/modules/entities"
import { Scene } from "phaser"

export const getFirstSeedInventory = ({
    cropId,
    scene,
    inventories,
    kind = InventoryKind.Storage
}: GetFirstSeedInventoryParams) => {
    // if inventories is not provided, get from cache
    if (!inventories) {
        // get the inventories from cache
        const { data } = scene.cache.obj.get(CacheKey.Inventories) as IPaginatedResponse<InventorySchema>
        inventories = data
    }
    const inventoryTypes: Array<InventoryTypeSchema> = scene.cache.obj.get(CacheKey.InventoryTypes)
    const crops = scene.cache.obj.get(CacheKey.Crops) as Array<CropSchema>
    // get the crop entity
    const crop = crops.find((crop) => crop.displayId === cropId)
    // if crop is not found, throw an error
    if (!crop) {
        throw new Error(`Crop not found for cropId: ${cropId}`)
    }
    // get the corresponding inventory type
    const inventoryType = inventoryTypes.find((type) => type.crop === crop.id)
    // if inventory type is not found, throw an error
    if (!inventoryType) {
        throw new Error(`Inventory type not found for cropId: ${cropId}`)
    }
    // get the inventory entity
    return inventories.find((inventory) => inventory.inventoryType === inventoryType.id && inventory.kind === kind)
}

export interface GetFirstSeedInventoryParams {
  // cropId to check
  cropId: CropId;
  // scene to display the modal
  scene: Scene;
  // the inventories to check, if not specified, will try to get from cache
  inventories?: Array<InventorySchema>;
  // kind
  kind?: InventoryKind;
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
        const { data } = scene.cache.obj.get(CacheKey.Inventories) as IPaginatedResponse<InventorySchema>
        inventories = data
    }
    const inventoryTypes: Array<InventoryTypeSchema> = scene.cache.obj.get(CacheKey.InventoryTypes)
    // get the inventory entities
    const result: Array<InventorySchema> = []
    for (const type of inventoryTypes) {
        if (type.type === InventoryType.Seed) {
            for (const inventory of inventories) {
                if (inventory.inventoryType === type.id) {
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
        const { data } = scene.cache.obj.get(CacheKey.Inventories) as IPaginatedResponse<InventorySchema>
        inventories = data
    }
    const inventoryTypes: Array<InventoryTypeSchema> = scene.cache.obj.get(CacheKey.InventoryTypes)
    // get the inventory entities
    const crops = scene.cache.obj.get(CacheKey.Crops) as Array<CropSchema>
    const crop = crops.find((crop) => crop.displayId === cropId)
    if (!crop) {
        throw new Error(`Crop not found for cropId: ${cropId}`)
    }
    const result: Array<InventorySchema> = []
    for (const inventoryType of inventoryTypes) {
        if (inventoryType.crop === crop.id) {
            for (const inventory of inventories) {
                if (inventory.inventoryType === inventoryType.id) {
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


export const getToolInventories = ({
    scene,
    inventories,
}: GetToolInventoriesParams) => {
    // if inventories is not provided, get from cache
    if (!inventories) {
        // get the inventories from cache
        const { data } = scene.cache.obj.get(CacheKey.Inventories) as IPaginatedResponse<InventorySchema>
        inventories = data
    }

    return inventories.filter((inventory) => inventory.kind === InventoryKind.Tool)
}

export interface GetToolInventoriesParams {
    // scene to display the modal
    scene: Scene;
    // the inventories to check, if not specified, will try to get from cache
    inventories?: Array<InventorySchema>;
}

export const getStorageInventories = ({
    scene,
    inventories,
}: GetStorageInventoriesParams) => {
    // if inventories is not provided, get from cache
    if (!inventories) {
        // get the inventories from cache
        const { data } = scene.cache.obj.get(CacheKey.Inventories) as IPaginatedResponse<InventorySchema>
        inventories = data
    }

    return inventories.filter((inventory) => inventory.kind === InventoryKind.Storage)
}

export interface GetStorageInventoriesParams {
    // scene to display the modal
    scene: Scene;
    // the inventories to check, if not specified, will try to get from cache
    inventories?: Array<InventorySchema>;
}

export const getProductInventories = ({
    scene,
    inventories
}: GetProductInventoriesParams) => {
    // if inventories is not provided, get from cache
    if (!inventories) {
        // get the inventories from cache
        const { data } = scene.cache.obj.get(CacheKey.Inventories) as IPaginatedResponse<InventorySchema>
        inventories = data
    }
    const inventoryTypes: Array<InventoryTypeSchema> = scene.cache.obj.get(CacheKey.InventoryTypes)
    const result: Array<InventorySchema> = []
    
    for (const type of inventoryTypes) {
        if (type.type === InventoryType.Product) {
            for (const inventory of inventories) {
                if (inventory.inventoryType === type.id) {
                    result.push(inventory)
                    break
                }
            }
        }
    }
    return result
}

export interface GetProductInventoriesParams {
    // scene to display the modal
    scene: Scene;
    // the inventories to check, if not specified, will try to get from cache
    inventories?: Array<InventorySchema>;
    // inventory type
    inventoryTypeId?: string;
}

export const getDeliveryInventories = ({
    scene,
    inventories,
}: GetDeliveryInventoriesParams) => {
    // if inventories is not provided, get from cache
    if (!inventories) {
        // get the inventories from cache
        const { data } = scene.cache.obj.get(CacheKey.Inventories) as IPaginatedResponse<InventorySchema>
        inventories = data
    }

    return inventories.filter((inventory) => inventory.kind === InventoryKind.Delivery)
}

export interface GetDeliveryInventoriesParams {
    // scene to display the modal
    scene: Scene;
    // the inventories to check, if not specified, will try to get from cache
    inventories?: Array<InventorySchema>;
}