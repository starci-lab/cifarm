// we use range of GID from 12001 - 13000 to represent different types of buildings
import { BuildingId } from "@/modules/entities"
import { Scene } from "phaser"
import { ExtraOffsets, ShopAssetData, TextureConfig } from "./types"
import { fetchAsset } from "./fetch"

// Building Asset Data Interface
export interface BuildingStageAssetData {
    textureConfig: TextureConfig;
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
                assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/buildings/home/home.png",
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
                assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/buildings/coop/coop.png",
            },
            starsConfig: {
                extraOffsets: {
                    x: -50,
                    y: -300
                }
            },
        },
        shop: {
            textureConfig: {
                key: "buildings-coop-shop",
                assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/buildings/coop/shop.png",
                extraOffsets: { x: 0, y: -65 },
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
                    y: -370
                }
            }
        },
        shop: {
            textureConfig: {
                key: "buildings-barn-shop",
                assetUrl: "buildings/barn/shop.png",
            }
        }
    },
    [BuildingId.BeeHouse]: {
        name: "Bee House",
        map: {
            textureConfig: {
                extraOffsets: { x: 0, y: -65 },
                key: "buildings-bee-house",
                assetUrl: "buildings/bee-house/bee-house.png",
                spineConfig: {
                    atlas: {
                        key: "buildings-bee-house-atlas",
                        assetUrl: "buildings/bee-house/spine/bee-house.atlas",
                    },
                    json: {
                        key: "buildings-bee-house-json",
                        assetUrl: "buildings/bee-house/spine/bee-house.json",
                    },
                }
            },
            starsConfig: {
                extraOffsets: {
                    x: -50,
                    y: -300
                }
            },
        },
        shop: {
            textureConfig: {
                key: "buildings-bee-house-shop",
                assetUrl: "buildings/bee-house/shop.png",
            }
        }
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
            }
        }
    },   
}

// Function to load all building assets
export const loadBuildingAssets = async (scene: Scene) => {
    // Load all building assets
    for (const buildingData of Object.values(buildingAssetMap)) {
        // Load shop asset if exists
        if (buildingData.shop?.textureConfig.assetUrl) {
            await fetchAsset({
                key: buildingData.shop.textureConfig.key,
                assetUrl: buildingData.shop.textureConfig.assetUrl,
                scene,
            })
        }

        // Load map asset
        if (buildingData.map.textureConfig.assetUrl) {
            await fetchAsset({
                key: buildingData.map.textureConfig.key,
                assetUrl: buildingData.map.textureConfig.assetUrl,
                scene,
            })
        }
    }
}