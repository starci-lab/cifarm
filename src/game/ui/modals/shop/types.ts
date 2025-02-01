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
    iconKey: BaseAssetKey
}

export const tabs: Record<ShopTab, ShopTabData> = {
    [ShopTab.Seeds]: {
        iconKey: BaseAssetKey.Grass,
    },
    [ShopTab.Animals]: {
        iconKey: BaseAssetKey.Grass,
    },
    [ShopTab.Buildings]: {
        iconKey: BaseAssetKey.Grass,
    },
    [ShopTab.Trees]: {
        iconKey: BaseAssetKey.Grass,
    },
    [ShopTab.Decorations]: {
        iconKey: BaseAssetKey.Grass,
    },
    [ShopTab.Others]: {
        iconKey: BaseAssetKey.Grass,
    },
}