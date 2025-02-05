import { StringAbstractEntity } from "./abstract"
import { InventoryTypeEntity } from "./inventory-type"
import { PlacedItemTypeEntity } from "./placed-item-type"

export interface TileEntity extends StringAbstractEntity {
    price?: number;
    maxOwnership?: number;
    isNft: boolean;
    qualityProductChanceStack: number;
    qualityProductChanceLimit: number;
    availableInShop: boolean;
    inventoryTypeId?: string;
    inventoryType?: InventoryTypeEntity;
    placedItemTypeId: string;
    placedItemType: PlacedItemTypeEntity;
}