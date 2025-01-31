import { Scene } from "phaser"
import { v4 } from "uuid"
import { HEIGHT, TILE_HEIGHT, TILE_WIDTH, WIDTH } from "./constants"
import { AssetKey } from "../assets"

export abstract class AbstractTilemap extends Phaser.Tilemaps.Tilemap {
    // constructor
    constructor(scene: Scene) {
    // create a new map data
        const mapData = new Phaser.Tilemaps.MapData({
            width: WIDTH,
            height: HEIGHT,
            tileWidth: TILE_WIDTH,
            tileHeight: TILE_HEIGHT,
            orientation: Phaser.Tilemaps.Orientation.ISOMETRIC,
            format: Phaser.Tilemaps.Formats.ARRAY_2D,
        })
        // call the super constructor
        super(scene, mapData)

        // set the values
        this.scene = scene
    }

    //  create a tileset
    public createTileset({
        tilesetName,
        key,
        scaleWidth = 1,
        scaleHeight = 1,
        gid = 0,
        extraOffsets = {},
    }: CreateTilesetOptions): Phaser.Tilemaps.Tileset {
    // get the image of the asset from the scene's textures
        const image = this.scene.textures
            .get(key)
            .getSourceImage() as HTMLImageElement

        // scale the image dimensions
        image.width = Math.floor(image.width * scaleWidth)
        image.height = Math.floor(image.height * scaleHeight)

        // create a new texture with the scaled image dimensions
        const imageKey = v4()
        this.scene.textures.addImage(imageKey, image)

        const { x = 0, y = 0 } = extraOffsets
        // create the tileset
        const tileset = this.addTilesetImage(
            tilesetName,
            imageKey,
            image.width,
            image.height,
            0,
            0,
            gid,
            {
                x: -(TILE_WIDTH - image.width - x), // +x for extra offset
                y: -2 * (TILE_HEIGHT - image.height - y) // +2y to for extra offset
            }
        )
        if (!tileset) {
            throw new Error("Tileset not found")
        }

        return tileset
    }
}

export interface CreateTilesetOptions {
  // name of the tileset
  tilesetName: string;
  // asset key
  key: AssetKey;
  // scale width and height
  scaleWidth?: number;
  scaleHeight?: number;
  // gid
  gid?: number;
  // extra offsets
  extraOffsets?: ExtraOffsets;
}

export interface ExtraOffsets {
  x?: number;
  y?: number;
}
