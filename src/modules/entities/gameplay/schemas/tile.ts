import { AbstractSchema } from "./abstract"
import { InventoryTypeSchema } from "./inventory-type"
import { PlacedItemTypeSchema } from "./placed-item-type"

export interface TileSchema extends AbstractSchema {
    price?: number;
    maxOwnership?: number;
    isNft: boolean;
    qualityProductChanceStack: number;
    qualityProductChanceLimit: number;
    availableInShop: boolean;
    inventoryTypeId?: string;
    inventoryType?: InventoryTypeSchema;
    placedItemTypeId: string;
    placedItemType: PlacedItemTypeSchema;
}