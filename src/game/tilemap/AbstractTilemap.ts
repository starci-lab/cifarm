import { Scene } from "phaser"
import { v4 } from "uuid"
import { HEIGHT, TILE_HEIGHT, TILE_WIDTH, WIDTH } from "./constants"

//abstract class for create a tilemap
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
    protected createTileset({
        tilesetName,
        key,
        scaleTextureWidth = 1,
        scaleTextureHeight = 1,
        textureHeight,
        textureWidth,
        gid = 0,
        extraOffsets = {},
    }: CreateTilesetOptions): Phaser.Tilemaps.Tileset {
    // get the image of the asset from the scene's textures
        const image = this.scene.textures
            .get(key)
            .getSourceImage() as HTMLImageElement

        // update the image dimensions
        image.width = textureWidth ?? Math.floor(image.width * scaleTextureWidth)
        image.height =
      textureHeight ?? Math.floor(image.height * scaleTextureHeight)

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
                y: -2 * (TILE_HEIGHT - image.height - y), // +2y to for extra offset
            }
        )
        if (!tileset) {
            throw new Error("Tileset not found")
        }

        return tileset
    }

    protected placeTileCenteredAt({
        gid,
        x,
        y,
        layer,
    }: PlaceTileCenteredAtParams) {
        return this.putTileAt(gid, x + WIDTH / 2, y + HEIGHT / 2, true, layer)
    }

    protected getTileCenteredAt({ x, y, layer }: GetTileCenteredAtParams) {
        return this.getTileAt(x + WIDTH / 2, y + HEIGHT / 2, false, layer)
    }

    protected removeTileCenteredAt({ x, y, layer }: RemoveTileCenteredAtParams) {
        return this.removeTileAt(x + WIDTH / 2, y + HEIGHT / 2, false, true, layer)
    }
}

export interface CreateTilesetOptions {
  // name of the tileset
  tilesetName: string;
  // asset key
  key: string;
  // scale width of texture
  scaleTextureWidth?: number;
  // if provide, ignore the scaleTextureWidth
  textureWidth?: number;
  // scale height of texture
  scaleTextureHeight?: number;
  // if provide, ignore the scaleTextureHeight
  textureHeight?: number;
  // gid
  gid?: number;
  // extra offsets
  extraOffsets?: ExtraOffsets;
}

export interface ExtraOffsets {
  x?: number;
  y?: number;
}

export interface PlaceTileCenteredAtParams {
  gid: number;
  x: number;
  y: number;
  layer?: Phaser.Tilemaps.TilemapLayer;
}

export interface RemoveTileCenteredAtParams {
  x: number;
  y: number;
  layer?: Phaser.Tilemaps.TilemapLayer;
}

export interface GetTileCenteredAtParams {
  x: number;
  y: number;
  layer?: Phaser.Tilemaps.TilemapLayer;
}
