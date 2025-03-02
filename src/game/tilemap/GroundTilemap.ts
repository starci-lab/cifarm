import { WIDTH, HEIGHT, TILE_WIDTH, TILE_HEIGHT, GRASS_GID, SCALE, FLOWER_GRASS_GID } from "./constants"
import { BaseTilemap } from "./BaseTilemap"
import { LayerName, ObjectLayerName, TilesetName } from "./types"
import { BaseAssetKey } from "../assets"
import { TilemapBaseConstructorParams } from "../types"

//show grid flag
export const SHOW_GRID = false

export class GroundTilemap extends BaseTilemap {
    // create the ground layer
    protected groundLayer: Phaser.Tilemaps.TilemapLayer
    // constructor
    constructor(baseParams: TilemapBaseConstructorParams) {
        super({
            baseParams,
            options: {
                width: WIDTH,
                height: HEIGHT,
                tileWidth: TILE_WIDTH,
                tileHeight: TILE_HEIGHT,
                objectLayerNames: [ObjectLayerName.Item, ObjectLayerName.Temporary],
                scale: SCALE,
            }
        })

        // set the ground layer
        this.groundLayer = this.createGroundLayer()

        // show grid
        this.showGrid()
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
        const groundLayer = this.createBlankLayer(LayerName.Ground, [grassTileset, flowerGrassTileset])
        if (!groundLayer) {
            throw new Error("Layer not found")
        }
        
        // fill the layer with random tiles
        groundLayer.randomize(0, 0, this.width, this.height, [
            ...Array.from({ length: 20 }, () => GRASS_GID),
            FLOWER_GRASS_GID
        ])
        
        // scale the layer
        groundLayer.setScale(this.scale)
        
        // return the layer
        return groundLayer
    }

    private showGrid() {
        if (SHOW_GRID) {
            const graphic = this.scene.add.graphics()
            graphic.lineStyle(1, 0x0000ff, 1) // Set the line style to blue with full opacity
            this.groundLayer.renderDebug(graphic, {
                collidingTileColor: 0x00ff00,
            })
        }
    }
}