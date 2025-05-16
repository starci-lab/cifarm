import { FontData } from "./types"

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
                assetUrl: "/fonts/rowdies.ttf",
            },
        },
    },
}
