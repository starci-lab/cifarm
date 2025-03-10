import { BaseAssetKey } from "@/game/assets"
import { TabData } from "../../elements"
import { ShopTab } from "./types"

export const ITEM_DATA_KEY = "item-data"

export const tabsConfig: Record<ShopTab, TabData> = {
    [ShopTab.Seeds]: {
        iconKey: BaseAssetKey.UIModalShopSeedsTab,
    },
    [ShopTab.Animals]: {
        iconKey: BaseAssetKey.UIModalShopAnimalsTab,
    },
    [ShopTab.Buildings]: {
        iconKey: BaseAssetKey.UIModalShopBuildingTab,
    },
    [ShopTab.Tiles]: {
        iconKey: BaseAssetKey.UIModalShopTilesTab,
    },
    [ShopTab.Supply]: {
        iconKey: BaseAssetKey.UIModalShopSuppliesTab,
    },
    [ShopTab.Decorations]: {
        iconKey: BaseAssetKey.UIModalShopDecorationTab,
    },
    [ShopTab.Pets]: {
        iconKey: BaseAssetKey.UIModalShopPetsTab,
    },
    [ShopTab.Tools]: {
        iconKey: BaseAssetKey.UIModalShopToolsTab,
    },
}