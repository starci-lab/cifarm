import { PlacedItemSchema } from "./placed-item"

export interface TileInfoSchema {
    harvestCount: number;
    placedItemId: string;
    placedItem?: PlacedItemSchema;
}