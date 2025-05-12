import { AssetData, AssetMapData, AssetMapType, Metadata } from "./types"
import { TerrainId } from "../entities"

const PREFIX = "/terrains"

export interface AssetTerrainData extends Metadata {
    base: AssetData
    phaser: {
        map: AssetMapData
    }
}

export const assetTerrainMap: Record<TerrainId, AssetTerrainData> = {
    [TerrainId.SmallStone]: {
        name: "Small Stone",
        description: "A small stone found on the farm.",
        base: {
            assetKey: "terrain-small-stone",
            assetUrl: `${PREFIX}/small-stone/small-stone.png`
        },
        phaser: {
            map: {
                type: AssetMapType.Texture,
                texture: {
                    assetKey: "terrain-small-stone",
                    assetUrl: `${PREFIX}/small-stone/small-stone.png`,
                    version: 1,
                    extraOffsets: {
                        x: 0,
                        y: -60,
                    }
                }
            },
        },
    },
    [TerrainId.SmallGrassPatch]: {
        name: "Small Grass Patch",
        description: "A small patch of grass growing on the farm.",
        base: {
            assetKey: "terrain-small-grass-patch",
            assetUrl: `${PREFIX}/small-grass-patch/small-grass-patch.png`
        },
        phaser: {
            map: {
                type: AssetMapType.Texture,
                texture: {
                    assetKey: "terrain-small-grass-patch",
                    assetUrl: `${PREFIX}/small-grass-patch/small-grass-patch.png`,
                    version: 1,
                    extraOffsets: {
                        x: 0,
                        y: -60,
                    }
                }
            },
        },
    },
    [TerrainId.MapleTree]: {
        name: "Maple Tree",
        description: "A beautiful maple tree with colorful leaves.",
        base: {
            assetKey: "terrain-maple-tree",
            assetUrl: `${PREFIX}/maple-tree/maple-tree.png`
        },
        phaser: {
            map: {
                type: AssetMapType.Texture,
                texture: {
                    assetKey: "terrain-maple-tree",
                    assetUrl: `${PREFIX}/maple-tree/maple-tree.png`,
                    version: 3,
                    extraOffsets: {
                        x: 0,
                        y: -150,
                    },
                }
            },
        },
    },
    [TerrainId.OakTree]: {
        name: "Oak Tree",
        description: "A sturdy oak tree providing shade on the farm.",
        base: {
            assetKey: "terrain-oak-tree",
            assetUrl: `${PREFIX}/oak-tree/oak-tree.png`
        },
        phaser: {
            map: {
                type: AssetMapType.Texture,
                texture: {
                    assetKey: "terrain-oak-tree",
                    assetUrl: `${PREFIX}/oak-tree/oak-tree.png`,
                    version: 3,
                    extraOffsets: {
                        x: 0,
                        y: -150,
                    },
                }
            },
        },
    },
    [TerrainId.PineTree]: {
        name: "Pine Tree",
        description: "A tall pine tree with evergreen needles.",
        base: {
            assetKey: "terrain-pine-tree",
            assetUrl: `${PREFIX}/pine-tree/pine-tree.png`
        },
        phaser: {
            map: {
                type: AssetMapType.Texture,
                texture: {
                    assetKey: "terrain-pine-tree",
                    assetUrl: `${PREFIX}/pine-tree/pine-tree.png`,
                    version: 1,
                    extraOffsets: {
                        x: 0,
                        y: -150,
                    },
                }
            },
        },
    },
}
