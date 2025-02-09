import { PlacedItemsSyncedMessage } from "@/hooks"
import { ObjectLayerName } from "./types"
import { EventBus, EventName } from "../event-bus"
import {
    PlacedItemEntity,
    PlacedItemType,
    PlacedItemTypeEntity,
    PlacedItemTypeId,
} from "@/modules/entities"
import { PlacedItemObject } from "./PlacedItemObject"
import { CacheKey, TilemapBaseConstructorParams } from "../types"
import { GroundTilemap } from "./GroundTilemap"
import { buildingAssetMap, tileAssetMap, TilesetConfig } from "../assets"
import { TutorialContext } from "../contexts"

export abstract class ItemTilemap extends GroundTilemap {
    // tileset map
    private readonly tilesetMap: Record<string, Phaser.Tilemaps.Tileset> = {}
    // item layer
    private itemLayer: Phaser.Tilemaps.ObjectLayer
    // previous placed items
    private previousPlacedItems: PlacedItemsSyncedMessage | undefined

    // place item objects map
    private readonly placedItemObjectMap: Record<string, PlacedItemObject> = {}

    constructor(baseParams: TilemapBaseConstructorParams) {
        super(baseParams)

        const itemLayer = this.getObjectLayer(ObjectLayerName.Item)
        if (!itemLayer) {
            throw new Error("Item layer not found")
        }
        this.itemLayer = itemLayer
        this.createTilesets()

        EventBus.on(
            EventName.PlacedItemsSynced,
            (data: PlacedItemsSyncedMessage) => {
                this.handlePlacedItemsUpdate(data, this.previousPlacedItems)
                // update the previous placed items
                this.previousPlacedItems = data
            }
        )
    }

    // method called when the scene is shutdown
    public shutdown() {
        EventBus.off(EventName.PlacedItemsSynced)
    }

