import { BaseAssetKey } from "@/game/assets"

export enum InventoryTab {
    Tiles = "Tiles",
    Products = "Products", 
    Seeds = "Seeds",
    Animals = "Animals",
    Buildings = "Buildings",
    Trees = "Trees",
    Decorations = "Decorations",
    Others = "Others",
}

export interface InventoryTabData {
    iconKey: BaseAssetKey
}

export const tabs: Record<InventoryTab, InventoryTabData> = {
    [InventoryTab.Tiles]: {
        iconKey: BaseAssetKey.IconDaily,
    },
    [InventoryTab.Products]: {
        iconKey: BaseAssetKey.IconDaily,
    },
    [InventoryTab.Seeds]: {
        iconKey: BaseAssetKey.IconDaily,
    },
    [InventoryTab.Animals]: {
        iconKey: BaseAssetKey.IconDaily,
    },
    [InventoryTab.Buildings]: {
        iconKey: BaseAssetKey.IconDaily,
    },
    [InventoryTab.Trees]: {
        iconKey: BaseAssetKey.IconDaily,
    },
    [InventoryTab.Decorations]: {
        iconKey: BaseAssetKey.IconDaily,
    },
    [InventoryTab.Others]: {
        iconKey: BaseAssetKey.IconDaily,
    },
}