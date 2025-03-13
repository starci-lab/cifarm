// we use range of GID from 13001 - 14000 to represent different types of tiles
import { TileId } from "@/modules/entities"
import { Scene } from "phaser"
import { TextureConfig } from "./types"


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

// Function to load animals assets (images) for each animal
export const loadTileAssets = (scene: Scene) => {
    // Iterate over each animalId in the animalAssetDataMap
    Object.keys(tileAssetMap).forEach((tileId) => {
        const _tileId = tileId as TileId
        const tileData = tileAssetMap[_tileId]

        if (!tileData) {
            throw new Error(`Tile data not found for tileId: ${tileId}`)
        }

        // Load the asset for the building
        scene.load.image(
            tileData.textureConfig.key,
            tileData.textureConfig.assetUrl
        )
    })
}

