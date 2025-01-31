import { PlacedItemTypeId } from "@/modules/entities"

// tileset gids
export const GRASS_GID = 0
export const TILE_STARTER_GID = 1
export const BUILDING_HOME_GID = 2

// default tile width and height
export const TILE_WIDTH = 200
export const TILE_HEIGHT = 100
export const WIDTH = 32
export const HEIGHT = 32

// scale
export const SCALE = 2

// Mapping of placed item types to their respective asset data
export const placedItemAssetMap: Partial<
  Record<PlacedItemTypeId, TileAssetData>
> = {
    [PlacedItemTypeId.StarterTile]: {
        gid: TILE_STARTER_GID,
        sizeX: 1,
        sizeY: 1,
    },
    [PlacedItemTypeId.Home]: {
        gid: BUILDING_HOME_GID,
        sizeX: 3,
        sizeY: 3,
    },
}

// Interface representing the asset data for placed items or tiles
export interface TileAssetData {
  gid: number;
  sizeX: number;
  sizeY: number;
}
