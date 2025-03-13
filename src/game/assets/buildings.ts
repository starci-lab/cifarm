// we use range of GID from 12001 - 13000 to represent different types of buildings
import { BuildingId } from "@/modules/entities"
import { Scene } from "phaser"
import { ShopAssetData, TextureConfig, TilesetConfig } from "./types"

export interface BuildingAssetData {
  name: string;
  map: BuildingMapAssetData;
  shop?: ShopAssetData;
}

export interface BuildingMapAssetData {
    textureConfig: TextureConfig;
    tilesetConfig: TilesetConfig;
}

// Crop asset data map with the GID and asset URL for each crop using CropId as the key
export const buildingAssetMap: Record<BuildingId, BuildingAssetData> = {
    [BuildingId.Home]: {
        name: "Home",
        map: {
            tilesetConfig: {
                extraOffsets: { x: -40, y: -20 },
            },
            textureConfig: {
                key: "buildings-home",
                assetUrl: "buildings/home.png",
            },
        },
    },
    [BuildingId.Coop]: {
        name: "Coop",
        map: {
            tilesetConfig: {
                extraOffsets: { x: 0, y: -65 },
                starsConfig: {
                    extraOffsets: {
                        x: -60,
                        y: -320
                    }
                }
            },
            textureConfig: {
                key: "buildings-coop",
                assetUrl: "buildings/coop.png",
            },
        },
        shop: {
            textureConfig: {
                key: "buildings-coop",
                useExisting: true,
                scaleWidth: 0.35,
                scaleHeight: 0.35
            }
        }
    },
    [BuildingId.Barn]: {
        name: "Barn",
        map: {
            tilesetConfig: {
                extraOffsets: { x: 0, y: -60 },
                starsConfig: {
                    extraOffsets: {
                        x: -110,
                        y: -370
                    }
                }
            },
            textureConfig: {
                key: "buildings-barn",
                assetUrl: "buildings/barn.png",
            },
        },
        shop: {
            textureConfig: {
                key: "buildings-barn",
                useExisting: true,
                scaleWidth: 0.35,
                scaleHeight: 0.35
            }
        }
    },
}

// function to load animals assets (images) for each animal
export const loadBuildingAssets = (scene: Scene) => {
    // Iterate over each animalId in the animalAssetDataMap
    Object.keys(buildingAssetMap).forEach((buildingId) => {
        const _buildingId = buildingId as BuildingId
        const buildingData = buildingAssetMap[_buildingId]

        if (!buildingData) {
            throw new Error(`Building data not found for buildingId: ${buildingId}`)
        }

        // Load the asset for the building
        const { key, assetUrl, useExisting } = buildingData.map.textureConfig
        if (!useExisting) {
            scene.load.image(
                key,
                assetUrl
            )
        }
        
        // Load the asset for the shop
        if (buildingData.shop) {
            const { key, useExisting, assetUrl } = buildingData.shop.textureConfig
            if (useExisting) {
                scene.load.image(key, assetUrl)
            }
            
        }
    })
}