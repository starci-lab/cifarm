import { AssetData } from "./types"

export enum AssetIcon {
    Golds = "golds",
    Energy = "energy",
    Tokens = "tokens",
    Inventory = "inventory",
    Shop = "shop",
    RoadsideStand = "roadside-stand",
    Neighbors = "neighbors",
    Settings = "settings",
    NFTMarketplace = "nft-marketplace",
    NFTBox = "nft-box",
    Move = "move",
    Sell = "sell",
    Return = "return",
    Back = "back",
}

const PREFIX = "icons"

export interface AssetIconData {
    base: AssetData
}
export const assetIconMap: Record<AssetIcon, AssetIconData> = {
    [AssetIcon.Golds]: {
        base: {
            assetKey: "icons-gold",
            assetUrl: `${PREFIX}/gold.png`
        },
    },
    [AssetIcon.Energy]: {
        base: {
            assetKey: "icons-energy",
            assetUrl: `${PREFIX}/energy.png`
        },
    },
    [AssetIcon.Tokens]: {
        base: {
            assetKey: "icons-token",
            assetUrl: `${PREFIX}/token.png`
        },
    },
    [AssetIcon.Inventory]: {
        base: {
            assetKey: "icons-inventory",
            assetUrl: `${PREFIX}/inventory.png`
        },
    },
    [AssetIcon.Shop]: {
        base: {
            assetKey: "icons-shop",
            assetUrl: `${PREFIX}/shop.png`
        },
    },
    [AssetIcon.RoadsideStand]: {
        base: {
            assetKey: "icons-roadside-stand",
            assetUrl: `${PREFIX}/roadside-stand.png`
        },
    },
    [AssetIcon.Neighbors]: {
        base: {
            assetKey: "icons-neighbors",
            assetUrl: `${PREFIX}/neighbors.png`
        },
    },
    [AssetIcon.Settings]: {
        base: {
            assetKey: "icons-settings",
            assetUrl: `${PREFIX}/settings.png`
        },
    },
    [AssetIcon.NFTMarketplace]: {
        base: {
            assetKey: "icons-nft-marketplace",
            assetUrl: `${PREFIX}/nft-marketplace.png`
        },
    },
    [AssetIcon.NFTBox]: {
        base: {
            assetKey: "icons-nft-box",
            assetUrl: `${PREFIX}/nft-box.png`
        },
    },
    [AssetIcon.Move]: {
        base: {
            assetKey: "icons-move",
            assetUrl: `${PREFIX}/move.png`
        },
    },
    [AssetIcon.Sell]: {
        base: {
            assetKey: "icons-sell",
            assetUrl: `${PREFIX}/sell.png`
        },
    },
    [AssetIcon.Return]: {
        base: {
            assetKey: "icons-return",
            assetUrl: `${PREFIX}/return.png`
        },
    },
    [AssetIcon.Back]: {
        base: {
            assetKey: "icons-back",
            assetUrl: `${PREFIX}/back.png`
        },
    },
}

