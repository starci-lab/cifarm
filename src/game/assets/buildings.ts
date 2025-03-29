// we use range of GID from 12001 - 13000 to represent different types of buildings
import { BuildingId } from "@/modules/entities"
import { Scene } from "phaser"
import {
    ExtraOffsets,
    MapAssetData,
    MainVisualType,
    ShopAssetData,
} from "./types"
import { loadSpine, loadTexture } from "./utils"
// Building Asset Data Interface
export interface BuildingStageAssetData extends MapAssetData {
  starsConfig?: StarsConfig;
}

export interface BuildingAssetData {
  name: string;
  map: BuildingStageAssetData;
  shop?: ShopAssetData;
}

export interface StarsConfig {
  extraOffsets?: ExtraOffsets;
}

// Building asset data map with the GID and asset URL for each building using BuildingId as the key
export const buildingAssetMap: Record<BuildingId, BuildingAssetData> = {
    [BuildingId.Home]: {
        name: "Home",
        map: {
            textureConfig: {
                key: "buildings-home",
                assetUrl: "buildings/home/home.png",
                extraOffsets: { x: -10, y: -65 },
            },
        },
    },
    [BuildingId.Coop]: {
        name: "Coop",
        map: {
            textureConfig: {
                extraOffsets: { x: 0, y: -65 },
                key: "buildings-coop",
                assetUrl: "buildings/coop/coop.png",
            },
            starsConfig: {
                extraOffsets: {
                    x: -50,
                    y: -300,
                },
            },
        },
        shop: {
            textureConfig: {
                key: "buildings-coop-shop",
                assetUrl: "buildings/coop/shop.png",
            },
        },
    },
    [BuildingId.Barn]: {
        name: "Barn",
        map: {
            textureConfig: {
                key: "buildings-barn",
                assetUrl: "buildings/barn/barn.png",
                extraOffsets: { x: 0, y: -60 },
            },
            starsConfig: {
                extraOffsets: {
                    x: -110,
                    y: -370,
                },
            },
        },
        shop: {
            textureConfig: {
                key: "buildings-barn-shop",
                assetUrl: "buildings/barn/shop.png",
            },
        },
    },
    [BuildingId.BeeHouse]: {
        name: "Bee House",
        map: {
            spineConfig: {
                atlas: {
                    key: "buildings-bee-house-atlas",
                    assetUrl: "buildings/bee-house/spine/bee-house.atlas",
                    textureUrl: "buildings/bee-house/spine/bee-house.png",
                },
                json: {
                    key: "buildings-bee-house-json",
                    assetUrl: "buildings/bee-house/spine/bee-house.json",
                },
            },
            mainVisualType: MainVisualType.Spine,
            starsConfig: {
                extraOffsets: {
                    x: -50,
                    y: -300,
                },
            },
        },
        shop: {
            textureConfig: {
                key: "buildings-bee-house-shop",
                assetUrl: "buildings/bee-house/shop.png",
            },
        },
    },
    [BuildingId.PetHouse]: {
        name: "Pet House",
        map: {
            textureConfig: {
                key: "buildings-pet-house",
                assetUrl: "buildings/pet-house/pet-house.png",
                extraOffsets: { x: 0, y: -65 },
            },
        },
        shop: {
            textureConfig: {
                key: "buildings-pet-house-shop",
                assetUrl: "buildings/pet-house/shop.png",
            },
        },
    },
}

// Function to load all building assets
export const loadBuildingAssets = async (scene: Scene) => {
    const promises: Array<Promise<void>> = []
    // Load all building assets
    for (const buildingData of Object.values(buildingAssetMap)) {
    // Load shop asset if exists
        if (buildingData.shop) {
            promises.push(loadTexture(scene, buildingData.shop.textureConfig))
        }
        
        switch (buildingData.map.mainVisualType) {
        case MainVisualType.Spine: {
            if (!buildingData.map.spineConfig) {
                throw new Error("Spine config is undefined")
            }
            promises.push(loadSpine(scene, buildingData.map.spineConfig))
            break
        }
        default: {
            if (!buildingData.map.textureConfig) {
                throw new Error("Texture config is undefined")
            }
            promises.push(loadTexture(scene, buildingData.map.textureConfig))
            break
        }
        }
    }
    await Promise.all(promises)
}
