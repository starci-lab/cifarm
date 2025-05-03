import { AssetTextureData } from "./types"

// Misc Asset Data Interface
export interface MiscAssetData {
    phaser: {
        base: AssetTextureData
    }
}

export enum AssetMiscId {
    Grass = "grass",
    GrassBorder1 = "grass-border-1",
    GrassBorder2 = "grass-border-2",
    GrassBorder3 = "grass-border-3",
    GrassBorder4 = "grass-border-4",
    GrassBorder5 = "grass-border-5",
    GrassBorder6 = "grass-border-6",
    GrassBorder7 = "grass-border-7",
    GrassBorder8 = "grass-border-8",
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
    [AssetMiscId.GrassBorder1]: {
        phaser: {
            base: {
                assetUrl: `${PREFIX}/grass-border-1.png`,
                assetKey: "misc-grass-border-1",
                version: 1,
            },
        },
    },
    [AssetMiscId.GrassBorder2]: {
        phaser: {
            base: {
                assetUrl: `${PREFIX}/grass-border-2.png`,
                assetKey: "misc-grass-border-2",
                version: 1,
            },
        },
    },
    [AssetMiscId.GrassBorder3]: {
        phaser: {
            base: {
                assetUrl: `${PREFIX}/grass-border-3.png`,
                assetKey: "misc-grass-border-3",
                version: 1,
            },
        },
    },
    [AssetMiscId.GrassBorder4]: {
        phaser: {
            base: {
                assetUrl: `${PREFIX}/grass-border-4.png`,
                assetKey: "misc-grass-border-4",   
                version: 1,
            },
        },
    },
    [AssetMiscId.GrassBorder5]: {
        phaser: {
            base: { 
                assetUrl: `${PREFIX}/grass-border-5.png`,
                assetKey: "misc-grass-border-5",
                version: 1,
            },
        },
    },
    [AssetMiscId.GrassBorder6]: {
        phaser: {
            base: {
                assetUrl: `${PREFIX}/grass-border-6.png`,
                assetKey: "misc-grass-border-6",
                version: 1,
            },
        },
    },  
    [AssetMiscId.GrassBorder7]: {
        phaser: {
            base: {
                assetUrl: `${PREFIX}/grass-border-7.png`,
                assetKey: "misc-grass-border-7",
                version: 1,
            },
        },
    },  
    [AssetMiscId.GrassBorder8]: {
        phaser: {
            base: {
                assetUrl: `${PREFIX}/grass-border-8.png`,
                assetKey: "misc-grass-border-8",
                version: 1,
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
