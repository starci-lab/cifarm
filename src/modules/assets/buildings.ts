import { BuildingId } from "@/modules/entities"
import { AssetData, AssetMapData, AssetMapType, Metadata } from "./types"

export interface StarsConfig {
    extraOffsets?: { x: number; y: number };
}

export interface AssetBuildingData extends Metadata {
    phaser: {
        map: AssetMapData;
        starsConfig?: StarsConfig;
    };
    base: AssetData;
}

const PREFIX = "buildings"
export const assetBuildingMap: Record<BuildingId, AssetBuildingData> = {
    [BuildingId.Home]: {
        name: "Home",
        description: "Your main residence where you can rest and manage your farm.",
        phaser: {
            map: {
                type: AssetMapType.Texture,
                texture: {
                    assetKey: "buildings-home",
                    assetUrl: `${PREFIX}/home/home.png`,
                    extraOffsets: { x: -80, y: -130 },
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
                type: AssetMapType.Texture,
                texture: {
                    assetKey: "buildings-coop",
                    assetUrl: `${PREFIX}/coop/coop.png`,
                    extraOffsets: { x: 0, y: -140 },
                },
            },
            starsConfig: {
                extraOffsets: {
                    x: -120,
                    y: -630,
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
                type: AssetMapType.Texture,
                texture: {
                    assetKey: "buildings-barn",
                    assetUrl: `${PREFIX}/barn/barn.png`,
                    extraOffsets: { x: 0, y: -120 },
                },
            },
            starsConfig: {
                extraOffsets: {
                    x: -205,
                    y: -730,
                },
            },
        },
        base: {
            assetKey: "buildings-barn",
            assetUrl: `${PREFIX}/barn/barn.png`,
        },
    },
    [BuildingId.BeeHouse]: {
        name: "Bee House",
        description: "A structure for housing bees and producing honey.",
        phaser: {
            map: {
                type: AssetMapType.Spine,
                spine: {
                    atlas: {
                        assetKey: "buildings-bee-house-atlas",
                        assetUrl: `${PREFIX}/bee-house/spine/bee-house.atlas`,
                        textureUrl: `${PREFIX}/bee-house/spine/bee-house.png`,
                    },
                    json: {
                        assetKey: "buildings-bee-house-json",
                        assetUrl: `${PREFIX}/bee-house/spine/bee-house.json`,
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
        },
        base: {
            assetKey: "buildings-bee-house",
            assetUrl: `${PREFIX}/bee-house/spine/bee-house.png`,
        },
    },
    [BuildingId.PetHouse]: {
        name: "Pet House",
        description: "A cozy shelter for your farm pets to rest and play.",
        phaser: {
            map: {
                type: AssetMapType.Texture,
                texture: {
                    assetKey: "buildings-pet-house",
                    assetUrl: `${PREFIX}/pet-house/pet-house.png`,
                    extraOffsets: { x: 0, y: -175 },
                },
            },
            starsConfig: {
                extraOffsets: {
                    x: -185,
                    y: -575,
                },
            },
        },
        base: {
            assetKey: "buildings-pet-house",
            assetUrl: `${PREFIX}/pet-house/pet-house.png`,
        },
    },
} 