import { PlacedItemsSyncedMessage } from "@/hooks"
import { GroundTilemap } from "./GroundTilemap"
import { LayerName } from "./types"
import { EventBus, EventName } from "../event-bus"
import {
    PlacedItemEntity,
    PlacedItemTypeEntity,
    PlacedItemTypeId,
} from "@/modules/entities"
import { CACHE_PLACED_ITEM_TYPES } from "../constants"
import { placedItemAssetMap } from "../assets"
import { PlacedItemObject } from "./PlacedItemObject"

export class Tilemap extends GroundTilemap {
    // tileset map
    private readonly tilesetMap: Record<string, Phaser.Tilemaps.Tileset> = {}
    // item layer
    private itemLayer: Phaser.Tilemaps.ObjectLayer
    // previous placed items
    private previousPlacedItems: PlacedItemsSyncedMessage | undefined

    // place item objects map
    private readonly placedItemObjectMap: Record<string, PlacedItemObject> = {}

    constructor(scene: Phaser.Scene) {
        super(scene)

        const itemLayer = this.getObjectLayer(LayerName.Item)
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

    private createTilesets() {
        for (const [key, value] of Object.entries(placedItemAssetMap)) {
            this.createSingleTileTileset({
                key: key,
                tilesetName: key,
                ...value,
            })
        }
    }

    // logic to handle placed items update

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
    private getTilesetData(placedItemTypeId: PlacedItemTypeId) {
        const data = placedItemAssetMap[placedItemTypeId]
        if (!data) {
            throw new Error("Asset data not found")
        }
        return data
    }

    //counter to keep track of the tile object id
    private tiledObjectId = 0

    // get placed item type from cache
    private getPlacedItemType(
        placedItemTypeId: PlacedItemTypeId
    ): PlacedItemTypeEntity {
        const placedItemTypes = this.scene.cache.obj.get(
            CACHE_PLACED_ITEM_TYPES
        ) as Array<PlacedItemTypeEntity>
        const found = placedItemTypes.find((type) => type.id === placedItemTypeId)
        if (!found) {
            throw new Error("Placed item type not found")
        }
        return found
    }

    // reusable method to place a tile for a given placed item
    private placeTileForItem(placedItem: PlacedItemEntity) {
    // get tileset data
        const { gid, extraOffsets } = this.getTilesetData(placedItem.placedItemTypeId)
        // get the tileset
        const tileset = this.getTileset(placedItem.placedItemTypeId)
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
        const tile = this.getTileAt(
            placedItem.x,
            placedItem.y,
            true,
            this.groundLayer
        )
        if (!tile) {
            throw new Error("Tile not found")
        }

        // get the placed item type
        const placedItemType = this.getPlacedItemType(placedItem.placedItemTypeId)

        // get the placed item type
        // Fill the area of the item, above the tile
        this.itemLayer.objects.push({
            gid,
            id: this.tiledObjectId,
            name: placedItem.id,
            width: width * this.scale,
            height: height * this.scale,
            x: (this.scale * ((tile.x + 1.5) * this.tileWidth)) / 2,
            y: this.scale * ((tile.y + 0.5) * this.tileHeight),
            type: placedItemType.type,
            visible: true,
        })

        // create the objects
        const object = this.createFromObjects(LayerName.Item, {
            id: this.tiledObjectId,
            classType: PlacedItemObject,
        }).at(0) as PlacedItemObject | undefined
        if (!object) {
            throw new Error("Object not found")
        }

        // set the origin of the object
        object.setOrigin(1, 0.5)
        object.setDepth(placedItem.x + placedItem.y + 1)
        // destructuring the extra offsets
        const { x = 0, y = 0 } = { ...extraOffsets }
        object.setPosition(object.x + x, object.y + y)

        // store the object in the placed item objects map
        this.placedItemObjectMap[placedItem.id] = object

        // update the object
        object.update(placedItemType.type, placedItem)

        // increment the object id to ensure uniqueness
        this.tiledObjectId++
    }
}
