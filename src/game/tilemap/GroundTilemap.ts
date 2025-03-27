import {
    WIDTH,
    HEIGHT,
    TILE_WIDTH,
    TILE_HEIGHT,
    GRASS_GID,
    SCALE,
} from "./constants"
import { BaseTilemap } from "./BaseTilemap"
import { LayerName, ObjectLayerName, TilesetName } from "./types"
import { BaseAssetKey, baseAssetMap } from "../assets"
import { TilemapBaseConstructorParams } from "../types"

export class GroundTilemap extends BaseTilemap {
    // create the ground layer
    protected groundLayer: Phaser.Tilemaps.TilemapLayer | undefined
    protected paddingLayer: Phaser.Tilemaps.TilemapLayer | undefined
    // constructor
    constructor(baseParams: TilemapBaseConstructorParams) {
        super({
            baseParams,
            options: {
                width: WIDTH,
                height: HEIGHT,
                tileWidth: TILE_WIDTH,
                tileHeight: TILE_HEIGHT,
                objectLayerNames: [ObjectLayerName.Item],
                scale: SCALE,
            },
        })

        // create the layers
        this.createGroundLayer()
    }
    // create the ground layer
    private createGroundLayer() {
    // create the ground layer
        const grassTileset = this.createSingleTileTileset({
            tilesetName: TilesetName.Grass,
            key: baseAssetMap[BaseAssetKey.Grass].key,
            gid: GRASS_GID,
        })
        // create ground layer
        const groundLayer = this.createBlankLayer(LayerName.Ground, [
            grassTileset,
        ])
        if (!groundLayer) {
            throw new Error("Layer not found")
        }
        this.groundLayer = groundLayer

        // fill the layer with random tiles
        this.groundLayer.randomize(0, 0, this.width, this.height, [
            GRASS_GID
        ])

        for (const tile of this.groundLayer.getTilesWithin(
            0,
            0,
            this.width,
            this.height
        )) {
            // draw a diamond shape of the game object
            const centerX = tile.getCenterX()
            const centerY = tile.getCenterY()
            //draw the diamond shape
            const actualX = centerX - this.tileWidth / 2
            const actualY = centerY - this.tileHeight / 2
            const diamond = this.scene.add.graphics()
            diamond.fillStyle(0x6DB830, 1)
            diamond.fillPoints([
                { x: actualX, y: actualY - this.tileHeight / 2 },
                { x: actualX - this.tileWidth / 2, y: actualY },
                { x: actualX, y: actualY + this.tileHeight / 2 },
                { x: actualX + this.tileWidth / 2, y: actualY },
            ])
            diamond.closePath()
            // add the diamond shape to the tile
            diamond.setDepth(-1)
        }

        // scale the layer
        this.groundLayer.setScale(this.scale)

        // return the layer
        return this.groundLayer
    }
}
