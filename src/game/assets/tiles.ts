// we use range of GID from 13001 - 14000 to represent different types of tiles
import { TileId } from "@/modules/entities"
import { Scene } from "phaser"
import {
    MapAssetData,
    ShopAssetData,
    MainVisualType,
} from "./types"
import { loadTexture, loadSpine } from "./utils"

export interface TileAssetData {
  name: string;
  shop: ShopAssetData;
  map: MapAssetData;
}

// Crop asset data map with the GID and asset URL for each crop using CropId as the key
export const tileAssetMap: Record<TileId, TileAssetData> = {
    [TileId.BasicTile]: {
        name: "Basic Tile 1",
        map: {
            textureConfig: {
                key: "tiles-basic-tile",
                assetUrl: "tiles/starter-tile.png",
            },
        },
        shop: {
            textureConfig: {
                key: "tiles-basic-tile",
                assetUrl: "tiles/starter-tile.png",
            },
        },
    },
}

// Function to load all tile assets
export const loadTileAssets = async (scene: Scene) => {
    // Load all tile assets
    const promises: Array<Promise<void>> = []
    for (const tileData of Object.values(tileAssetMap)) {

        if (tileData.shop) {
            promises.push(loadTexture(scene, tileData.shop.textureConfig))
        }
        if (tileData.map) {
            switch (tileData.map.mainVisualType) {
            case MainVisualType.Spine:
                if (!tileData.map.spineConfig) {
                    throw new Error("Spine config is undefined")
                }
                promises.push(loadSpine(scene, tileData.map.spineConfig))
                break
            default:
                if (!tileData.map.textureConfig) {
                    throw new Error("Texture config is undefined")
                }
                promises.push(loadTexture(scene, tileData.map.textureConfig))
                break
            }
        }
    }
    await Promise.all(promises)
}
