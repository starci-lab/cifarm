import { Scene } from "phaser"
import { AssetKey } from "../assets"
import { EventBus, EventName } from "../event-bus"
import { PlacedItemsSyncedMessage } from "@/hooks"
import { LayerName, TilesetName } from "./types"
import { BUILDING_HOME_GID, GRASS_GID, SCALE, TILE_STARTER_GID } from "./constants"
import { AbstractTilemap } from "./AbstractTilemap"

export class Tilemap extends AbstractTilemap {
    // constructor
    constructor(scene: Scene) {
        super(scene)

        // call the init method
        this.init()
    }

    // init
    init() {
    //listen for placed items synced
        EventBus.on(
            EventName.PlacedItemsSynced,
            (data: PlacedItemsSyncedMessage) => {
                console.log(data)
            }
        )

        // create layers
        this.createGroundLayer()
        this.createItemsLayer()
    }

    public shutdown() {
        EventBus.off(EventName.PlacedItemsSynced)
    }

    private createGroundLayer() {
        // Create a grass tileset
        const grassTileset = this.createTileset({
            tilesetName: TilesetName.Grass,
            key: AssetKey.Grass,
            gid: GRASS_GID,
        })

        // create ground layer
        const groundLayer = this.createBlankLayer(LayerName.Ground, grassTileset)
        if (!groundLayer) {
            throw new Error("Layer not found")
        }

        // fill the layer with random tiles
        groundLayer.randomize(0, 0, this.width, this.height, [0])

        // scale the layer
        groundLayer.setScale(SCALE)
        
        // return the layer
        return groundLayer
    }

    private createItemsLayer() {
        // Create tilesets
        // tile starter tileset
        const tileStarterTileset = this.createTileset({
            tilesetName: TilesetName.TileStarter,
            key: AssetKey.TileStarter,
            gid: TILE_STARTER_GID
        })
        
        // building home tileset
        const buildingHomeTileset = this.createTileset({
            tilesetName: TilesetName.BuildingHome,
            key: AssetKey.BuildingHome,
            gid: BUILDING_HOME_GID,
            scaleHeight: 0.8,
            scaleWidth: 0.8,
            extraOffsets: {
                y: 60,
                x: 20,
            }
        })

        // create items layer
        const itemsLayer = this.createBlankLayer(LayerName.Items, [tileStarterTileset, buildingHomeTileset])
        if (!itemsLayer) {
            throw new Error("Layer not found")
        }

        // scale the layer
        itemsLayer.setScale(SCALE)

        // try place 1 building home
        itemsLayer.putTileAt(BUILDING_HOME_GID, 2, 2)

        // return the layer
        return itemsLayer
    }
}
