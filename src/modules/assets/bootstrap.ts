import { AssetTextureData } from "./types"

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
                assetUrl: `${PREFIX}/background.png`,
                assetKey: "bootstrap-background",
            },
        },
    },
    [AssetBootstrapId.Logo]: {
        phaser: {
            base: {
                assetUrl: `${PREFIX}/logo.png`,
                assetKey: "bootstrap-logo",
            },
        },
    },
    [AssetBootstrapId.LoadingBar]: {
        phaser: {
            base: {
                assetUrl: `${PREFIX}/loading-bar.png`,
                assetKey: "loading-bar",
            },
        },
    },
    [AssetBootstrapId.LoadingFill]: {
        phaser: {
            base: {
                assetUrl: `${PREFIX}/loading-fill.png`,
                assetKey: "loading-fill",
            },
        },
    },
}
  

