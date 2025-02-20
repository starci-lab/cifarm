import { PlacedItemsSyncedMessage } from "@/hooks"
import { ObjectLayerName } from "./types"
import { EventBus, EventName } from "../event-bus"
import {
    PlacedItemSchema,
    PlacedItemType,
    PlacedItemTypeSchema,
    PlacedItemTypeId,
    getId,
    TileId,
    BuildingId,
} from "@/modules/entities"
import { PlacedItemObject } from "./PlacedItemObject"
import { CacheKey, TilemapBaseConstructorParams } from "../types"
import { GroundTilemap } from "./GroundTilemap"
import { buildingAssetMap, tileAssetMap, TilesetConfig } from "../assets"

export abstract class ItemTilemap extends GroundTilemap {
    // tileset map
    private readonly tilesetMap: Record<string, Phaser.Tilemaps.Tileset> = {}
    // item layer
    private itemLayer: Phaser.Tilemaps.ObjectLayer
    // previous placed items
    private previousPlacedItems: PlacedItemsSyncedMessage | undefined

    // place item objects map
    protected placedItemObjectMap: Record<string, PlacedItemObjectData> = {}

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
                //store the placed items in the cache
                this.scene.cache.obj.add(CacheKey.PlacedItems, data.placedItems)
                // handle the placed items update
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
            this.clearAllPlacedItems()
            this.createAllPlacedItems(current.placedItems)
            return // exit early to avoid redundant checks later
        }

        // initialize the previousPlacedItems array only if previous exists
        const previousPlacedItems: Array<PlacedItemSchema> = previous.placedItems

        const { placedItems } = current

        // store the unchecked previous placed items
        const checkedPreviousPlacedItems: Array<PlacedItemSchema> = []

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
                const gameObject = this.placedItemObjectMap[placedItem.id]?.object
                if (!gameObject) {
                    throw new Error("Game object not found")
                }
                gameObject.update(
                    this.getPlacedItemType(placedItem.placedItemType).type,
                    placedItem
                )
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
                this.placedItemObjectMap[placedItem.id]?.object.destroy()
            }
        }
    }

    // method to create all placed items when user IDs differ
    private createAllPlacedItems(placedItems: Array<PlacedItemSchema>) {
        for (const placedItem of placedItems) {
            // Place the item using the shared tile placing logic
            this.placeTileForItem(placedItem)
        }
    }

    private clearAllPlacedItems() {
        for (const [, value] of Object.entries(this.placedItemObjectMap)) {
            value.object.destroyAll()
        }
        this.placedItemObjectMap = {}
    }

    // method to get the GID for a placed item type
    private getTilesetData(placedItemTypeId: PlacedItemTypeId): TilesetConfig {
        const found = this.getPlacedItemType(placedItemTypeId)
        switch (found.type) {
        case PlacedItemType.Tile: {
            if (!found.tile) {
                throw new Error("Tile ID not found")
            }
            const tilesetConfig = tileAssetMap[getId<TileId>(found.tile)].tilesetConfig
            if (!tilesetConfig) {
                throw new Error("Tileset config not found")
            }
            return tilesetConfig
        }
        case PlacedItemType.Building: {
            if (!found.building) {
                throw new Error("Building ID not found")
            }
            const tilesetConfig = buildingAssetMap[getId<BuildingId>(found.building)].tilesetConfig
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
    ): PlacedItemTypeSchema {
        const placedItemTypes = this.scene.cache.obj.get(
            CacheKey.PlacedItemTypes
        ) as Array<PlacedItemTypeSchema>
        const found = placedItemTypes.find((type) => type.id === placedItemTypeId)
        if (!found) {
            throw new Error("Placed item type not found")
        }
        return found
    }

    // reusable method to place a tile for a given placed item
    private placeTileForItem(placedItem: PlacedItemSchema) {
        console.log(placedItem)
        // get tileset data
        const { gid, extraOffsets, tilesetName } = this.getTilesetData(
            placedItem.placedItemType
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
        const placedItemType = this.getPlacedItemType(placedItem.placedItemType)

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
        this.placedItemObjectMap[placedItem.id] = {
            object,
            tileX: tile.x,
            tileY: tile.y,
            placedItemType
        }
        // update the object
        object.update(placedItemType.type, placedItem)

        // increment the object id to ensure uniqueness
        this.tiledObjectId++
    }

    // method to get the object at a given tile
    protected getObjectAtTile(tileX: number, tileY: number): PlacedItemObjectData | null {
        const items = Object.values(this.placedItemObjectMap)
        const item = items.find(
            (item) => item.tileX === tileX && item.tileY === tileY
        )
        if (!item) {
            return null
        }
        const id = Object.keys(this.placedItemObjectMap).find(
            (key) => this.placedItemObjectMap[key] === item
        )
        if (!id) {
            throw new Error("ID not found")
        }
        return item
    }
}

export interface PlacedItemObjectData {
    object: PlacedItemObject
    tileX: number
    tileY: number
    placedItemType: PlacedItemTypeSchema
}