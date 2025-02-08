import { BaseAssetKey } from "@/game/assets"

export enum ShopTab {
    Seeds = "Seeds",
    Animals = "Animals",
    Buildings = "Buildings",
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
        iconKey: BaseAssetKey.ModalShopIconSeed,
        scale: 0.6,
        offSets: {
            x: 70,
            y: -40,
        }
    },
    [ShopTab.Animals]: {
        iconKey: BaseAssetKey.ModalShopIconAnimal,
        offSets: {
            x: 40,
            y: -20,
        }
    },
    [ShopTab.Buildings]: {
        iconKey: BaseAssetKey.ModalShopIconTree,
        offSets: {
            x: 80,
            y: -40,
        }
    },
    [ShopTab.Trees]: {
        iconKey: BaseAssetKey.ModalShopIconTree,
        offSets: {
            x: 80,
            y: -40,
        }
    },
    [ShopTab.Decorations]: {
        iconKey: BaseAssetKey.ModalShopIconTree,
        offSets: {
            x: 80,
            y: -40,
        }
    },
    [ShopTab.Others]: {
        iconKey: BaseAssetKey.ModalShopIconTree,
        offSets: {
            x: 80,
            y: -40,
        }
    },
}