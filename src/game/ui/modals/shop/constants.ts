import { BaseAssetKey } from "@/game/assets"
import { TabData } from "../../elements"
import { ShopTab } from "./types"

export const ITEM_DATA_KEY = "item-data"

export const tabsConfig: Record<ShopTab, TabData> = {
    [ShopTab.Seeds]: {
        iconKey: BaseAssetKey.UIModalShopSeedTab,
    },
    [ShopTab.Animals]: {
        iconKey: BaseAssetKey.UIModalShopAnimalTab,
    },
    [ShopTab.Buildings]: {
        iconKey: BaseAssetKey.UIModalShopBuildingTab,

    },
    [ShopTab.Tiles]: {
        iconKey: BaseAssetKey.UIModalShopTileTab,
    },
    // [ShopTab.Trees]: {
    //     iconKey: BaseAssetKey.UIModalShopDecorationTab,
    //     offsets: {
    //         x: 80,
    //         y: -40,
    //     },
    //     scale: 0.8
    // },
    [ShopTab.Decorations]: {
        iconKey: BaseAssetKey.UIModalShopDecorationTab,
    },
    // [ShopTab.Others]: {
    //     iconKey: tileAssetMap[TileId.BasicTile1].textureConfig.key,
    //     offsets: {
    //         x: 80,
    //         y: -40,
    //     },
    //     scale: 0.8
    // },
}