    // method to create tilesets for all tile assets
    private createTilesets() {
    // create tilesets for all tile assets
        for (const [, value] of Object.entries(tileAssetMap)) {
            this.createSingleTileTileset({
                key: value.textureConfig.key,
                ...value.tilesetConfig,
            })
            console.log({
                key: value.textureConfig.key,
                ...value.tilesetConfig,
            })
        }
        // create tilesets for all building assets
        for (const [, value] of Object.entries(buildingAssetMap)) {
            this.createSingleTileTileset({
                key: value.textureConfig.key,
                ...value.tilesetConfig,
            })
            console.log(value)
        }
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

        for (let i = 0; i < placedItems.length; i++) {
            //  store the first and second tile starter ids
            if (i === 0) {
                this.firstTileStarterId = placedItems[i].id
            } else if (i === 1) {
                this.secondTileStarterId = placedItems[i].id
            }

            // get the placed item
            const placedItem = placedItems[i]
            // if previous doesn't exist or the placed item is not in previous placed items, treat it as new
            const found = previousPlacedItems.find(
                (item) => item.id === placedItem.id
            )
            if (!found) {
                // place the item using the shared tile placing logic
                this.placeTileForItem(placedItem)
            } else {
                // if the placed item is in the previous placed items, update the item
            }
            // push the placed item to the checked previous placed items
            checkedPreviousPlacedItems.push(placedItem)
        }

        // remove the unchecked previous placed items that are no longer in the current placed items
        for (const placedItem of previousPlacedItems) {
            if (
                !checkedPreviousPlacedItems.some((item) => item.id === placedItem.id)
            ) {
                // remove the object from the item layer
                this.itemLayer.objects = this.itemLayer.objects.filter(
                    (object) => object.name !== placedItem.id
                )
                // remove the object from the tilemap
                this.placedItemObjectMap[placedItem.id]?.destroy()
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

    // method to get the GID for a placed item type
    private getTilesetData(placedItemTypeId: PlacedItemTypeId): TilesetConfig {
        const placedItemTypes = this.scene.cache.obj.get(
            CacheKey.PlacedItems
        ) as Array<PlacedItemTypeEntity>

        const found = placedItemTypes.find((type) => type.id === placedItemTypeId)
        if (!found) {
            throw new Error("Placed item type not found")
        }

        switch (found.type) {
        case PlacedItemType.Tile: {
            if (!found.tileId) {
                throw new Error("Tile ID not found")
            }
            const tilesetConfig = tileAssetMap[found.tileId].tilesetConfig
            if (!tilesetConfig) {
                throw new Error("Tileset config not found")
            }
            return tilesetConfig
        }
        case PlacedItemType.Building: {
            if (!found.buildingId) {
                throw new Error("Building ID not found")
            }
            const tilesetConfig = buildingAssetMap[found.buildingId].tilesetConfig
            if (!tilesetConfig) {
                throw new Error("Tileset config not found")
            }
            return tilesetConfig
        }
        case PlacedItemType.Animal: {
            throw new Error("Not implemented")
        }
        }
    }

    //counter to keep track of the tile object id
    private tiledObjectId = 0

    // get placed item type from cache
    private getPlacedItemType(
        placedItemTypeId: PlacedItemTypeId
    ): PlacedItemTypeEntity {
        const placedItemTypes = this.scene.cache.obj.get(
            CacheKey.PlacedItems
        ) as Array<PlacedItemTypeEntity>
        const found = placedItemTypes.find((type) => type.id === placedItemTypeId)
        if (!found) {
            throw new Error("Placed item type not found")
        }
        return found
    }

    // tile starter ids, to keep track of the first and second tile
    private firstTileStarterId: string | undefined
    private secondTileStarterId: string | undefined

    // reusable method to place a tile for a given placed item
    private placeTileForItem(placedItem: PlacedItemEntity) {
    // get tileset data
        const { gid, extraOffsets, tilesetName } = this.getTilesetData(
            placedItem.placedItemTypeId
        )
        // get the tileset
        const tileset = this.getTileset(tilesetName)
        if (!tileset) {
            throw new Error("Tileset not found")
        }
        // get the source image in the tileset
        const sourceImage = tileset.image?.getSourceImage()
        if (!sourceImage) {
            throw new Error("Source image not found")
        }
        // destructuring the to get width and height of the source image
        const { width, height } = sourceImage
        // get the tile
        const tile = this.getTileCenteredAt({
            tileX: placedItem.x,
            tileY: placedItem.y,
            layer: this.groundLayer,
        })
        if (!tile) {
            throw new Error("Tile not found")
        }

        // get the placed item type
        const placedItemType = this.getPlacedItemType(placedItem.placedItemTypeId)

        // check if tile is home, then we move the camera to it
        if (placedItemType.id === PlacedItemTypeId.Home) {
            const tileAt = this.getTileAt(tile.x, tile.y)
            if (!tileAt) {
                throw new Error("Tile at x,y not found")
            }
        }

        // get the placed item type
        // Fill the area of the item, above the tile
        this.itemLayer.objects.push({
            gid,
            id: this.tiledObjectId,
            name: placedItem.id,
            width: width * this.scale,
            height: height * this.scale,
            type: placedItemType.type,
            visible: true,
            ...this.computePositionForTiledObject(tile),
        })

        // create the objects
        const object = this.createFromObjects(ObjectLayerName.Item, {
            id: this.tiledObjectId,
            classType: PlacedItemObject,
        }).at(0) as PlacedItemObject | undefined
        if (!object) {
            throw new Error("Object not found")
        }

        // set the origin of the object
        object.setOrigin(1, 0.5)
        object.setDepth(tile.x + tile.y + 1)
        // destructuring the extra offsets
        const { x = 0, y = 0 } = { ...extraOffsets }
        object.setPosition(object.x + x, object.y + y)

        // store the object in the placed item objects map
        this.placedItemObjectMap[placedItem.id] = object

        // update the object
        object.update(placedItemType.type, placedItem)

        // check if the placed item is a tile starter
        if (placedItem.id === this.firstTileStarterId) {
            TutorialContext.firstTileStarter = object
        } else if (placedItem.id === this.secondTileStarterId) {
            TutorialContext.secondTileStarter = object
        }

        // increment the object id to ensure uniqueness
        this.tiledObjectId++
    }
}
