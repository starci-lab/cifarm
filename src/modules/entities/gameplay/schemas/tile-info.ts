import { PlacedItemSchema } from "./placed-item"

export interface TileInfoSchema {
    harvestCount: number;
    placedItemId: string;
    placedItem?: PlacedItemSchema;
    growthAcceleration: number;
    qualityYield: number;
    diseaseResistance: number;
    harvestYieldBonus: number;
}