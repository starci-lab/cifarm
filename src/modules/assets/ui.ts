import { AssetData } from "./types"

export enum AssetUi {
    Frame = "frame",
}

const PREFIX = "ui"

export interface AssetUiData {
    base: AssetData
}
export const assetUiMap: Record<AssetUi, AssetUiData> = {
    [AssetUi.Frame]: {
        base: {
            assetUrl: `${PREFIX}/frame.png`
        },
    },
}