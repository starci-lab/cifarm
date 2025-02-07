import { BaseAssetKey } from "@/game/assets"

export enum TopbarCurrency {
    Energy = "energy",
    Gold = "gold",
    Carrots = "carrots",
}

export interface TopbarCurrencyData {
    iconKey: BaseAssetKey
    amount?: number
}

export const currency: Record<TopbarCurrency, TopbarCurrencyData> = {
    [TopbarCurrency.Energy]: {
        iconKey: BaseAssetKey.TopbarIconCoin,
        amount: 100,
    },
    [TopbarCurrency.Gold]: {
        iconKey: BaseAssetKey.TopbarIconCoin,
        amount: 100,
    },
    [TopbarCurrency.Carrots]: {
        iconKey: BaseAssetKey.TopbarIconCoin,
        amount: 100,
    },
}