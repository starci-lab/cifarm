import { Scene } from "phaser"
import { AssetName } from "../assets"
import { EventBus, EventName } from "../event-bus"
import { PlacedItemsSyncedMessage } from "@/hooks"

export class FieldTilemap extends Phaser.Tilemaps.Tilemap {
    // constructor
    constructor(scene: Scene) {
        const mapData = new Phaser.Tilemaps.MapData({
            width: 256,
            height: 256,
            tileWidth: 200,
            tileHeight: 100,
            orientation: Phaser.Tilemaps.Orientation.ISOMETRIC,
            format: Phaser.Tilemaps.Formats.ARRAY_2D,
        })
        super(scene, mapData)

        //listen for placed items synced
        EventBus.on(
            EventName.PlacedItemsSynced,
            (data: PlacedItemsSyncedMessage) => {
                console.log(data)
            }
        )

        // Create base layer
        this.createBaseLayer()

        // Create placed items layer
        this.createPlacedItemsLayer()
    }

    public shutdown() {
        EventBus.off(EventName.PlacedItemsSynced)
    }

    // create a base layer, grass ground
    private createBaseLayer() {
    // Create a new tileset
        const grassImage = this.scene.textures
            .get(AssetName.Grass)
            .getSourceImage()
        const grassTileset = this.addTilesetImage(
            "grass-tileset",
            AssetName.Grass,
            grassImage.width,
            grassImage.height
        )
        if (!grassTileset) {
            throw new Error("Grass not found")
        }

        // Create base layer
        const baseLayer = this.createBlankLayer("base-layer", grassTileset)
        if (!baseLayer) {
            throw new Error("Layer not found")
        }

        baseLayer.setScale(2)

        // Randomize the tiles
        baseLayer.randomize(0, 0, this.width, this.height, [0])
        return baseLayer
    }

    // create placed items layer
    private createPlacedItemsLayer() {
    // Tile Starter Set
        const tileStarterImage = this.scene.textures
            .get(AssetName.TileStarter)
            .getSourceImage()
        const tileStarterTileset = this.addTilesetImage(
            "tile-starter-tileset",
            AssetName.TileStarter,
            tileStarterImage.width,
            tileStarterImage.height
        )

        if (!tileStarterTileset) {
            throw new Error("Tile Starter Tileset not found")
        }

        const buildingHomeImage = this.scene.textures
            .get(AssetName.BuildingHome)
            .getSourceImage()

        // Building Home Set
        const buildingHomeTileset = this.addTilesetImage(
            "building-home-tileset",
            AssetName.BuildingHome,
            buildingHomeImage.width,
            buildingHomeImage.height
        )

        if (!buildingHomeTileset) {
            throw new Error("Building Home Set not found")
        }

        // Create placed items layer
        const placedItemsLayer = this.createBlankLayer(
            "placed-items-layer",
            [tileStarterTileset, buildingHomeTileset]
        )
        if (!placedItemsLayer) {
            throw new Error("Layer not found")
        }

        placedItemsLayer.setScale(2)

        placedItemsLayer.randomize(0, 0, this.width, this.height, [0,1])

        return placedItemsLayer
    }
}
