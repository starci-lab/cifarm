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
    NeighborsArgs = "neighbors-args",
    Neighbors = "neighbors",
    FolloweesArgs = "followees-args",
    Followees = "followees",
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
    WatchingUser = "watching-user",
    Flowers = "flowers",
    TotalAssetsLoaded = "total-assets-loaded",
    AssetsLoaded = "assets-loaded",
}

export interface DeliveryData {
    index: number;
    isMore: boolean;
}

export interface PlacedItemsData {
    placedItems: Array<PlacedItemSchema>;
    userId?: string;
}

