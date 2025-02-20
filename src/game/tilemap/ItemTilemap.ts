import { PlacedItemsSyncedMessage } from "@/hooks"
import {
    BuildingId,
    getId,
    PlacedItemSchema,
    PlacedItemType,
    PlacedItemTypeId,
    PlacedItemTypeSchema,
    TileId,
} from "@/modules/entities"
import { buildingAssetMap, tileAssetMap, TilesetConfig } from "../assets"
import { EventBus, EventName } from "../event-bus"
import { CacheKey, TilemapBaseConstructorParams } from "../types"
import { GroundTilemap } from "./GroundTilemap"
import { PlacedItemObject } from "./PlacedItemObject"
import { ObjectLayerName } from "./types"

export abstract class ItemTilemap extends GroundTilemap {
    // tileset map
    private readonly tilesetMap: Record<string, Phaser.Tilemaps.Tileset> = {}
    // item layer
    private itemLayer: Phaser.Tilemaps.ObjectLayer
    // previous placed items
    private previousPlacedItems: PlacedItemsSyncedMessage | undefined

    // place item objects map
    protected readonly placedItemObjectMap: Record<string, PlacedItemObjectData> = {}

    //occupied tiles
    public occupiedTiles = new Set<string>()

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

                this.updateOccupiedTiles(data)
            }
        )

        EventBus.on(EventName.HighlightPlacement, () => {
            // this.highlightTilesCanPlace()
        })
        EventBus.on(EventName.UnhighlightPlacement, () => {
            // this.unhighlightTilesCanPlace()
        })
    }

    private updateOccupiedTiles(data: PlacedItemsSyncedMessage) {
        this.occupiedTiles.clear()
        
        for (const placedItem of data.placedItems) {
            const { x, y, placedItemType } = placedItem
            const { tileSizeWidth = 1, tileSizeHeight = 1 } = this.getTilesetData(placedItemType)
    
            for (let dx = 0; dx < tileSizeWidth; dx++) {
                for (let dy = 0; dy < tileSizeHeight; dy++) {
                    this.occupiedTiles.add(`${x - dx},${y - dy}`)
                }
            }
        }
    }
    
    private highlightTilesCanPlace() {
        console.log("Highlighting available tiles", this.occupiedTiles)
    
        // if (!this.scene || !this.groundLayer) return
    
        // const checkedTiles = new Set<string>()

        // //Convert to array
        // const occupiedTilesArray = Array.from(this.occupiedTiles)
    
        // for (const occupiedTile of occupiedTilesArray) {
        //     console.log("uytest: occupiedTile", occupiedTile, checkedTiles)
        //     if (checkedTiles.has(occupiedTile)) continue
            
        //     const [startX, startY] = occupiedTile.split(",").map(Number)
        //     const tile = this.getTileCenteredAt({ tileX: startX, tileY: startY, layer: this.groundLayer })
        //     if (!tile) continue
    
        //     const placedItem = this.getObjectAtTile(tile.x, tile.y)
        //     if (!placedItem) continue
    
        //     const { tileSizeWidth = 1, tileSizeHeight = 1 } = this.getTilesetData(placedItem.placedItemType.displayId as PlacedItemTypeId)
        //     console.log("uytest: ", tileSizeWidth, tileSizeHeight, placedItem.placedItemType.displayId, "tile", tile, 
        //         "startX", startX, "startY", startY, "placedItem", placedItem, "occupiedTile", occupiedTile,
        //         "tilex", tile.x, "tiley", tile.y, "tileSizeWidth", tileSizeWidth, "tileSizeHeight", tileSizeHeight
        //     )
    
        //     // Đánh dấu toàn bộ cụm tile
        //     for (let dx = 0; dx < tileSizeWidth; dx++) {
        //         for (let dy = 0; dy < tileSizeHeight; dy++) {
        //             const checkTileKey = `${startX + dx},${startY + dy}`
        //             checkedTiles.add(checkTileKey)
    
        //             const checkTile = this.getTileAt(startX + dx, startY + dy, false, this.groundLayer)
        //             if (!checkTile) continue
    
        //             // Highlight cụm ô bị chiếm
        //             checkTile.tint = 0xff0000
        //             checkTile.alpha = 0.3
        //         }
        //     }
        // }
    }
    
    
    private unhighlightTilesCanPlace() {
        console.log("Removing highlight from available tiles")
    
        if (!this.scene || !this.groundLayer) return
    
        for (let x = 0; x < this.groundLayer.width; x++) {
            for (let y = 0; y < this.groundLayer.height; y++) {
                const tileKey = `${x},${y}`
                if (this.occupiedTiles.has(tileKey)) continue 
    
                const tile = this.getTileAt(x, y, false, this.groundLayer)
                if (!tile) continue
    
                // Xóa highlight
                tile.clearAlpha()
                tile.tint = 0xffffff
            }
        }
    }


    public shutdown() {
        EventBus.off(EventName.PlacedItemsSynced)
        EventBus.off(EventName.HighlightPlacement)
        EventBus.off(EventName.UnhighlightPlacement)
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
            console.log({
                key: value.textureConfig.key,
                ...value.tilesetConfig,
            })
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
                console.log("placedItem: 111111111111111", placedItem)
                this.placeTileForItem(placedItem)
            } else {
                // if the placed item is in the previous placed items, update the item
                const gameObject = this.placedItemObjectMap[placedItem.id]?.object
                if (!gameObject) {
                    console.warn(`Game object not found for ID: ${placedItem.id}`)
                    this.placeTileForItem(placedItem)
                    continue
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

    // method to get the GID for a placed item type
    protected getTilesetData(placedItemTypeId: PlacedItemTypeId): TilesetConfig {
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
    protected getPlacedItemType(
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
        console.log("placedtileforItem new: ", placedItem)
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
        console.log("uytest: ", placedItem.x, placedItem.y, tile, placedItem)
        
        if (!tile) {
            console.log("placedItem", placedItem)
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

    // method to findPlacedItemRoot
    protected findPlacedItemRoot(x: number, y: number): PlacedItemObjectData | null {
        for (const placedItem of Object.values(this.placedItemObjectMap)) {
            const { tileX, tileY, placedItemType } = placedItem

            const { tileSizeWidth = 1, tileSizeHeight = 1 } = this.getTilesetData(placedItemType.id as PlacedItemTypeId)
    
            if (x <= tileX && x > tileX - tileSizeWidth &&
                y <= tileY && y > tileY - tileSizeHeight) {
                return placedItem
            }
        }
        return null
    }
}

export interface PlacedItemObjectData {
    object: PlacedItemObject
    tileX: number
    tileY: number
    placedItemType: PlacedItemTypeSchema
}