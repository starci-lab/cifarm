import { BuildingId } from "@/modules/entities"
import { AssetData, AssetMapData, AssetMapType, Metadata } from "./types"

export interface AssetBuildingData extends Metadata {
    phaser: {
        map: AssetMapData;
    };
    base: AssetData;
}

export const assetBuildingMap: Record<BuildingId, AssetBuildingData> = {
    [BuildingId.Home]: {
        name: "Home",
        description: "Your main residence where you can rest and manage your farm.",
        phaser: {
            map: {
                type: AssetMapType.Texture,
                texture: {
                    assetKey: "buildings-home",
                    assetUrl: "buildings/home/home.png",
                    extraOffsets: { x: -80, y: -130 },
                },
            },
        },
        base: {
            assetKey: "buildings-home",
            assetUrl: "buildings/home/home.png",
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
                    assetUrl: "buildings/coop/coop.png",
                    extraOffsets: { x: 0, y: -140 },
                },
            },
        },
        base: {
            assetKey: "buildings-coop",
            assetUrl: "buildings/coop/coop.png",
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
                    assetUrl: "buildings/barn/barn.png",
                    extraOffsets: { x: 0, y: -120 },
                },
            },
        },
        base: {
            assetKey: "buildings-barn",
            assetUrl: "buildings/barn/barn.png",
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
                        key: "buildings-bee-house-atlas",
                        assetUrl: "buildings/bee-house/spine/bee-house.atlas",
                        textureUrl: "buildings/bee-house/spine/bee-house.png",
                    },
                    json: {
                        key: "buildings-bee-house-json",
                        assetUrl: "buildings/bee-house/spine/bee-house.json",
                    },
                    extraOffsets: { y: -130 },
                },
            },
        },
        base: {
            assetKey: "buildings-bee-house",
            assetUrl: "buildings/bee-house/spine/bee-house.png",
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
                    assetUrl: "buildings/pet-house/pet-house.png",
                    extraOffsets: { x: 0, y: -175 },
                },
            },
        },
        base: {
            assetKey: "buildings-pet-house",
            assetUrl: "buildings/pet-house/pet-house.png",
        },
    },
} 