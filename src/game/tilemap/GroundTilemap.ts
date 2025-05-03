import {
    WIDTH,
    HEIGHT,
    TILE_WIDTH,
    TILE_HEIGHT,
    GRASS_GID,
    GRASS_BORDER_1_GID,
    SCALE,
    GRASS_BORDER_2_GID,
    GRASS_BORDER_3_GID,
    GRASS_BORDER_4_GID,
    GRASS_BORDER_6_GID,
    GRASS_BORDER_5_GID,
    GRASS_BORDER_7_GID,
    GRASS_BORDER_8_GID,
} from "./constants"
import { BaseTilemap } from "./BaseTilemap"
import { LayerName, ObjectLayerName, TilesetName } from "./types"
import { assetMiscMap, AssetMiscId } from "@/modules/assets"
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
            key: assetMiscMap[AssetMiscId.Grass].phaser.base.assetKey,
            gid: GRASS_GID,
        })

        const grassBorder1Tileset = this.createSingleTileTileset({
            tilesetName: TilesetName.GrassBorder1,
            key: assetMiscMap[AssetMiscId.GrassBorder1].phaser.base.assetKey,
            gid: GRASS_BORDER_1_GID,
        })

        const grassBorder2Tileset = this.createSingleTileTileset({
            tilesetName: TilesetName.GrassBorder2,
            key: assetMiscMap[AssetMiscId.GrassBorder2].phaser.base.assetKey,
            gid: GRASS_BORDER_2_GID,
            extraOffsets: {
                x: -2,
                y: 0,
            }
        })

        const grassBorder3Tileset = this.createSingleTileTileset({
            tilesetName: TilesetName.GrassBorder3,
            key: assetMiscMap[AssetMiscId.GrassBorder3].phaser.base.assetKey,
            gid: GRASS_BORDER_3_GID,
            extraOffsets: {
                x: -2,
                y: -7,
            }
        })

        const grassBorder4Tileset = this.createSingleTileTileset({
            tilesetName: TilesetName.GrassBorder4,
            key: assetMiscMap[AssetMiscId.GrassBorder4].phaser.base.assetKey,
            gid: GRASS_BORDER_4_GID,
            extraOffsets: {
                x: -3,
                y: -7,
            }
        })

        const grassBorder5Tileset = this.createSingleTileTileset({
            tilesetName: TilesetName.GrassBorder5,
            key: assetMiscMap[AssetMiscId.GrassBorder5].phaser.base.assetKey,
            gid: GRASS_BORDER_5_GID,
            extraOffsets: {
                x: 0,
                y: -10,
            }
        })          

        const grassBorder6Tileset = this.createSingleTileTileset({
            tilesetName: TilesetName.GrassBorder6,
            key: assetMiscMap[AssetMiscId.GrassBorder6].phaser.base.assetKey,
            gid: GRASS_BORDER_6_GID,
            extraOffsets: {
                x: 3,
                y: -11,
            }
        })

        const grassBorder7Tileset = this.createSingleTileTileset({
            tilesetName: TilesetName.GrassBorder7,
            key: assetMiscMap[AssetMiscId.GrassBorder7].phaser.base.assetKey,
            gid: GRASS_BORDER_7_GID,
            extraOffsets: {
                x: 3,
                y: -5,
            }
        })
        
        const grassBorder8Tileset = this.createSingleTileTileset({
            tilesetName: TilesetName.GrassBorder8,
            key: assetMiscMap[AssetMiscId.GrassBorder8].phaser.base.assetKey,
            gid: GRASS_BORDER_8_GID,
            extraOffsets: {
                x: 3,
                y: -1,
            }
        })
        
        // create the grass par
        // create ground layer
        const groundLayer = this.createBlankLayer(LayerName.Ground, [
            grassTileset,
            grassBorder1Tileset,
            grassBorder2Tileset,
            grassBorder3Tileset,
            grassBorder4Tileset,
            grassBorder5Tileset,
            grassBorder6Tileset,
            grassBorder7Tileset,
            grassBorder8Tileset,
        ])
        if (!groundLayer) {
            throw new Error("Layer not found")
        }
        this.groundLayer = groundLayer

        // fill the layer with random tiles
        this.groundLayer.fill(GRASS_GID, 1, 1, this.width - 2, this.height - 2, true)
        // fill the corners with the border tiles
        this.groundLayer.fill(GRASS_BORDER_1_GID, 0, 0, 1, 1, true)
        this.groundLayer.fill(GRASS_BORDER_2_GID, 1, 0, this.width - 2, 1, true)
        //this.groundLayer.fill(GRASS_BORDER_2_GID, 0, this.height - 1, 1, 1)
        this.groundLayer.fill(GRASS_BORDER_3_GID, this.width - 1, 0, 1, 1, true)
        this.groundLayer.fill(GRASS_BORDER_4_GID, this.width - 1, 1, 1, this.height - 2, true)
        this.groundLayer.fill(GRASS_BORDER_5_GID, this.width - 1, this.height - 1, 1, 1, true)
        this.groundLayer.fill(GRASS_BORDER_6_GID, 1, this.height - 1, this.width - 2, 1, true)
        this.groundLayer.fill(GRASS_BORDER_7_GID, 0, this.height - 1, 1, 1, true)
        this.groundLayer.fill(GRASS_BORDER_8_GID, 0, 1, 1, this.height - 2, true)

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
            diamond.fillStyle(0x78CA35, 1)
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
