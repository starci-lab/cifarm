import { AssetData } from "./types"

export enum AssetUI {
    Frame = "frame",
    SelectedArrow = "selected-arrow",
    Locked = "locked",
}

const PREFIX = "ui"

export interface AssetUIData {
    base: AssetData
}
export const assetUiMap: Record<AssetUI, AssetUIData> = {
    [AssetUI.Frame]: {
        base: {
            assetUrl: `${PREFIX}/frame.png`
        },
    },
    [AssetUI.Locked]: {
        base: {
            assetUrl: `${PREFIX}/locked.png`
        },
    },
    [AssetUI.SelectedArrow]: {
        base: {
            assetUrl: `${PREFIX}/selected-arrow.png`
        },
    },
}