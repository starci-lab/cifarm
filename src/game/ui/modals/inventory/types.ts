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
        iconKey: BaseAssetKey.Grass,
    },
    [InventoryTab.Products]: {
        iconKey: BaseAssetKey.Grass,
    },
    [InventoryTab.Seeds]: {
        iconKey: BaseAssetKey.Grass,
    },
    [InventoryTab.Animals]: {
        iconKey: BaseAssetKey.Grass,
    },
    [InventoryTab.Buildings]: {
        iconKey: BaseAssetKey.Grass,
    },
    [InventoryTab.Trees]: {
        iconKey: BaseAssetKey.Grass,
    },
    [InventoryTab.Decorations]: {
        iconKey: BaseAssetKey.Grass,
    },
    [InventoryTab.Others]: {
        iconKey: BaseAssetKey.Grass,
    },
}