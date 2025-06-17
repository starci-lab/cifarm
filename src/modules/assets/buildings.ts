import { BuildingId } from "@/types"
import { AssetData, AssetMapData, AssetMapType, BubbleStateConfig, Metadata } from "./types"
import { getAssetUrl } from "./utils"

export interface StarsConfig {
    extraOffsets?: { x: number; y: number };
}

export interface BuildingAssetMapData {
    mapData: AssetMapData,
    starsConfig?: StarsConfig;
    bubbleStateConfig?: BubbleStateConfig;
}

export interface AssetBuildingData extends Metadata {
    phaser: {
        map: BuildingAssetMapData;
    };
    base: AssetData;
}

const PREFIX = "/buildings"

export const assetBuildingMap: Record<BuildingId, AssetBuildingData> = {
    [BuildingId.Home]: {
        name: "Home",
        description: "Your main residence where you can rest and manage your farm.",
        phaser: {
            map: {
                mapData: {
                    type: AssetMapType.Texture,
                    texture: {
                        assetKey: "buildings-home",
                        assetUrl: getAssetUrl(`${PREFIX}/home/home.png`),
                        extraOffsets: { x: -80, y: -130 },
                        version: 1,
                    },
                },
                starsConfig: {
                    extraOffsets: {
                        x: -205,
                        y: -730,
                    },
                },
            },
        },
        base: {
            assetKey: "buildings-home",
            assetUrl: `${PREFIX}/home/home.png`,
        },
    },
    [BuildingId.Coop]: {
        name: "Coop",
        description: "A shelter for raising chickens and collecting eggs.",
        phaser: {
            map: {
                mapData: {
                    type: AssetMapType.Texture,
                    texture: {
                        assetKey: "buildings-coop",
                        assetUrl: `${PREFIX}/coop/coop.png`,
                        extraOffsets: { x: 0, y: -140 },
                        version: 1,
                    },
                },
                starsConfig: {
                    extraOffsets: {
                        x: -120,
                        y: -630,
                    },
                },
            },
        },
        base: {
            assetKey: "buildings-coop",
            assetUrl: `${PREFIX}/coop/coop.png`,
        },
    },
    [BuildingId.Barn]: {
        name: "Barn",
        description: "A large structure for housing and managing livestock.",
        phaser: {
            map: {
                mapData: {
                    type: AssetMapType.Texture,
                    texture: {
                        assetKey: "buildings-barn",
                        assetUrl: getAssetUrl(`${PREFIX}/barn/barn.png`),
                        extraOffsets: { x: 0, y: -120 },
                        version: 1,
                    },
                },
                starsConfig: {
                    extraOffsets: {
                        x: -205,
                        y: -730,
                    },
                },
            },
        },
        base: {
            assetKey: "buildings-barn",
            assetUrl: getAssetUrl(`${PREFIX}/barn/barn.png`),
        },
    },
    [BuildingId.BeeHouse]: {
        name: "Bee House",
        description: "A structure for housing bees and producing honey.",
        phaser: {
            map: {
                mapData: {
                    type: AssetMapType.Spine,
                    spine: {
                        atlas: {
                            assetKey: "buildings-bee-house-atlas",
                            assetUrl: `${PREFIX}/bee-house/spine/bee-house.atlas`,
                            textureUrl: `${PREFIX}/bee-house/spine/bee-house.png`,
                            version: 1,
                        },
                        json: {
                            assetKey: "buildings-bee-house-json",
                            assetUrl: `${PREFIX}/bee-house/spine/bee-house.json`,
                            version: 1,
                        },
                        extraOffsets: { y: -130 },
                    },
                },
                starsConfig: {
                    extraOffsets: {
                        x: -65,
                        y: -450,
                    },
                },
                bubbleStateConfig: {
                    extraOffsets: {
                        x: -75,
                        y: -130,
                    },
                },
            },
        },
        base: {
            assetKey: "buildings-bee-house",
            assetUrl: getAssetUrl(`${PREFIX}/bee-house/spine/bee-house.png`),
        },
    },
    [BuildingId.PetHouse]: {
        name: "Pet House",
        description: "A cozy shelter for your farm pets to rest and play.",
        phaser: {
            map: {
                mapData: {
                    type: AssetMapType.Texture,
                    texture: {
                        assetKey: "buildings-pet-house",
                        assetUrl: `${PREFIX}/pet-house/pet-house.png`,
                        extraOffsets: { x: 0, y: -175 },
                        version: 1,
                    },
                },
                starsConfig: {
                    extraOffsets: {
                        x: -185,
                        y: -575,
                    },
                },
            },
        },
        base: {
            assetKey: "buildings-pet-house",
            assetUrl: getAssetUrl(`${PREFIX}/pet-house/pet-house.png`),
        },
    },
    [BuildingId.FishPond]: {
        name: "Fish Pond",
        description: "A pond for raising fish and collecting fish.",
        phaser: {
            map: {
                mapData: {
                    type: AssetMapType.Spine,
                    spine: {
                        atlas: {
                            assetKey: "buildings-fish-pond-atlas",
                            assetUrl: `${PREFIX}/fish-pond/spine/fish-pond.atlas`,
                            textureUrl: `${PREFIX}/fish-pond/spine/fish-pond.png`,
                            version: 2
                        },
                        json: {
                            assetKey: "buildings-fish-pond-json",
                            assetUrl: `${PREFIX}/fish-pond/spine/fish-pond.json`,
                            version: 2
                        },
                        extraOffsets: { y: -375 },
                    },
                },
                starsConfig: {
                    extraOffsets: {
                        y: -700,
                        x: 0,
                    },
                },
            },
        },
        base: {
            assetKey: "buildings-fish-pond",
            assetUrl: getAssetUrl(`${PREFIX}/fish-pond/fish-pond.png`),
        },
    },
} 