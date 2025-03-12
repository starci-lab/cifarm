import {
    WIDTH,
    HEIGHT,
    TILE_WIDTH,
    TILE_HEIGHT,
    GRASS_GID,
    SCALE,
    FLOWER_GRASS_GID,
} from "./constants"
import { BaseTilemap } from "./BaseTilemap"
import { LayerName, ObjectLayerName, TilesetName } from "./types"
import { BaseAssetKey } from "../assets"
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
            key: BaseAssetKey.Grass,
            gid: GRASS_GID,
        })
        const flowerGrassTileset = this.createSingleTileTileset({
            tilesetName: TilesetName.FlowerGrass,
            key: BaseAssetKey.FlowerGrass,
            gid: FLOWER_GRASS_GID,
        })

        // create ground layer
        const groundLayer = this.createBlankLayer(LayerName.Ground, [
            grassTileset,
            flowerGrassTileset,
        ])
        if (!groundLayer) {
            throw new Error("Layer not found")
        }
        this.groundLayer = groundLayer

        // fill the layer with random tiles
        this.groundLayer.randomize(0, 0, this.width, this.height, [
            ...Array.from({ length: 20 }, () => GRASS_GID),
            FLOWER_GRASS_GID,
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
            // draw the diamond shape
            const diamond = this.scene.add.graphics()
            diamond.fillStyle(0x388a28, 1)
            diamond.fillPoints([
                { x: centerX, y: centerY - (this.tileHeight * this.scale) / 2 },
                { x: centerX + (this.tileWidth * this.scale) / 2, y: centerY },
                { x: centerX, y: centerY + (this.tileHeight * this.scale) / 2 },
                { x: centerX - (this.tileWidth * this.scale) / 2, y: centerY },
            ])
            diamond.closePath()
            // add the diamond shape to the tile
            diamond.setPosition(tile.pixelX, tile.pixelY).setDepth(-1)
        }

        // scale the layer
        this.groundLayer.setScale(this.scale)

        // return the layer
        return this.groundLayer
    }
}
