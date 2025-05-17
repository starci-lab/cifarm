import { AssetMapData } from "@/modules/assets"
import { PlacedItemSchema } from "@/modules/entities"

export enum CacheKey {
    PlacedItems = "placed-items",
    PlacedItemTypes = "placed-item-types",
    Crops = "crops",
    Animals = "animals",
    Buildings = "buildings",
    Tiles = "tiles",
    Supplies = "supplies",
    Activities = "activities",
    Pets = "pets",
    Fruits = "fruits",
    Inventories = "inventories",
    InventoryTypes = "inventory-types",
    DailyRewardInfo = "daily-reward-info",
    User = "user",
    FruitInfo = "fruit-info",
    Tools = "tools",
    Products = "products",
    SelectedTileId = "selected-tile-id",
    SelectedTileType = "selected-tile-type",
    SelectedTool = "selected-tool",
    DefaultInfo = "default-info",
    DeliveryData = "delivery-data",
    InputQuantityModalData = "input-quantity-modal-data",
    WatchingUser = "watching-user",
    Flowers = "flowers",
    TotalAssetsLoaded = "total-assets-loaded",
    AssetsLoaded = "assets-loaded",
    ClaimData = "claim-data",
    SellModalData = "sell-modal-data",
    UpgradeModalData = "upgrade-modal-data",
    Terrains = "terrains",
    InteractionPermissions = "interaction-permissions",
}

export interface DeliveryData {
    index: number;
    isMore: boolean;
}

export interface PlacedItemsData {
    placedItems: Array<PlacedItemSchema>;
    userId?: string;
}

export interface SellModalData {
    placedItem: PlacedItemSchema;
    assetMapData: AssetMapData
}

export interface UpgradeModalData {
    placedItem: PlacedItemSchema;
    assetMapData: AssetMapData
}

