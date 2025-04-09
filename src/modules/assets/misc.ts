import { AssetData } from "./types"

export enum AssetMisc {
    Lock = "lock",
}

const PREFIX = "misc"

export interface AssetMiscData {
    base: AssetData
}
export const assetMiscMap: Record<AssetMisc, AssetMiscData> = {
    [AssetMisc.Lock]: {
        base: {
            assetUrl: `${PREFIX}/lock.png`
        },
    },
}