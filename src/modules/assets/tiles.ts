import { TileId } from "@/modules/entities"
import { AssetData, AssetMapData, AssetMapType, Metadata } from "./types"

const PREFIX = "tiles"

export interface AssetTileData extends Metadata {
    phaser: {
        map: AssetMapData
    };
    base: AssetData
}

export const assetTileMap: Record<TileId, AssetTileData> = {
    [TileId.BasicTile]: {
        name: "Basic Tile",
        description: "A standard tile used for constructing farm paths and foundations.",
        phaser: {
            map: {
                type: AssetMapType.Texture,
                texture: {
                    assetKey: "tiles-basic-tile",
                    assetUrl: `${PREFIX}/basic-tile.png`,
                },
            },
        },
        base: {
            assetUrl: `${PREFIX}/basic-tile.png`,
            assetKey: "tiles-basic-tile",
        },
    },
} 