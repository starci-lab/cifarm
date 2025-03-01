import { BaseAssetKey, supplyAssetMap } from "@/game/assets"
import { SupplyId } from "@/modules/entities"
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
    [ShopTab.Supply]: {
        iconKey: supplyAssetMap[SupplyId.BasicFertilizer].textureConfig.key,
        offsets: {
            x: 80,
            y: -40,
        },
        scale: 0.6
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
    //     iconKey: tileAssetMap[TileId.BasicTile].textureConfig.key,
    //     offsets: {
    //         x: 80,
    //         y: -40,
    //     },
    //     scale: 0.8
    // },
}