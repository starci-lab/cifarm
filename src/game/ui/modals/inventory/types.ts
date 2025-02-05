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
        iconKey: BaseAssetKey.ModalInventoryIconMenu,
    },
    [InventoryTab.Tiles]: {
        iconKey: BaseAssetKey.ModalInventoryIconTile,
    },
    [InventoryTab.Products]: {
        iconKey: BaseAssetKey.ModalInventoryIconProduct,
    },
    [InventoryTab.Seeds]: {
        iconKey: BaseAssetKey.ModalInventoryIconCrop,
    },
    [InventoryTab.Animals]: {
        iconKey: BaseAssetKey.ModalInventoryIconAnimal,
    },
    [InventoryTab.Tools]: {
        iconKey: BaseAssetKey.ModalInventoryIconCan,
    },
}