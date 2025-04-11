import { AssetData } from "./types"

export enum AssetIcon {
    Golds = "golds",
    Energy = "energy",
    Tokens = "tokens",
    Inventory = "inventory",
    Shop = "shop",
    RoadsideStand = "roadside-stand",
    Neighbors = "neighbors",
}

const PREFIX = "icons"

export interface AssetIconData {
    base: AssetData
}
export const assetIconMap: Record<AssetIcon, AssetIconData> = {
    [AssetIcon.Golds]: {
        base: {
            assetUrl: `${PREFIX}/gold.png`
        },
    },
    [AssetIcon.Energy]: {
        base: {
            assetUrl: `${PREFIX}/energy.png`
        },
    },
    [AssetIcon.Tokens]: {
        base: {
            assetUrl: `${PREFIX}/token.png`
        },
    },
    [AssetIcon.Inventory]: {
        base: {
            assetUrl: `${PREFIX}/inventory.png`
        },
    },
    [AssetIcon.Shop]: {
        base: {
            assetUrl: `${PREFIX}/shop.png`
        },
    },
    [AssetIcon.RoadsideStand]: {
        base: {
            assetUrl: `${PREFIX}/roadside-stand.png`
        },
    },
    [AssetIcon.Neighbors]: {
        base: {
            assetUrl: `${PREFIX}/neighbors.png`
        },
    },
}

