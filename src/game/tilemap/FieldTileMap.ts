import { Scene } from "phaser"
import { AssetName } from "../assets"

export class FieldTilemap extends Phaser.Tilemaps.Tilemap {
    constructor(scene: Scene) {
        const mapData = new Phaser.Tilemaps.MapData({
            width: 256,
            height: 256,
            tileWidth: 200,
            tileHeight: 100,
            orientation: Phaser.Tilemaps.Orientation.ISOMETRIC,
            format: Phaser.Tilemaps.Formats.ARRAY_2D
        })

        super(scene, mapData)

        // Create base layer
        this.createBaseLayer()
    }

    private createBaseLayer() {
        // Create a new tileset
        const tileset = this.addTilesetImage("fieldTileset", AssetName.Grass, 200, 100)
        if (!tileset) {
            throw new Error("Tileset not found")
        }

        // Create base layer
        const baseLayer = this.createBlankLayer("base-layer", tileset)
        if (!baseLayer) {
            throw new Error("Layer not found")
        }

        baseLayer.setScale(2)

        // Randomize the tiles
        baseLayer.randomize(0, 0, this.width, this.height, [0])

        return baseLayer
    }
}