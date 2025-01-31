import { Scene } from "phaser"
import { AssetKey, CropName, getCropAssetKey, getCropTilesetGid } from "../assets"
import { EventBus, EventName } from "../event-bus"
import { PlacedItemsSyncedMessage } from "@/hooks"
import { LayerName, TilesetName } from "./types"
import {
    BUILDING_HOME_GID,
    GRASS_GID,
    HEIGHT,
    placedItemAssetMap,
    SCALE,
    TILE_STARTER_GID,
    WIDTH,
} from "./constants"
import { AbstractTilemap } from "./AbstractTilemap"
import { PlacedItemEntity } from "@/modules/entities"
import { NUM_GROWTH_STAGES } from "../assets"

export class Tilemap extends AbstractTilemap {
    // constructor
    constructor(scene: Scene) {
        super(scene)

        // call the init method
        this.init()
    }

    //store previous placed items
    private previousPlacedItems: PlacedItemsSyncedMessage | undefined
    private groundLayer: Phaser.Tilemaps.TilemapLayer | undefined
    private itemsLayer: Phaser.Tilemaps.TilemapLayer | undefined
    private cropLayer: Phaser.Tilemaps.TilemapLayer | undefined
    // init
    init() {
    //listen for placed items synced
        EventBus.on(
            EventName.PlacedItemsSynced,
            (data: PlacedItemsSyncedMessage) => {
                this.handlePlacedItemsUpdate(
                    data,
                    this.previousPlacedItems
                )
                // update the previous placed items
                this.previousPlacedItems = data
            }
        )

        // create layers
        this.groundLayer = this.createGroundLayer()
        this.itemsLayer = this.createItemsLayer()
        this.cropLayer = this.createCropLayer()
    }

    // methods to handle changes in the placed items
    private handlePlacedItemsUpdate(current: PlacedItemsSyncedMessage, previous?: PlacedItemsSyncedMessage) {
        // If current.userId doesn't match previous.userId, treat all placed items as new
        if (!previous || previous && current.userId !== previous.userId) {
            // If user IDs are different, create all placed items (treat as new)
            this.createAllPlacedItems(current.placedItems)
            return // Exit early to avoid redundant checks later
        }

        // Initialize the previousPlacedItems array only if previous exists
        const previousPlacedItems: Array<PlacedItemEntity> = previous.placedItems

        const { placedItems } = current

        // Store the unchecked previous placed items
        const checkedPreviousPlacedItems: Array<PlacedItemEntity> = []

        for (const placedItem of placedItems) {
            // If previous doesn't exist or the placed item is not in previous placed items, treat it as new
            if (!previousPlacedItems.some((item) => item.id === placedItem.id)) {
                // Place the item using the shared tile placing logic
                this.placeTileForItem(placedItem)
            } else {
                // Update the placed item if it already exists in previous placed items
                // You can add your update logic here (e.g., modify properties or reposition)
                // Example: this.updatePlacedItem(placedItem);
            }
            // Push the placed item to the checked previous placed items
            checkedPreviousPlacedItems.push(placedItem)
        } 

        // Remove the unchecked previous placed items that are no longer in the current placed items
        for (const placedItem of previousPlacedItems) {
            if (!checkedPreviousPlacedItems.some((item) => item.id === placedItem.id)) {
                // Remove the item if it no longer exists in the current placed items
                // const data = placedItemAssetMap[placedItem.placedItemTypeId]
                // if (!data) {
                //     throw new Error("Asset data not found for placed item: " + placedItem.id)
                // }
                this.removeTileCenteredAt({
                    x: placedItem.x,
                    y: placedItem.y,
                    layer: this.itemsLayer
                })
            }
        } 
    }

    // Helper method to create all placed items when user IDs differ
    private createAllPlacedItems(placedItems: Array<PlacedItemEntity>) {
        for (const placedItem of placedItems) {
            // Place the item using the shared tile placing logic
            this.placeTileForItem(placedItem)
        }
    }

    // Reusable method to place a tile for a given placed item
    private placeTileForItem(placedItem: PlacedItemEntity) {
        const data = placedItemAssetMap[placedItem.placedItemTypeId]
        if (!data) {
            throw new Error("Asset data not found for placed item: " + placedItem.id)
        }
        const { gid } = data

        // Fill the area of the item, above the tile
        this.placeTileCenteredAt({
            gid,
            x: placedItem.x,
            y: placedItem.y,
            layer: this.itemsLayer,
        })
    }
    
    private placeTileCenteredAt({ gid, x, y, layer }: PlaceTileCenteredAtParams) {
        this.putTileAt(gid, x + WIDTH / 2, y + HEIGHT / 2, true, layer) 
    }

    private getTileCenteredAt(x: number, y: number) {
        return this.getTileAt(x + WIDTH / 2, y + HEIGHT / 2)
    }

    private removeTileCenteredAt({ x, y, layer }: RemoveTileCenteredAtParams) {
        this.removeTileAt(x + WIDTH / 2, y + HEIGHT / 2, false, true, layer)
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
            gid: TILE_STARTER_GID,
        })

        // building home tileset
        const buildingHomeTileset = this.createTileset({
            tilesetName: TilesetName.BuildingHome,
            key: AssetKey.BuildingHome,
            gid: BUILDING_HOME_GID,
            scaleTextureHeight: 0.8,
            scaleTextureWidth: 0.8,
            extraOffsets: {
                y: 60,
                x: 20,
            },
        })

        // create items layer
        const itemsLayer = this.createBlankLayer(LayerName.Items, [
            tileStarterTileset,
            buildingHomeTileset,
        ])
        if (!itemsLayer) {
            throw new Error("Layer not found")
        }

        // scale the layer
        itemsLayer.setScale(SCALE)

        // return the layer
        return itemsLayer
    }

    // create a crop layer
    private createCropLayer() {
        // create tilesets
        // interate over the asset keys
        const tilesets: Array<Phaser.Tilemaps.Tileset> = []
        for (const key of Object.values(CropName)) {
            // create a tileset
            for (let i = 0; i < NUM_GROWTH_STAGES; i++) {
                const cropKey = getCropAssetKey({ cropName: key, growthStage: i })
                const tileset = this.createTileset({
                    tilesetName: cropKey,
                    key: cropKey,
                    gid: getCropTilesetGid({ cropName: key, growthStage: i }),
                })
                tilesets.push(tileset)
            }
        }

        // create crop layer
        const cropLayer = this.createBlankLayer(LayerName.Crop, [])
        if (!cropLayer) {
            throw new Error("Layer not found")
        }

        // scale the layer
        cropLayer.setScale(SCALE)

        // return the layer
        return cropLayer
    }
}

export interface PlaceTileCenteredAtParams {
    gid: number;
    x: number;
    y: number;
    layer?: Phaser.Tilemaps.TilemapLayer;
}

export interface RemoveTileCenteredAtParams {
    x: number;
    y: number;
    layer?: Phaser.Tilemaps.TilemapLayer;
}