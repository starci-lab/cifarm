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
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopSeedsTab].base.textureConfig.key,
        },
    },
    [ShopTab.Flowers]: {
        showLimitText: false,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopFlowersTab].base.textureConfig.key,
        },
    },
    [ShopTab.Animals]: {
        showLimitText: false,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopAnimalsTab].base.textureConfig.key,
        },
    },
    [ShopTab.Fruits]: {
        showLimitText: true,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopFruitsTab].base.textureConfig.key,
        },
    },
    [ShopTab.Buildings]: {
        showLimitText: true,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopBuildingTab].base.textureConfig.key,
        },
    },
    [ShopTab.Tiles]: {
        showLimitText: true,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopTilesTab].base.textureConfig.key,
        },
    },
    [ShopTab.Supplies]: {
        showLimitText: false,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopSuppliesTab].base.textureConfig.key,
        },
    },
    [ShopTab.Decorations]: {
        showLimitText: false,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopDecorationTab].base.textureConfig.key,
        },
    },
    [ShopTab.Pets]: {
        showLimitText: false,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopPetsTab].base.textureConfig.key,
        },
    },
    [ShopTab.Tools]: {
        showLimitText: false,
        tabData: {
            iconKey: baseAssetMap[BaseAssetKey.UIModalShopToolsTab].base.textureConfig.key,
        },
    },
}