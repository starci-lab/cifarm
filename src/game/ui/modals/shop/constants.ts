import { BaseAssetKey, baseAssetMap } from "@/game/assets"
import { TabData } from "../../elements"

export const ITEM_DATA_KEY = "item-data"

export interface ShopTabData {
    showLimitText?: boolean;
    tabData: TabData
}

export enum ShopTab {
    Seeds = "Seeds",
    Flowers = "Flowers",
    Animals = "Animals",
    Buildings = "Buildings",
    Fruits = "Fruits",
    Tiles = "Tiles",
    Supplies = "Supplies",
    Tools = "Tools",
    Pets = "Pets",
    Decorations = "Decorations",
}   
  
export const tabsConfig: Record<ShopTab, ShopTabData> = {
    [ShopTab.Seeds]: {
        showLimitText: false,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopSeedsTab].key,
        },
    },
    [ShopTab.Flowers]: {
        showLimitText: false,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopFlowersTab].key,
        },
    },
    [ShopTab.Animals]: {
        showLimitText: false,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopAnimalsTab].key,
        },
    },
    [ShopTab.Fruits]: {
        showLimitText: true,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopFruitsTab].key,
        },
    },
    [ShopTab.Buildings]: {
        showLimitText: true,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopBuildingTab].key,
        },
    },
    [ShopTab.Tiles]: {
        showLimitText: true,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopTilesTab].key,
        },
    },
    [ShopTab.Supplies]: {
        showLimitText: false,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopSuppliesTab].key,
        },
    },
    [ShopTab.Decorations]: {
        showLimitText: false,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopDecorationTab].key,
        },
    },
    [ShopTab.Pets]: {
        showLimitText: false,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopPetsTab].key,
        },
    },
    [ShopTab.Tools]: {
        showLimitText: false,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopToolsTab].key,
        },
    },
}