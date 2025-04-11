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
            assetKey: "ui-frame",
            assetUrl: `${PREFIX}/frame.png`
        },
    },
    [AssetUI.Locked]: {
        base: {
            assetKey: "ui-locked",
            assetUrl: `${PREFIX}/locked.png`
        },
    },
    [AssetUI.SelectedArrow]: {
        base: {
            assetKey: "ui-selected-arrow",
            assetUrl: `${PREFIX}/selected-arrow.png`
        },
    },
}