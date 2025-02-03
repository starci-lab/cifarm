// we use range of GID from 13001 - 14000 to represent different types of tiles
import { TileId } from "@/modules/entities"
import { Scene } from "phaser"
import { TextureConfig, TilesetConfig } from "./types"


export interface TileAssetData {
    name: string;
   // config for tileset
   tilesetConfig: TilesetConfig;
   // texture config
   textureConfig: TextureConfig
}

// Crop asset data map with the GID and asset URL for each crop using CropId as the key
export const tileAssetMap: Record<TileId, TileAssetData> = {
    [TileId.StarterTile]: {
        name: "Starter Tile",
        textureConfig: {
            key: "starter-tile",
            assetUrl: "tiles/starter-tile.png",
            //assetUrl: "tiles/xxxx.png",
        },
        tilesetConfig:{
            gid: 13001,
            tilesetName: "tiles-starter-tile",
        }
    },
    [TileId.BasicTile1]: {
        name: "Basic Tile 1",
        textureConfig: {
            key: "starter-tile",
            assetUrl: "tiles/starter-tile.png",
        },
        tilesetConfig: {
            gid: 13002,
            tilesetName: "tiles-basic-tile-1",
        }
    },
    [TileId.BasicTile2]: {
        name: "Basic Tile 2",
        textureConfig: {
            key: "starter-tile",
            assetUrl: "tiles/starter-tile.png",
        },
        tilesetConfig: {
            gid: 13003,
            tilesetName: "tiles-basic-tile-2",
        }
    },
    [TileId.BasicTile3]: {
        name: "Basic Tile 3",
        textureConfig: {
            key: "starter-tile",
            assetUrl: "tiles/starter-tile.png",
        },
        tilesetConfig: {
            gid: 13004,
            tilesetName: "tiles-basic-tile-3",
        }
    },
    [TileId.FertileTile]: {
        name: "Fertile Tile",
        textureConfig: {
            key: "starter-tile",
            assetUrl: "tiles/starter-tile.png",
        },
        tilesetConfig: {
            gid: 13005,
            tilesetName: "tiles-fertile-tile",
        }
    },
}

// Function to load animals assets (images) for each animal
export const loadTileAssets = (scene: Scene) => {
    // Iterate over each animalId in the animalAssetDataMap
    Object.keys(tileAssetMap).forEach((tileIdKey) => {
        const tileId = tileIdKey as TileId
        const tileData = tileAssetMap[tileId]

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

