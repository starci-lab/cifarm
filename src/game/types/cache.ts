import { PlacedItemSchema } from "@/modules/entities"
import { MapAssetData } from "../assets"

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
    mapAssetData: MapAssetData
}

export interface UpgradeModalData {
    placedItem: PlacedItemSchema;
}

