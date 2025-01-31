import { Scene } from "phaser"
import {
    AssetKey,
    CropName,
    getCropAssetKey,
    getCropName,
    getCropTilesetGid,
} from "../assets"
import { EventBus, EventName } from "../event-bus"
import { PlacedItemsSyncedMessage } from "@/hooks"
import { LayerName, TilesetName } from "./types"
import {
    BUILDING_HOME_GID,
    GRASS_GID,
    placedItemAssetMap,
    SCALE,
    TILE_STARTER_GID,
} from "./constants"
import { AbstractTilemap } from "./AbstractTilemap"
import {
    PlacedItemEntity,
    PlacedItemType,
    PlacedItemTypeEntity,
} from "@/modules/entities"
import { NUM_GROWTH_STAGES } from "../assets"
import { CACHE_PLACED_ITEM_TYPES } from "../constants"

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
    
    // init method
    init() {
    //listen for placed items synced
        EventBus.on(
            EventName.PlacedItemsSynced,
            (data: PlacedItemsSyncedMessage) => {
                this.handlePlacedItemsUpdate(data, this.previousPlacedItems)
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
    private handlePlacedItemsUpdate(
        current: PlacedItemsSyncedMessage,
        previous?: PlacedItemsSyncedMessage
    ) {
        // if current.userId doesn't match previous.userId, treat all placed items as new
        if (!previous || (previous && current.userId !== previous.userId)) {
            // if user ids are different, create all placed items (treat as new)
            this.createAllPlacedItems(current.placedItems)
            return // exit early to avoid redundant checks later
        }

        // initialize the previousPlacedItems array only if previous exists
        const previousPlacedItems: Array<PlacedItemEntity> = previous.placedItems

        const { placedItems } = current

        // store the unchecked previous placed items
        const checkedPreviousPlacedItems: Array<PlacedItemEntity> = []

        for (const placedItem of placedItems) {
            // if previous doesn't exist or the placed item is not in previous placed items, treat it as new
            const found = previousPlacedItems.find((item) => item.id === placedItem.id)
            if (!found) {
                // place the item using the shared tile placing logic
                this.placeTileForItem(placedItem)
            } else {
                // Update the placed item if it already exists in previous placed items
                if (found.seedGrowthInfo && placedItem.seedGrowthInfo) {
                    this.updateSeedGrowthInfo(found, placedItem)
                }
            }
            // push the placed item to the checked previous placed items
            checkedPreviousPlacedItems.push(placedItem)
        }

        // remove the unchecked previous placed items that are no longer in the current placed items
        for (const placedItem of previousPlacedItems) {
            if (
                !checkedPreviousPlacedItems.some((item) => item.id === placedItem.id)
            ) {
                // Remove the item if it no longer exists in the current placed items
                // const data = placedItemAssetMap[placedItem.placedItemTypeId]
                // if (!data) {
                //     throw new Error("Asset data not found for placed item: " + placedItem.id)
                // }
                this.removeTileCenteredAt({
                    x: placedItem.x,
                    y: placedItem.y,
                    layer: this.itemsLayer,
                })
            }
        }
    }

    // method to create all placed items when user IDs differ
    private createAllPlacedItems(placedItems: Array<PlacedItemEntity>) {
        for (const placedItem of placedItems) {
            // Place the item using the shared tile placing logic
            this.placeTileForItem(placedItem)
        }
    }

    // method to update the seed growth info of a placed item
    private updateSeedGrowthInfo(
        previous: PlacedItemEntity,
        current: PlacedItemEntity
    ) {
        // if no seed growth info in previous or current, return
        if (!previous.seedGrowthInfo || !current.seedGrowthInfo) {
            throw new Error("Seed growth info not found")
        }

        // get the seed growth info of the placed item
        const previousSeedGrowthInfo = previous.seedGrowthInfo
        const currentSeedGrowthInfo = current.seedGrowthInfo

        // If the seed growth info is different, update the placed item
        if (
            previousSeedGrowthInfo &&
      currentSeedGrowthInfo &&
      previousSeedGrowthInfo.currentStage !== currentSeedGrowthInfo.currentStage
        ) {
            // Remove the previous crop tile
            this.removeTileCenteredAt({
                x: previous.x,
                y: previous.y,
                layer: this.cropLayer,
            })

            // Place the new crop tile
            this.placeTileCenteredAt({
                gid: getCropTilesetGid({
                    cropName: getCropName(currentSeedGrowthInfo.cropId),
                    growthStage: currentSeedGrowthInfo.currentStage,
                }),
                x: current.x,
                y: current.y,
                layer: this.cropLayer,
            })
        }
    }

    // reusable method to place a tile for a given placed item
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
        // get the type of the placed item
        const placedItemTypes = this.scene.cache.obj.get(
            CACHE_PLACED_ITEM_TYPES
        ) as Array<PlacedItemTypeEntity>
        const placedItemType = placedItemTypes.find(
            (type) => type.id === placedItem.placedItemTypeId
        )
        if (!placedItemType) {
            throw new Error("Placed item type not found")
        }

        switch (placedItemType.type) {
        case PlacedItemType.Tile: {
        // handle case for tile
        // get the seed growth info
            const seedGrowthInfo = placedItem.seedGrowthInfo
            if (!seedGrowthInfo) {
                // if no seed growth info, mean no crop, return
                return
            }
            const gid = getCropTilesetGid({
                cropName: getCropName(seedGrowthInfo.cropId),
                growthStage: seedGrowthInfo.currentStage,
            })

            this.placeTileCenteredAt({
                gid,
                x: placedItem.x,
                y: placedItem.y,
                layer: this.cropLayer,
            })
            break
        }
        default:
            break
        }
    }
    
    // method called when the scene is shutdown
    public shutdown() {
        EventBus.off(EventName.PlacedItemsSynced)
    }

    // create ground layer
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
    // create items layer
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
                    extraOffsets: {
                        y: 30,
                    },
                })
                tilesets.push(tileset)
            }
        }

        // create crop layer
        const cropLayer = this.createBlankLayer(LayerName.Crop, tilesets)
        if (!cropLayer) {
            throw new Error("Layer not found")
        }

        // scale the layer
        cropLayer.setScale(SCALE)

        // return the layer
        return cropLayer
    }
}

