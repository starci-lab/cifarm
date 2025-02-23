import { BaseAssetKey, cropAssetMap } from "@/game/assets"
import { ShopTab, ShopTabData } from "./types"
import { CropId } from "@/modules/entities"

export const ITEM_DATA_KEY = "item-data"

export const tabsConfig: Record<ShopTab, ShopTabData> = {
    [ShopTab.Seeds]: {
        iconKey: cropAssetMap[CropId.Carrot].seed.textureConfig.key,
        scale: 0.8,
        offsets: {
            x: 70,
            y: -40,
        }
    },
    [ShopTab.Animals]: {
        iconKey: BaseAssetKey.UIModalShopIconAnimal,
        offsets: {
            x: 40,
            y: -20,
        }
    },
    [ShopTab.Buildings]: {
        iconKey: BaseAssetKey.UIModalShopIconTree,
        offsets: {
            x: 80,
            y: -40,
        }
    },
    [ShopTab.Tiles]: {
        iconKey: BaseAssetKey.ModalShopIconTile,
        offsets: {
            x: 80,
            y: -40,
        }
    },
    [ShopTab.Trees]: {
        iconKey: BaseAssetKey.UIModalShopIconTree,
        offsets: {
            x: 80,
            y: -40,
        }
    },
    [ShopTab.Decorations]: {
        iconKey: BaseAssetKey.UIModalShopIconTree,
        offsets: {
            x: 80,
            y: -40,
        }
    },
    [ShopTab.Others]: {
        iconKey: BaseAssetKey.UIModalShopIconTree,
        offsets: {
            x: 80,
            y: -40,
        }
    },
}