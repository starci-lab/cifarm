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
        this.createBorder()
    }

    // create the border layer
    private createBorder() {
        // get 4 corners of the map
        const topLeft = this.getTileAt(0, 0)
        if (!topLeft) {
            throw new Error("Top left tile not found")
        }
        // add the border tileset to the top left corner
        const topLeftGrassPartial = this.scene.add.image(
            topLeft.getCenterX() - this.tileWidth/2, 
            topLeft.getCenterY() - this.tileHeight * 3/2, 
            assetMiscMap[AssetMiscId.GrassPartial].phaser.base.assetKey)
        // rotate the top left grass partial 180 degrees
        topLeftGrassPartial.setRotation(Math.PI)

        // add the border tileset to the top right corner
        const topRight = this.getTileAt(this.width - 1, 0)  
        if (!topRight) {
            throw new Error("Top right tile not found")
        }
        const topRightGrassPartial = this.scene.add.image(
            topRight.getCenterX() + this.tileWidth/2, 
            topRight.getCenterY() - this.tileHeight * 1/2, 
            assetMiscMap[AssetMiscId.GrassPartial].phaser.base.assetKey)
        // rotate the top right grass partial 90 degrees
        //topRightGrassPartial.setAngle(180/2)
        // const topRight = this.getTileAt(this.width, 0)
        // const bottomLeft = this.getTileAt(0, this.height)
        // const bottomRight = this.getTileAt(this.width, this.height)
    }   

    // create the ground layer
    private createGroundLayer() {
    // create the ground layer
        const grassTileset = this.createSingleTileTileset({
            tilesetName: TilesetName.Grass,
            key: assetMiscMap[AssetMiscId.Grass].phaser.base.assetKey,
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
