import { BaseAssetKey } from "@/game/assets"
import { TabData } from "../../elements"

export const ITEM_DATA_KEY = "item-data"

export interface ShopTabData {
    showLimitText?: boolean;
    tabData: TabData
}

export enum ShopTab {
    Seeds = "Seeds",
    Animals = "Animals",
    Buildings = "Buildings",
    Fruits = "Fruits",
    Tiles = "Tiles",
    Supplies = "Supplies",
    Tools = "Tools",
    Pets = "Pets",
    Decorations = "Decorations",
    Flowers = "Flowers",
}   
  
export const tabsConfig: Record<ShopTab, ShopTabData> = {
    [ShopTab.Seeds]: {
        showLimitText: false,
        tabData: {
            iconKey: BaseAssetKey.UIModalShopSeedsTab,
        },
    },
    [ShopTab.Flowers]: {
        showLimitText: false,
        tabData: {
            iconKey: BaseAssetKey.UIModalShopFlowersTab,
        },
    },
    [ShopTab.Animals]: {
        showLimitText: false,
        tabData: {
            iconKey: BaseAssetKey.UIModalShopAnimalsTab,
        },
    },
    [ShopTab.Fruits]: {
        showLimitText: true,
        tabData: {
            iconKey: BaseAssetKey.UIModalShopFruitsTab,
        },
    },
    [ShopTab.Buildings]: {
        showLimitText: true,
        tabData: {
            iconKey: BaseAssetKey.UIModalShopBuildingTab,
        },
    },
    [ShopTab.Tiles]: {
        showLimitText: true,
        tabData: {
            iconKey: BaseAssetKey.UIModalShopTilesTab,
        },
    },
    [ShopTab.Supplies]: {
        showLimitText: false,
        tabData: {
            iconKey: BaseAssetKey.UIModalShopSuppliesTab,
        },
    },
    [ShopTab.Decorations]: {
        showLimitText: false,
        tabData: {
            iconKey: BaseAssetKey.UIModalShopDecorationTab,
        },
    },
    [ShopTab.Pets]: {
        showLimitText: false,
        tabData: {
            iconKey: BaseAssetKey.UIModalShopPetsTab,
        },
    },
    [ShopTab.Tools]: {
        showLimitText: false,
        tabData: {
            iconKey: BaseAssetKey.UIModalShopToolsTab,
        },
    },
}