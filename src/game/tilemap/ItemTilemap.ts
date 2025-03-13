import {
    ActionEmittedMessage,
    ActionName,
    HarvestCropData,
    PlacedItemsSyncedMessage,
    ThiefCropData,
} from "@/hooks"
import { sleep } from "@/modules/common"
import {
    Activities,
    AnimalSchema,
    BuildingSchema,
    CropSchema,
    FruitSchema,
    InventoryTypeSchema,
    PlacedItemSchema,
    PlacedItemType,
    PlacedItemTypeId,
    PlacedItemTypeSchema,
    ProductSchema,
    SupplySchema,
    TileSchema,
    ToolSchema,
    UserSchema,
} from "@/modules/entities"
import _ from "lodash"
import { DeepPartial } from "react-hook-form"
import { BaseAssetKey, productAssetMap } from "../assets"
import { FADE_HOLD_TIME, FADE_TIME } from "../constants"
import { EventBus, EventName, Position } from "../event-bus"
import { CacheKey, TilemapBaseConstructorParams } from "../types"
import { GroundTilemap } from "./GroundTilemap"
import { PlacedItemObject } from "./PlacedItemObject"
import { ObjectLayerName } from "./types"
import { waitUtil } from "../ui"

const DEPTH_MULTIPLIER = 100
const EXPERIENCE_KEY = BaseAssetKey.UICommonExperience
const ENERGY_KEY = BaseAssetKey.UITopbarIconEnergy

export abstract class ItemTilemap extends GroundTilemap {
    // tileset map
    private readonly tilesetMap: Record<string, Phaser.Tilemaps.Tileset> = {}
    private fading = false
    private isWaiting = false
    // item layer
    private itemLayer: Phaser.Tilemaps.ObjectLayer
    // previous placed items
    private previousPlacedItems: PlacedItemsSyncedMessage | undefined

    //placement item id
    protected movingPlacedItemId: string | undefined

    // place item objects map
    protected placedItemObjectMap: Record<string, PlacedItemObjectData> = {}
    protected activities: Activities
    protected crops: Array<CropSchema>
    protected products: Array<ProductSchema>
    protected user: UserSchema
    protected animals: Array<AnimalSchema>
    protected fruits: Array<FruitSchema>
    protected buildings: Array<BuildingSchema>
    protected _tiles: Array<TileSchema>
    protected supplies: Array<SupplySchema>
    protected tools: Array<ToolSchema>
    protected placedItemTypes: Array<PlacedItemTypeSchema>
    protected inventoryTypes: Array<InventoryTypeSchema>

