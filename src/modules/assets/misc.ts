import { AssetTextureData } from "./types"

// Misc Asset Data Interface
export interface MiscAssetData {
    phaser: {
        base: AssetTextureData
    }
}

export enum AssetMiscId {
    Grass = "grass",
    GrassPartial = "grass-partial",
    BubbleState = "bubble-state",
    FertilizerParticle = "fertilizer-particle", 
    Yes = "yes",
    No = "no",
    QualityBubbleState = "quality-bubble-state",
}

const PREFIX = "/misc"

export const assetMiscMap: Record<AssetMiscId, MiscAssetData> = {
    [AssetMiscId.Grass]: {
        phaser: {
            base: {
                assetUrl: `${PREFIX}/grass.png`,
                assetKey: "misc-grass",
            },
        },
    },
    [AssetMiscId.GrassPartial]: {
        phaser: {
            base: {
                assetUrl: `${PREFIX}/grass-partial.png`,
                assetKey: "misc-grass-partial",
            },
        },
    },
    [AssetMiscId.BubbleState]: {
        phaser: {
            base: {
                assetUrl: `${PREFIX}/bubble-state.png`,
                assetKey: "misc-bubble-state",
            },
        }
    },
    [AssetMiscId.FertilizerParticle]: {
        phaser: {
            base: {
                assetUrl: `${PREFIX}/fertilizer-particle.png`,
                assetKey: "misc-fertilizer-particle",
            }
        }
    },
    [AssetMiscId.Yes]: {
        phaser: {
            base: {
                assetUrl: `${PREFIX}/yes.png`,
                assetKey: "misc-yes",
            }
        }
    },
    [AssetMiscId.No]: {
        phaser: {
            base: {
                assetUrl: `${PREFIX}/no.png`,
                assetKey: "misc-no",
            }
        }
    },
    [AssetMiscId.QualityBubbleState]: {
        phaser: {
            base: {
                assetUrl: `${PREFIX}/quality-bubble-state.png`,
                assetKey: "misc-quality-bubble-state",
            },
        },
    },
}
