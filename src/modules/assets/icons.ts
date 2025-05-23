import { AssetData, AssetTextureData } from "./types"
import { getAssetUrl } from "./utils"

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
    WholesaleMarket = "wholesale-market",
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
    Attack = "attack",
    Defense = "defense",
    Dog = "dog",
    Cat = "cat",
    QualityStar = "quality-star",
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
            assetUrl: getAssetUrl(`${PREFIX}/experience.png`)
        },
        phaser: {
            base: {
                assetKey: "icons-experience",
                assetUrl: getAssetUrl(`${PREFIX}/experience.png`)
            },
        },
    },
    [AssetIconId.Gold]: {
        base: {
            assetKey: "icons-gold",
            assetUrl: getAssetUrl(`${PREFIX}/gold.png`)
        },
        phaser: {
            base: {
                assetKey: "icons-gold",
                assetUrl: getAssetUrl(`${PREFIX}/gold.png`)
            },
        },
    },
    [AssetIconId.Energy]: {
        base: {
            assetKey: "icons-energy",
            assetUrl: getAssetUrl(`${PREFIX}/energy.png`)
        },
        phaser: {
            base: {
                assetKey: "icons-energy",
                assetUrl: getAssetUrl(`${PREFIX}/energy.png`)
            },
        },
    },
    [AssetIconId.Token]: {
        base: {
            assetKey: "icons-token",
            assetUrl: getAssetUrl(`${PREFIX}/token.png`)
        },
        phaser: {
            base: {
                assetKey: "icons-token",
                assetUrl: getAssetUrl(`${PREFIX}/token.png`)
            },
        },
    },
    [AssetIconId.Inventory]: {
        base: {
            assetKey: "icons-inventory",
            assetUrl: getAssetUrl(`${PREFIX}/inventory.png`)
        },
    },
    [AssetIconId.Shop]: {
        base: {
            assetKey: "icons-shop",
            assetUrl: getAssetUrl(`${PREFIX}/shop.png`)
        },
    },
    [AssetIconId.RoadsideStand]: {
        base: {
            assetKey: "icons-roadside-stand",
            assetUrl: getAssetUrl(`${PREFIX}/roadside-stand.png`)
        },
    },
    [AssetIconId.Neighbors]: {
        base: {
            assetKey: "icons-neighbors",
            assetUrl: getAssetUrl(`${PREFIX}/neighbors.png`)
        },
    },
    [AssetIconId.Settings]: {
        base: {
            assetKey: "icons-settings",
            assetUrl: getAssetUrl(`${PREFIX}/settings.png`)
        },
    },
    [AssetIconId.NFTMarketplace]: {
        base: {
            assetKey: "icons-nft-marketplace",
            assetUrl: getAssetUrl(`${PREFIX}/nft-marketplace.png`)
        },
    },
    [AssetIconId.NFTBox]: {
        base: {
            assetKey: "icons-nft-box",
            assetUrl: getAssetUrl(`${PREFIX}/nft-box.png`)
        },
    },
    [AssetIconId.WholesaleMarket]: {
        base: {
            assetKey: "icons-wholesale-market",
            assetUrl: getAssetUrl(`${PREFIX}/wholesale-market.png`)
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
            assetUrl: getAssetUrl(`${PREFIX}/return.png`)
        },
    },
    [AssetIconId.Back]: {
        base: {
            assetKey: "icons-back",
            assetUrl: getAssetUrl(`${PREFIX}/back.png`)
        },
    },
    [AssetIconId.PurpleStar]: {
        base: {
            assetKey: "icons-purple-star",
            assetUrl: getAssetUrl(`${PREFIX}/purple-star.png`)
        },
        phaser: {
            base: {
                assetKey: "icons-purple-star",
                assetUrl: getAssetUrl(`${PREFIX}/purple-star.png`)
            },
        },
    },
    [AssetIconId.UpgradeStar]: {
        base: {
            assetKey: "icons-upgrade-star",
            assetUrl: getAssetUrl(`${PREFIX}/upgrade-star.png`)
        },
    },
    [AssetIconId.NFTStorage]: {
        base: {
            assetKey: "icons-nft-storage",
            assetUrl: getAssetUrl(`${PREFIX}/nft-storage.png`)
        },
    },
    [AssetIconId.Quests]: {
        base: {
            assetKey: "icons-quests",
            assetUrl: getAssetUrl(`${PREFIX}/quests.png`)
        },
    },
    [AssetIconId.Daily]: {
        base: {
            assetKey: "icons-daily",
            assetUrl: getAssetUrl(`${PREFIX}/daily.png`)
        },
    },
    [AssetIconId.Download]: {
        base: {
            assetKey: "icons-download",
            assetUrl: getAssetUrl(`${PREFIX}/download.png`)
        },
    },
    [AssetIconId.Next]: {
        base: {
            assetKey: "icons-next",
            assetUrl: getAssetUrl(`${PREFIX}/next.png`)
        },
    },
    [AssetIconId.USDC]: {
        base: {
            assetKey: "icons-usdc",
            assetUrl: getAssetUrl(`${PREFIX}/usdc.svg`)
        },
    },
    [AssetIconId.USDT]: {
        base: {
            assetKey: "icons-usdt",
            assetUrl: getAssetUrl(`${PREFIX}/usdt.svg`)
        },
    },
    [AssetIconId.Golds1]: {
        base: {
            assetKey: "icons-golds-1",
            assetUrl: getAssetUrl(`${PREFIX}/golds-1.png`)
        },
    },  
    [AssetIconId.Golds2]: {
        base: {
            assetKey: "icons-golds-2",
            assetUrl: getAssetUrl(`${PREFIX}/golds-2.png`)
        },
    },
    [AssetIconId.Golds3]: {
        base: {
            assetKey: "icons-golds-3",
            assetUrl: getAssetUrl(`${PREFIX}/golds-3.png`)
        },
    },
    [AssetIconId.Attack]: {
        base: {
            assetKey: "icons-attack",
            assetUrl: getAssetUrl(`${PREFIX}/attack.png`)
        },
        phaser: {
            base: {
                assetKey: "icons-attack",
                assetUrl: getAssetUrl(`${PREFIX}/attack.png`),
                version: 1
            },
        },
    },
    [AssetIconId.Defense]: {
        base: {
            assetKey: "icons-defense",
            assetUrl: getAssetUrl(`${PREFIX}/defense.png`)
        },
        phaser: {
            base: {
                assetKey: "icons-defense",
                assetUrl: getAssetUrl(`${PREFIX}/defense.png`),
                version: 1
            },
        },
    },
    [AssetIconId.Dog]: {
        base: {
            assetKey: "icons-dog",
            assetUrl: getAssetUrl(`${PREFIX}/dog.png`),
        },
        phaser: {
            base: {
                assetKey: "icons-dog",
                assetUrl: getAssetUrl(`${PREFIX}/dog.png`),
                version: 1
            },
        },
    },
    [AssetIconId.Cat]: {
        base: {
            assetKey: "icons-cat",
            assetUrl: getAssetUrl(`${PREFIX}/cat.png`)
        },
        phaser: {
            base: {
                assetKey: "icons-cat",
                assetUrl: getAssetUrl(`${PREFIX}/cat.png`),
                version: 1
            },
        },
    },
    [AssetIconId.QualityStar]: {
        base: {
            assetKey: "icons-quality-star",
            assetUrl: getAssetUrl(`${PREFIX}/quality-star.png`)
        },
        phaser: {
            base: {
                assetKey: "icons-quality-star",
                assetUrl: getAssetUrl(`${PREFIX}/quality-star.png`)
            },
        },
    },
}

