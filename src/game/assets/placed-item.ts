import { PlacedItemTypeId } from "@/modules/entities"
import { ExtraOffsets } from "./types"

export interface PlacedItemAssetData {
  gid: number;
  assetUrl: string;
  scaleTextureWidth?: number;
  textureWidth?: number;
  scaleTextureHeight?: number;
  textureHeight?: number;
  extraOffsets?: ExtraOffsets;
}

export const placedItemAssetMap: Record<PlacedItemTypeId, PlacedItemAssetData> = {
    [PlacedItemTypeId.StarterTile]: {
        gid: 200,
        assetUrl: "tiles/starter-tile.png",
    },
    [PlacedItemTypeId.Home]: {
        gid: 201,
        assetUrl: "buildings/home.png",
        scaleTextureHeight: 0.8,
        scaleTextureWidth: 0.8,
        extraOffsets: { x: -70, y: -160 },
    },
    [PlacedItemTypeId.BasicTile1]: {
        gid: 202,
        assetUrl: "tiles/starter-tile.png",
    },
    [PlacedItemTypeId.BasicTile2]: {
        gid: 203,
        assetUrl: "tiles/starter-tile.png",
    },
    [PlacedItemTypeId.BasicTile3]: {
        gid: 204,
        assetUrl: "tiles/starter-tile.png",
    },
    [PlacedItemTypeId.FertileTile]: {
        gid: 205,
        assetUrl: "tiles/starter-tile.png",
    },
    [PlacedItemTypeId.Chicken]: {
        gid: 206,
        assetUrl: "tiles/starter-tile.png",
    },
    [PlacedItemTypeId.Cow]: {
        gid: 207,
        assetUrl: "tiles/starter-tile.png",
    },
    [PlacedItemTypeId.Coop]: {
        gid: 208,
        assetUrl: "tiles/starter-tile.png",
    },
    [PlacedItemTypeId.Pig]: {
        gid: 209,
        assetUrl: "tiles/starter-tile.png",
    },
    [PlacedItemTypeId.Sheep]: {
        gid: 210,
        assetUrl: "tiles/starter-tile.png",
    },
    [PlacedItemTypeId.Barn]: {
        gid: 211,
        assetUrl: "tiles/starter-tile.png",
    },
}

export const loadPlacedItemAssets = (scene: Phaser.Scene) => {
    Object.entries(placedItemAssetMap).forEach(([key, value]) => {
        scene.load.image(key, value.assetUrl)
    })
}
