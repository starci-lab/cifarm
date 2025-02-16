import { BaseAssetKey } from "@/game/assets"

export enum InventoryTab {
    Menu = "Menu",
    Tiles = "Tiles",
    Products = "Products", 
    Seeds = "Seeds",
    Animals = "Animals",
    Tools = "Tools",
}

export interface InventoryTabData {
    iconKey: BaseAssetKey
}

export const defaultInventoryTab = InventoryTab.Menu

export const tabs: Record<InventoryTab, InventoryTabData> = {
    [InventoryTab.Menu]: {
        iconKey: BaseAssetKey.UIModalInventoryIconMenu,
    },
    [InventoryTab.Tiles]: {
        iconKey: BaseAssetKey.UIModalInventoryIconTile,
    },
    [InventoryTab.Products]: {
        iconKey: BaseAssetKey.UIModalInventoryIconProduct,
    },
    [InventoryTab.Seeds]: {
        iconKey: BaseAssetKey.UIModalInventoryIconCrop,
    },
    [InventoryTab.Animals]: {
        iconKey: BaseAssetKey.UIModalInventoryIconAnimal,
    },
    [InventoryTab.Tools]: {
        iconKey: BaseAssetKey.UIModalInventoryIconCan,
    },
}