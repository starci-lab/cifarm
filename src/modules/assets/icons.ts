import { AssetData, AssetTextureData } from "./types"

export enum AssetIconId {
    Gold = "gold",
    Energy = "energy",
    Experience = "experience",
    Token = "token",
    USDC = "usdc",
    USDT = "usdt",
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
    Next = "next",
    Golds1 = "golds1",
    Golds2 = "golds2",
    Golds3 = "golds3",
}

const PREFIX = "/icons"

export interface AssetIconData {
    base: AssetData
    phaser?: {
        base: AssetTextureData
    }
}
export const assetIconMap: Record<AssetIconId, AssetIconData> = {
    [AssetIconId.Experience]: {
        base: {
            assetKey: "icons-experience",
            assetUrl: `${PREFIX}/experience.png`
        },
        phaser: {
            base: {
                assetKey: "icons-experience",
                assetUrl: `${PREFIX}/experience.png`
            },
        },
    },
    [AssetIconId.Gold]: {
        base: {
            assetKey: "icons-gold",
            assetUrl: `${PREFIX}/gold.png`
        },
        phaser: {
            base: {
                assetKey: "icons-gold",
                assetUrl: `${PREFIX}/gold.png`
            },
        },
    },
    [AssetIconId.Energy]: {
        base: {
            assetKey: "icons-energy",
            assetUrl: `${PREFIX}/energy.png`
        },
        phaser: {
            base: {
                assetKey: "icons-energy",
                assetUrl: `${PREFIX}/energy.png`
            },
        },
    },
    [AssetIconId.Token]: {
        base: {
            assetKey: "icons-token",
            assetUrl: `${PREFIX}/token.png`
        },
        phaser: {
            base: {
                assetKey: "icons-token",
                assetUrl: `${PREFIX}/token.png`
            },
        },
    },
    [AssetIconId.Inventory]: {
        base: {
            assetKey: "icons-inventory",
            assetUrl: `${PREFIX}/inventory.png`
        },
    },
    [AssetIconId.Shop]: {
        base: {
            assetKey: "icons-shop",
            assetUrl: `${PREFIX}/shop.png`
        },
    },
    [AssetIconId.RoadsideStand]: {
        base: {
            assetKey: "icons-roadside-stand",
            assetUrl: `${PREFIX}/roadside-stand.png`
        },
    },
    [AssetIconId.Neighbors]: {
        base: {
            assetKey: "icons-neighbors",
            assetUrl: `${PREFIX}/neighbors.png`
        },
    },
    [AssetIconId.Settings]: {
        base: {
            assetKey: "icons-settings",
            assetUrl: `${PREFIX}/settings.png`
        },
    },
    [AssetIconId.NFTMarketplace]: {
        base: {
            assetKey: "icons-nft-marketplace",
            assetUrl: `${PREFIX}/nft-marketplace.png`
        },
    },
    [AssetIconId.NFTBox]: {
        base: {
            assetKey: "icons-nft-box",
            assetUrl: `${PREFIX}/nft-box.png`
        },
    },
    [AssetIconId.Move]: {
        base: {
            assetKey: "icons-move",
            assetUrl: `${PREFIX}/move.png`
        },
    },
    [AssetIconId.Sell]: {
        base: {
            assetKey: "icons-sell",
            assetUrl: `${PREFIX}/sell.png`
        },
    },
    [AssetIconId.Return]: {
        base: {
            assetKey: "icons-return",
            assetUrl: `${PREFIX}/return.png`
        },
    },
    [AssetIconId.Back]: {
        base: {
            assetKey: "icons-back",
            assetUrl: `${PREFIX}/back.png`
        },
    },
    [AssetIconId.PurpleStar]: {
        base: {
            assetKey: "icons-purple-star",
            assetUrl: `${PREFIX}/purple-star.png`
        },
        phaser: {
            base: {
                assetKey: "icons-purple-star",
                assetUrl: `${PREFIX}/purple-star.png`
            },
        },
    },
    [AssetIconId.UpgradeStar]: {
        base: {
            assetKey: "icons-upgrade-star",
            assetUrl: `${PREFIX}/upgrade-star.png`
        },
    },
    [AssetIconId.NFTStorage]: {
        base: {
            assetKey: "icons-nft-storage",
            assetUrl: `${PREFIX}/nft-storage.png`
        },
    },
    [AssetIconId.Quests]: {
        base: {
            assetKey: "icons-quests",
            assetUrl: `${PREFIX}/quests.png`
        },
    },
    [AssetIconId.Daily]: {
        base: {
            assetKey: "icons-daily",
            assetUrl: `${PREFIX}/daily.png`
        },
    },
    [AssetIconId.Download]: {
        base: {
            assetKey: "icons-download",
            assetUrl: `${PREFIX}/download.png`
        },
    },
    [AssetIconId.Next]: {
        base: {
            assetKey: "icons-next",
            assetUrl: `${PREFIX}/next.png`
        },
    },
    [AssetIconId.USDC]: {
        base: {
            assetKey: "icons-usdc",
            assetUrl: `${PREFIX}/usdc.svg`
        },
    },
    [AssetIconId.USDT]: {
        base: {
            assetKey: "icons-usdt",
            assetUrl: `${PREFIX}/usdt.svg`
        },
    },
    [AssetIconId.Golds1]: {
        base: {
            assetKey: "icons-golds-1",
            assetUrl: `${PREFIX}/golds-1.png`
        },
    },  
    [AssetIconId.Golds2]: {
        base: {
            assetKey: "icons-golds-2",
            assetUrl: `${PREFIX}/golds-2.png`
        },
    },
    [AssetIconId.Golds3]: {
        base: {
            assetKey: "icons-golds-3",
            assetUrl: `${PREFIX}/golds-3.png`
        },
    },
}

