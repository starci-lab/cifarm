// we use range of GID from 13001 - 14000 to represent different types of tiles
import { TileId } from "@/modules/entities"
import { Scene } from "phaser"
import { TextureConfig } from "./types"
import { loadTexture } from "./utils"

export interface TileAssetData {
    name: string;
   // texture config
   textureConfig: TextureConfig
}

// Crop asset data map with the GID and asset URL for each crop using CropId as the key
export const tileAssetMap: Record<TileId, TileAssetData> = {
    [TileId.BasicTile]: {
        name: "Basic Tile 1",
        textureConfig: {
            key: "tiles-basic-tile",
            assetUrl: "tiles/starter-tile.png",
        },
    },
}

// Function to load all tile assets
export const loadTileAssets = async (scene: Scene) => {
    // Load all tile assets
    for (const tileData of Object.values(tileAssetMap)) {
        await loadTexture(scene, tileData.textureConfig)
    }
}

