import { v4 } from "uuid"
import { HEIGHT, SCALE, TILE_HEIGHT, TILE_WIDTH, WIDTH } from "./constants"
import { ExtraOffsets } from "../assets"
import { ConstructorParams, TilemapBaseConstructorParams } from "../types"

export type BaseTilemapOptions = Partial<{
  width: number;
  height: number;
  tileWidth: number;
  tileHeight: number;
  scale: number;
  objectLayerNames: Array<string>;
}>;

//base tilemap class, for utility methods to create a tilemap
export abstract class BaseTilemap extends Phaser.Tilemaps.Tilemap {
    // scale of the tilemap
    protected scale = SCALE
    // constructor
    constructor({
        baseParams: { scene, mapData },
        options
    }: ConstructorParams<TilemapBaseConstructorParams, BaseTilemapOptions>) {
        // create a new map data
        if (!mapData) {
            mapData = new Phaser.Tilemaps.MapData({
                width: options.width ?? WIDTH,
                height: options.height ?? HEIGHT,
                tileWidth: options.tileWidth ?? TILE_WIDTH,
                tileHeight: options.tileHeight ?? TILE_HEIGHT,
                orientation: Phaser.Tilemaps.Orientation.ISOMETRIC,
                format: Phaser.Tilemaps.Formats.ARRAY_2D,
                objects: options.objectLayerNames?.map(
                    (name) =>
                        new Phaser.Tilemaps.ObjectLayer({
                            name,
                        })
                ),
            })
        }
        // call the super constructor
        super(scene, mapData)

        // set the values
        this.scale = options.scale ?? SCALE
    }

    // create a tileset from a image that contain single tile
    protected createSingleTileTileset({
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
        // create the tileset
        const { x = 0, y = 0 } = extraOffsets
        const tileset = this.addTilesetImage(
            tilesetName,
            imageKey,
            image.width,
            image.height,
            0,
            0,
            gid,
            {
                x: -(this.tileWidth - image.width - x), // +x for extra offset
                y: -2 * (this.tileHeight - image.height - y), // +2y to for extra offset
            }
        )
        if (!tileset) {
            throw new Error("Tileset not found")
        }

        return tileset
    }

    public override putTileAt(
        tile: number | Phaser.Tilemaps.Tile,
        tileX: number,
        tileY: number,
        recalculateFaces?: boolean,
        layer?: string | number | Phaser.Tilemaps.TilemapLayer
    ) {
        return super.putTileAt(
            tile,
            tileX + Math.floor(WIDTH / 2),
            tileY + Math.floor(HEIGHT / 2),
            recalculateFaces,
            layer
        )
    }

    public override getTileAt(
        tileX: number,
        tileY: number,
        nonNull?: boolean,
        layer?: Phaser.Tilemaps.TilemapLayer
    ) {
        return super.getTileAt(
            tileX + Math.floor(WIDTH / 2),
            tileY + Math.floor(HEIGHT / 2),
            nonNull,
            layer
        )
    }

    public override removeTileAt(
        tileX: number,
        tileY: number,
        replaceWithNull?: boolean,
        recalculateFaces?: boolean,
        layer?: string | number | Phaser.Tilemaps.TilemapLayer
    ) {
        return super.removeTileAt(
            tileX + Math.floor(WIDTH / 2),
            tileY + Math.floor(HEIGHT / 2),
            replaceWithNull,
            recalculateFaces,
            layer
        )
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
