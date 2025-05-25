import { FontData } from "./types"
import { getAssetUrl } from "./utils"
const PREFIX = "/fonts"
export interface AssetFontData {
    phaser: {
        base: FontData
    };
}

export enum FontId {
    Rowdies = "Rowdies",
}
export const assetFontMap: Record<FontId, AssetFontData> = {
    [FontId.Rowdies]: {
        phaser: {
            base: {
                assetKey: "font-rowdies",
                assetUrl: getAssetUrl(`${PREFIX}/rowdies.ttf`),
            },
        },
    },
}