    constructor(baseParams: TilemapBaseConstructorParams) {
        super(baseParams)

        const itemLayer = this.getObjectLayer(ObjectLayerName.Item)
        if (!itemLayer) {
            throw new Error("Item layer not found")
        }
        this.itemLayer = itemLayer
        this.user = this.scene.cache.obj.get(CacheKey.User)
        this.activities = this.scene.cache.obj.get(CacheKey.Activities)
        this.crops = this.scene.cache.obj.get(CacheKey.Crops)
        this.products = this.scene.cache.obj.get(CacheKey.Products)
        this.buildings = this.scene.cache.obj.get(CacheKey.Buildings)
        this.animals = this.scene.cache.obj.get(CacheKey.Animals)
        this._tiles = this.scene.cache.obj.get(CacheKey.Tiles)
        this.supplies = this.scene.cache.obj.get(CacheKey.Supplies)
        this.tools = this.scene.cache.obj.get(CacheKey.Tools)
        this.placedItemTypes = this.scene.cache.obj.get(CacheKey.PlacedItemTypes)
        this.inventoryTypes = this.scene.cache.obj.get(CacheKey.InventoryTypes)
        this.fruits = this.scene.cache.obj.get(CacheKey.Fruits)

        EventBus.on(EventName.ShowFade, async (toNeighbor: boolean) => {
            this.fading = true
            // console.log(toNeighbor)
            EventBus.emit(EventName.FadeIn)
            await sleep(FADE_TIME)
            EventBus.emit(toNeighbor ? EventName.Visit : EventName.Return)
            this.fading = false
            await sleep(FADE_HOLD_TIME)
            EventBus.emit(EventName.FadeOut)
        })

        EventBus.on(EventName.UpdatePlacedItems, async () => {
            let data = this.scene.cache.obj.get(
                CacheKey.PlacedItems
            ) as PlacedItemsSyncedMessage

            if (this.isWaiting) {
                data = this.scene.cache.obj.get(
                    CacheKey.PlacedItems
                ) as PlacedItemsSyncedMessage
            }
            if (this.fading) {
                this.isWaiting = true
                await waitUtil(() => !this.fading)
            }
            // handle the placed items update
            this.handlePlacedItemsUpdate(data, this.previousPlacedItems)
            // update the previous placed items
            this.previousPlacedItems = data
            if (this.isWaiting) {
                this.isWaiting = false
            }
        })

        EventBus.on(
            EventName.HandlePlacedItemUpdatePosition,
            (data: HandlePlacedItemUpdatePositionParams) => {
                this.handlePlacedItemUpdatePosition(data)
            }
        )

        const data = this.scene.cache.obj.get(
            CacheKey.PlacedItems
        ) as PlacedItemsSyncedMessage
        if (data) {
            // handle the placed items update
            this.handlePlacedItemsUpdate(data, this.previousPlacedItems)
            // update the previous placed items
            this.previousPlacedItems = data
        }

        EventBus.on(EventName.ActionEmitted, (data: ActionEmittedMessage) => {
            const object = this.placedItemObjectMap[data.placedItemId]?.object
            const position = object.getCenter()
            position.y -= this.tileHeight
            switch (data.action) {
            case ActionName.Water:
                if (data.success) {
                    this.scene.events.emit(EventName.CreateFlyItems, [
                        {
                            assetKey: ENERGY_KEY,
                            position,
                            quantity: -this.activities.water.energyConsume,
                        },
                        {
                            assetKey: EXPERIENCE_KEY,
                            position,
                            quantity: this.activities.water.experiencesGain,
                        },
                    ])
                } else {
                    this.scene.events.emit(EventName.CreateFlyItem, {
                        position,
                        text: "Failed to " + ActionName.Water,
                    })
                }
                break

            case ActionName.PlantSeed:
                if (data.success) {
                    this.scene.events.emit(EventName.CreateFlyItems, [
                        {
                            assetKey: ENERGY_KEY,
                            position,
                            quantity: -this.activities.plantSeed.energyConsume,
                        },
                        {
                            assetKey: EXPERIENCE_KEY,
                            position,
                            quantity: this.activities.plantSeed.experiencesGain,
                        },
                    ])
                } else {
                    this.scene.events.emit(EventName.CreateFlyItem, {
                        position,
                        text: "Failed to " + ActionName.PlantSeed,
                    })
                }
                break

            case ActionName.UsePesticide:
                if (data.success) {
                    this.scene.events.emit(EventName.CreateFlyItems, [
                        {
                            assetKey: ENERGY_KEY,
                            position,
                            quantity: -this.activities.usePesticide.energyConsume,
                        },
                        {
                            assetKey: EXPERIENCE_KEY,
                            position,
                            quantity: this.activities.usePesticide.experiencesGain,
                        },
                    ])
                } else {
                    this.scene.events.emit(EventName.CreateFlyItem, {
                        position,
                        text: "Failed to " + ActionName.UsePesticide,
                    })
                }
                break
            case ActionName.HelpUsePesticide:
                if (data.success) {
                    this.scene.events.emit(EventName.CreateFlyItems, [
                        {
                            assetKey: ENERGY_KEY,
                            position,
                            quantity: -this.activities.helpUsePesticide.energyConsume,
                        },
                        {
                            assetKey: EXPERIENCE_KEY,
                            position,
                            quantity: this.activities.helpUsePesticide.experiencesGain,
                        },
                    ])
                } else {
                    this.scene.events.emit(EventName.CreateFlyItem, {
                        position,
                        text: "Failed to " + ActionName.HelpUsePesticide,
                    })
                }
                break
            case ActionName.UseHerbicide:
                if (data.success) {
                    this.scene.events.emit(EventName.CreateFlyItems, [
                        {
                            assetKey: ENERGY_KEY,
                            position,
                            quantity: -this.activities.useHerbicide.energyConsume,
                        },
                        {
                            assetKey: EXPERIENCE_KEY,
                            position,
                            quantity: this.activities.useHerbicide.experiencesGain,
                        },
                    ])
                } else {
                    this.scene.events.emit(EventName.CreateFlyItem, {
                        position,
                        text: "Failed to " + ActionName.UseHerbicide,
                    })
                }
                break
            case ActionName.HelpUseHerbicide:
                if (data.success) {
                    this.scene.events.emit(EventName.CreateFlyItems, [
                        {
                            assetKey: ENERGY_KEY,
                            position,
                            quantity: -this.activities.helpUseHerbicide.energyConsume,
                        },
                        {
                            assetKey: EXPERIENCE_KEY,
                            position,
                            quantity: this.activities.helpUseHerbicide.experiencesGain,
                        },
                    ])
                } else {
                    this.scene.events.emit(EventName.CreateFlyItem, {
                        position,
                        text: "Failed to " + ActionName.UseFertilizer,
                    })
                }
                break
            case ActionName.UseFertilizer:
                if (data.success) {
                    this.scene.events.emit(EventName.CreateFlyItems, [
                        {
                            assetKey: ENERGY_KEY,
                            position,
                            quantity: -this.activities.useFertilizer.energyConsume,
                        },
                        {
                            assetKey: EXPERIENCE_KEY,
                            position,
                            quantity: this.activities.useFertilizer.experiencesGain,
                        },
                    ])
                } else {
                    this.scene.events.emit(EventName.CreateFlyItem, {
                        position,
                        text: "Failed to " + ActionName.UseFertilizer,
                    })
                }
                break
            case ActionName.HarvestCrop:
                if (data.success) {
                    const { quantity, cropId } = data.data as HarvestCropData
                    const crop = this.crops.find((crop) => crop.id === cropId)
                    if (!crop) {
                        throw new Error("Crop not found")
                    }
                    const product = this.products.find(
                        (product) => product.crop === crop.id
                    )
                    if (!product) {
                        throw new Error("Product not found")
                    }
                    const assetKey =
              productAssetMap[product.displayId].textureConfig.key
                    this.scene.events.emit(EventName.CreateFlyItems, [
                        {
                            assetKey: ENERGY_KEY,
                            position,
                            quantity: -this.activities.harvestCrop.energyConsume,
                        },
                        {
                            assetKey: EXPERIENCE_KEY,
                            position,
                            quantity: this.activities.harvestCrop.experiencesGain,
                        },
                        {
                            assetKey,
                            position,
                            quantity,
                        },
                    ])
                } else {
                    this.scene.events.emit(EventName.CreateFlyItem, {
                        position,
                        text: "Failed to " + ActionName.HarvestCrop,
                    })
                }
                break
            case ActionName.ThiefCrop:
                if (data.success) {
                    const { quantity, cropId } = data.data as ThiefCropData
                    const crop = this.crops.find((crop) => crop.id === cropId)
                    if (!crop) {
                        throw new Error("Crop not found")
                    }
                    const product = this.products.find(
                        (product) => product.crop === crop.id
                    )
                    if (!product) {
                        throw new Error("Product not found")
                    }
                    const assetKey =
              productAssetMap[product.displayId].textureConfig.key
                    this.scene.events.emit(EventName.CreateFlyItems, [
                        {
                            assetKey: ENERGY_KEY,
                            position,
                            quantity: -this.activities.thiefCrop.energyConsume,
                        },
                        {
                            assetKey: EXPERIENCE_KEY,
                            position,
                            quantity: this.activities.thiefCrop.experiencesGain,
                        },
                        {
                            assetKey,
                            position,
                            quantity,
                        },
                    ])
                } else {
                    switch (data.reasonCode) {
                    case 1:
                        this.scene.events.emit(EventName.CreateFlyItem, {
                            position,
                            text: "You are already thieved",
                        })
                        break
                    }
                }
                break
            case ActionName.CureAnimal:
                if (data.success) {
                    this.scene.events.emit(EventName.CreateFlyItems, [
                        {
                            assetKey: ENERGY_KEY,
                            position,
                            quantity: -this.activities.cureAnimal.energyConsume,
                        },
                        {
                            assetKey: EXPERIENCE_KEY,
                            position,
                            quantity: this.activities.cureAnimal.experiencesGain,
                        },
                    ])
                } else {
                    this.scene.events.emit(EventName.CreateFlyItem, {
                        position,
                        text: "Failed to " + ActionName.CureAnimal,
                    })
                }
                break
            case ActionName.FeedAnimal:
                if (data.success) {
                    this.scene.events.emit(EventName.CreateFlyItems, [
                        {
                            assetKey: ENERGY_KEY,
                            position,
                            quantity: -this.activities.feedAnimal.energyConsume,
                        },
                        {
                            assetKey: EXPERIENCE_KEY,
                            position,
                            quantity: this.activities.feedAnimal.experiencesGain,
                        },
                    ])
                } else {
                    this.scene.events.emit(EventName.CreateFlyItem, {
                        position,
                        text: "Failed to " + ActionName.FeedAnimal,
                    })
                }
                break
            case ActionName.CollectAnimalProduct:
                if (data.success) {
                    this.scene.events.emit(EventName.CreateFlyItems, [
                        {
                            assetKey: ENERGY_KEY,
                            position,
                            quantity: -this.activities.collectAnimalProduct.energyConsume,
                        },
                        {
                            assetKey: EXPERIENCE_KEY,
                            position,
                            quantity: this.activities.collectAnimalProduct.experiencesGain,
                        },
                    ])
                } else {
                    this.scene.events.emit(EventName.CreateFlyItem, {
                        position,
                        text: "Failed to " + ActionName.CollectAnimalProduct,
                    })
                }
                break
            case ActionName.ThiefAnimalProduct:
                if (data.success) {
                    this.scene.events.emit(EventName.CreateFlyItems, [
                        {
                            assetKey: ENERGY_KEY,
                            position,
                            quantity: -this.activities.thiefAnimalProduct.energyConsume,
                        },
                        {
                            assetKey: EXPERIENCE_KEY,
                            position,
                            quantity: this.activities.thiefAnimalProduct.experiencesGain,
                        },
                    ])
                } else {
                    this.scene.events.emit(EventName.CreateFlyItem, {
                        position,
                        text: "Failed to " + ActionName.ThiefAnimalProduct,
                    })
                }
                break
            case ActionName.HelpCureAnimal:
                if (data.success) {
                    this.scene.events.emit(EventName.CreateFlyItems, [
                        {
                            assetKey: ENERGY_KEY,
                            position,
                            quantity: -this.activities.helpCureAnimal.energyConsume,
                        },
                        {
                            assetKey: EXPERIENCE_KEY,
                            position,
                            quantity: this.activities.helpCureAnimal.experiencesGain,
                        },
                    ])
                } else {
                    this.scene.events.emit(EventName.CreateFlyItem, {
                        position,
                        text: "Failed to " + ActionName.HelpCureAnimal,
                    })
                }
                break
            case ActionName.HelpWater:
                if (data.success) {
                    this.scene.events.emit(EventName.CreateFlyItems, [
                        {
                            assetKey: ENERGY_KEY,
                            position,
                            quantity: -this.activities.helpWater.energyConsume,
                        },
                        {
                            assetKey: EXPERIENCE_KEY,
                            position,
                            quantity: this.activities.helpWater.experiencesGain,
                        },
                    ])
                } else {
                    this.scene.events.emit(EventName.CreateFlyItem, {
                        position,
                        text: "Failed to " + ActionName.HelpWater,
                    })
                }
                break
            }
        })
    }

