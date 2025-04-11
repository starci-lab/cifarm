import { AssetData } from "./types"

export enum AssetIcon {
    Gold = "gold",
    Energy = "energy",
    Token = "token",
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
    PurpleStar = "purple-star",
    UpgradeStar = "upgrade-star",
    NFTStorage = "nft-storage",
    Quests = "quests",
    Daily = "daily",
    Download = "download",
}

const PREFIX = "icons"

export interface AssetIconData {
    base: AssetData
}
export const assetIconMap: Record<AssetIcon, AssetIconData> = {
    [AssetIcon.Gold]: {
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
    [AssetIcon.Token]: {
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
    [AssetIcon.PurpleStar]: {
        base: {
            assetKey: "icons-purple-star",
            assetUrl: `${PREFIX}/purple-star.png`
        },
    },
    [AssetIcon.UpgradeStar]: {
        base: {
            assetKey: "icons-upgrade-star",
            assetUrl: `${PREFIX}/upgrade-star.png`
        },
    },
    [AssetIcon.NFTStorage]: {
        base: {
            assetKey: "icons-nft-storage",
            assetUrl: `${PREFIX}/nft-storage.png`
        },
    },
    [AssetIcon.Quests]: {
        base: {
            assetKey: "icons-quests",
            assetUrl: `${PREFIX}/quests.png`
        },
    },
    [AssetIcon.Daily]: {
        base: {
            assetKey: "icons-daily",
            assetUrl: `${PREFIX}/daily.png`
        },
    },
    [AssetIcon.Download]: {
        base: {
            assetKey: "icons-download",
            assetUrl: `${PREFIX}/download.png`
        },
    },
}

