import { AssetData } from "./types"

export enum AssetIcon {
    Golds = "golds",
    Energy = "energy",
    Tokens = "tokens"
}

const PREFIX = "icons"

export interface AssetIconData {
    base: AssetData
}
export const assetIconMap: Record<AssetIcon, AssetIconData> = {
    [AssetIcon.Golds]: {
        base: {
            assetUrl: `${PREFIX}/golds.png`
        },
    },
    [AssetIcon.Energy]: {
        base: {
            assetUrl: `${PREFIX}/energy.png`
        },
    },
    [AssetIcon.Tokens]: {
        base: {
            assetUrl: `${PREFIX}/tokens.png`
        },
    }
}

