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
    Tools = "tools",
    Products = "products",
    SelectedTileId = "selected-tile-id",
    SelectedTileType = "selected-tile-type",
    SelectedTool = "selected-tool",
    DefaultInfo = "default-info",
    DeliveryData = "delivery-data",
    VisitedNeighbor = "visited-neighbor",
}

export interface DeliveryData {
    index: number;
    isMore: boolean;
}