import { AssetTextureData } from "./types"
import { getAssetUrl } from "./utils"
// State Asset Data Interface
export interface BootstrapAssetData {
    phaser: {
        base: AssetTextureData
    }
}

export enum AssetBootstrapId {
    Background = "background",
    Logo = "logo",
    LoadingBar = "loading-bar",
    LoadingFill = "loading-fill",
}

const PREFIX = "/bootstrap"

export const assetBootstrapMap: Record<AssetBootstrapId, BootstrapAssetData> = {
    [AssetBootstrapId.Background]: {
        phaser: {
            base: {
                assetUrl: getAssetUrl(`${PREFIX}/background.png`),
                assetKey: "bootstrap-background",
            },
        },
    },
    [AssetBootstrapId.Logo]: {
        phaser: {
            base: {
                assetUrl: getAssetUrl(`${PREFIX}/logo.png`),
                assetKey: "bootstrap-logo",
            },
        },
    },
    [AssetBootstrapId.LoadingBar]: {
        phaser: {
            base: {
                assetUrl: getAssetUrl(`${PREFIX}/loading-bar.png`),
                assetKey: "loading-bar",
            },
        },
    },
    [AssetBootstrapId.LoadingFill]: {
        phaser: {
            base: {
                assetUrl: getAssetUrl(`${PREFIX}/loading-fill.png`),
                assetKey: "loading-fill",
            },
        },
    },
}
  