    public shutdown() {
        EventBus.off(EventName.PlacedItemsSynced)
        EventBus.off(EventName.RequestUpdatePlacedItemLocal)
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
                // place the item using the shared tile placing
                this.placeTileForItem(placedItem)
            } else {
                // if the placed item is in the previous placed items, update the item
                const gameObject = this.placedItemObjectMap[placedItem.id]?.object
                if (!gameObject) {
                    this.placeTileForItem(placedItem)
                    continue
                }
                if (
                    this.movingPlacedItemId &&
          this.movingPlacedItemId === placedItem.id
                ) {
                    console.log("movingPlacedItemId", this.movingPlacedItemId)
                    this.clearPlacedItem(placedItem)
                    this.placedItemObjectMap[this.movingPlacedItemId]?.object.destroy()

                    return
                }
                gameObject.updateContent(placedItem)
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

    protected clearPlacedItem(placedItem: PlacedItemSchema) {
        const gameObject = this.placedItemObjectMap[placedItem.id]?.object
        const placedItemType = this.placedItemTypes.find(
            (placedItemType) => placedItemType.id === placedItem.placedItemType
        )
        if (!placedItemType) {
            throw new Error("Placed item type not found")
        }
        gameObject.update(placedItemType.type, {
            ...placedItem,
            seedGrowthInfo: undefined,
            animalInfo: undefined,
            buildingInfo: undefined,
        })
    }

    private handlePlacedItemUpdatePosition({
        placedItemId,
        position,
    }: HandlePlacedItemUpdatePositionParams) {
        const placedItem = this.previousPlacedItems?.placedItems.find(
            (item) => item.id === placedItemId
        )
        if (!placedItem) {
            throw new Error("Placed item not found")
        }

        //remove old object
        this.itemLayer.objects = this.itemLayer.objects.filter(
            (object) => object.name !== placedItemId
        )
        this.placedItemObjectMap[placedItemId]?.object.destroy()

        // Place the item again at the new position
        this.placeTileForItem({
            ...placedItem,
            x: position.x,
            y: position.y,
        })
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

    //counter to keep track of the tile object id
    private tiledObjectId = 0

    // reusable method to place a tile for a given placed item
    protected placeTileForItem(placedItem: PlacedItemSchema) {
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
        const placedItemType = this.placedItemTypes.find(
            (placedItemType) => placedItemType.id === placedItem.placedItemType
        )
        if (!placedItemType) {
            throw new Error("Placed item type not found")
        }
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
            id: this.tiledObjectId,
            name: placedItem.id,
            type: placedItemType.type,
            visible: true,
            width: 0,
            height: 0,
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
        object
            .setOrigin(1, 0.5)
            .setDepth((tile.x + tile.y + 1) * DEPTH_MULTIPLIER)
            .setScale(this.scale)
        // store the object in the placed item objects map
        this.placedItemObjectMap[placedItem.id] = {
            object,
            tileX: tile.x,
            tileY: tile.y,
            placedItemType,
            occupiedTiles: this.getOccupiedTiles(placedItem, placedItemType),
        }
        // update the object
        object.updateContent(placedItem)
        // increment the object id to ensure uniqueness
        this.tiledObjectId++
    }

    private getOccupiedTiles(
        placedItem: PlacedItemSchema,
        placedItemType: PlacedItemTypeSchema
    ) {
        const occupiedTiles: Array<Position> = []
        for (let dx = 0; dx < placedItemType.sizeX; dx++) {
            for (let dy = 0; dy < placedItemType.sizeY; dy++) {
                occupiedTiles.push({ x: placedItem.x - dx, y: placedItem.y - dy })
            }
        }
        return occupiedTiles
    }

    protected canPlaceItemAtTile({
        tileX,
        tileY,
        tileSizeWidth,
        tileSizeHeight,
    }: CanPlaceItemAtTileParams): boolean {
        const occupiedTiles: Array<Position> = _.flatMap(
            Object.values(this.placedItemObjectMap),
            (item) => item.occupiedTiles
        )
        const dragTiles: Array<Position> = _.range(tileSizeWidth).flatMap((dx) =>
            _.range(tileSizeHeight).map((dy) => ({ x: tileX - dx, y: tileY - dy }))
        )
        console.log(dragTiles)

        return !_.some(dragTiles, (tile) =>
            _.some(occupiedTiles, (occupiedTile) => _.isEqual(occupiedTile, tile))
        )
    }

    // method to get the object at a given tile
    protected getObjectAtTile(
        tileX: number,
        tileY: number
    ): PlacedItemObjectData | null {
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

    protected findPlacedItemRoot(
        x: number,
        y: number
    ): PlacedItemObjectData | null {
        for (const placedItem of Object.values(this.placedItemObjectMap)) {
            const { tileX, tileY, placedItemType } = placedItem
            const { sizeX, sizeY } = placedItemType
            if (!sizeX) {
                throw new Error("SizeX not found")
            }
            if (!sizeY) {
                throw new Error("SizeY not found")
            }
            if (x <= tileX && x > tileX - sizeX && y <= tileY && y > tileY - sizeY) {
                return placedItem
            }
        }
        return null
    }
}

export interface UpdatePlacedItemLocalParams {
  placedItem: DeepPartial<PlacedItemSchema>;
  type: PlacedItemType;
}

export interface PlacedItemObjectData {
  object: PlacedItemObject;
  tileX: number;
  tileY: number;
  placedItemType: PlacedItemTypeSchema;
  occupiedTiles: Array<Position>;
  pressBlocked?: boolean;
}

export interface CanPlaceItemAtTileParams {
  tileX: number;
  tileY: number;
  tileSizeWidth: number;
  tileSizeHeight: number;
}

export interface HandlePlacedItemUpdatePositionParams {
  placedItemId: string;
  position: Position;
}
