import { PlacedItemEntity } from "./placed-item"

export interface TileInfoEntity {
    harvestCount: number;
    placedItemId: string;
    placedItem?: PlacedItemEntity;
}