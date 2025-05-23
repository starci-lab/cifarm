import { TileId } from "@/modules/entities"
import { AssetData, AssetMapData, AssetMapType, Metadata } from "./types"
import { getAssetUrl } from "./utils"
const PREFIX = "/tiles"

export interface TileAssetMapData {
    mapData: AssetMapData,
}

export interface AssetTileData extends Metadata {
    phaser: {
        map: TileAssetMapData
    };
    base: AssetData
}

export const assetTileMap: Record<TileId, AssetTileData> = {
    [TileId.BasicTile]: {
        name: "Basic Tile",
        description: "A standard tile used for constructing farm paths and foundations.",
        phaser: {
            map: {
                mapData: {
                    type: AssetMapType.Texture,
                    texture: {
                        assetKey: "tiles-basic-tile",
                        assetUrl: getAssetUrl(`${PREFIX}/basic-tile/basic-tile.png`),
                    },
                },
            },
        },
        base: {
            assetUrl: getAssetUrl(`${PREFIX}/basic-tile/basic-tile.png`),
            assetKey: "tiles-basic-tile",
        },
    },
} 