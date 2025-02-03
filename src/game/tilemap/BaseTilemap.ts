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
        options,
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
            // {
            //     x: -(this.tileWidth - image.width - x), // +x for extra offset
            //     y: -2 * (this.tileHeight - image.height - y), // +2y to for extra offset
            // }
            {
                x: (-this.tileWidth / 2 + image.width / 2 + x) * this.scale,
                y: (-this.tileHeight + image.height + y) * this.scale,
            }
        )
        if (!tileset) {
            throw new Error("Tileset not found")
        }

        return tileset
    }

    // we override to fix the wrong logic in the original method
    public override worldToTileXY(
        worldX: number,
        worldY: number,
        snapToFloor?: boolean,
        vec2?: Phaser.Math.Vector2,
        camera?: Phaser.Cameras.Scene2D.Camera,
        layer?: string | number | Phaser.Tilemaps.TilemapLayer
    ) {
        const result = super.worldToTileXY(
            worldX,
            worldY,
            snapToFloor,
            vec2,
            camera,
            layer
        )
        if (!result) {
            return null
        }
        return new Phaser.Math.Vector2(
            result.x + 1,
            result.y + 1
        )
    }

    public override getTileAtWorldXY(
        worldX: number,
        worldY: number,
        nonNull?: boolean | undefined,
        camera?: Phaser.Cameras.Scene2D.Camera | undefined,
        layer?: string | number | Phaser.Tilemaps.TilemapLayer | undefined
    ) {
        const vector2 = this.worldToTileXY(worldX, worldY)
        if (!vector2) {
            return null
        }
        return super.getTileAt(
            Math.floor(vector2.x),
            Math.floor(vector2.y),
            nonNull,
            layer
        )
    }

    public putTileCenteredAt({
        tile,
        tileX,
        tileY,
        recalculateFaces,
        layer,
    }: PutTileCenteredAtParams) {
        return this.putTileAt(
            tile,
            tileX + Math.floor(WIDTH / 2),
            tileY + Math.floor(HEIGHT / 2),
            recalculateFaces,
            layer
        )
    }

    // getTileCenteredAt method using the new GetTileCenteredAtParams interface
    public getTileCenteredAt({
        tileX,
        tileY,
        nonNull,
        layer,
    }: GetTileCenteredAtParams) {
        return this.getTileAt(
            tileX + Math.floor(WIDTH / 2),
            tileY + Math.floor(HEIGHT / 2),
            nonNull,
            layer
        )
    }

    // removeTileCenteredAt method using the new RemoveTileCenteredAtParams interface
    public removeTileCenteredAt({
        tileX,
        tileY,
        replaceWithNull,
        recalculateFaces,
        layer,
    }: RemoveTileCenteredAtParams) {
        return this.removeTileAt(
            tileX + Math.floor(WIDTH / 2),
            tileY + Math.floor(HEIGHT / 2),
            replaceWithNull,
            recalculateFaces,
            layer
        )
    }

    public computePositionForTiledObject(tile: Phaser.Tilemaps.Tile
        //, object: Phaser.GameObjects.GameObject
    ) {
        // base unit for x and y
        const baseXUnit = this.scale * this.tileWidth / 2
        const baseYUnit = this.scale * this.tileHeight
        return {
            x: baseXUnit * (tile.x + 1/2),
            y: baseYUnit * (tile.y + 1/2),
            // x: vector2.x,
            // y: vector2.y
        }
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

// Define the interface for the options used in tile functions
export interface PutTileCenteredAtParams {
  tile: number | Phaser.Tilemaps.Tile;
  tileX: number;
  tileY: number;
  recalculateFaces?: boolean;
  layer?: string | number | Phaser.Tilemaps.TilemapLayer;
}

// Define the interface for the options used in getTileCenteredAt function
export interface GetTileCenteredAtParams {
  tileX: number;
  tileY: number;
  nonNull?: boolean;
  layer?: string | number | Phaser.Tilemaps.TilemapLayer;
}

// Define the interface for the options used in removeTileCenteredAt function
export interface RemoveTileCenteredAtParams {
  tileX: number;
  tileY: number;
  replaceWithNull?: boolean;
  recalculateFaces?: boolean;
  layer?: string | number | Phaser.Tilemaps.TilemapLayer;
}
