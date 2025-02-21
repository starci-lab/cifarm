import { BaseAssetKey } from "@/game/assets"

export enum ShopTab {
    Seeds = "Seeds",
    Animals = "Animals",
    Buildings = "Buildings",
    Tiles = "Tiles",
    Trees = "Trees",
    Decorations = "Decorations",
    Others = "Others",
}

export interface ShopTabData {
    iconKey: BaseAssetKey,
    offSets?: {
        x: number,
        y: number,
    },
    scale?: number,
}

export const tabs: Record<ShopTab, ShopTabData> = {
    [ShopTab.Seeds]: {
        iconKey: BaseAssetKey.UIModalShopIconSeed,
        scale: 0.6,
        offSets: {
            x: 70,
            y: -40,
        }
    },
    [ShopTab.Animals]: {
        iconKey: BaseAssetKey.UIModalShopIconAnimal,
        offSets: {
            x: 40,
            y: -20,
        }
    },
    [ShopTab.Buildings]: {
        iconKey: BaseAssetKey.UIModalShopIconTree,
        offSets: {
            x: 80,
            y: -40,
        }
    },
    [ShopTab.Tiles]: {
        iconKey: BaseAssetKey.ModalShopIconTile,
        offSets: {
            x: 80,
            y: -40,
        }
    },
    [ShopTab.Trees]: {
        iconKey: BaseAssetKey.UIModalShopIconTree,
        offSets: {
            x: 80,
            y: -40,
        }
    },
    [ShopTab.Decorations]: {
        iconKey: BaseAssetKey.UIModalShopIconTree,
        offSets: {
            x: 80,
            y: -40,
        }
    },
    [ShopTab.Others]: {
        iconKey: BaseAssetKey.UIModalShopIconTree,
        offSets: {
            x: 80,
            y: -40,
        }
    },
}