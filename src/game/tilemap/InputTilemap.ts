import { Pinch } from "phaser3-rex-plugins/plugins/gestures"
import { CacheKey, TilemapBaseConstructorParams } from "../types"
import { ItemTilemap, PlacedItemObjectData } from "./ItemTilemap"
import { EventBus, EventName, PlacedInprogressMessage } from "../event-bus"
import {
    AnimalAge,
    animalAssetMap,
    buildingAssetMap,
    TextureConfig,
    TilesetConfig,
} from "../assets"
import {
    AnimalId,
    BuildingId,
    CropCurrentState,
    InventoryType,
    InventoryTypeSchema,
    PlacedItemType,
    ToolId,
    ToolSchema,
    UserSchema,
} from "@/modules/entities"
import { ObjectLayerName } from "./types"
import { ToolLike } from "../ui"
import { HarvestCropRequest, HelpUseHerbicideRequest, HelpUsePesticideRequest, HelpWaterRequest, PlantSeedRequest, ThiefCropRequest, UseHerbicideRequest, UsePesticideRequest, WaterRequest } from "@/modules/axios"

// temporary place item data
export interface TemporaryPlaceItemData {
  textureConfig: TextureConfig;
  tilesetConfig: TilesetConfig;
}

// tilemap for handling input events
export class InputTilemap extends ItemTilemap {
    // pinch instance
    private pinch: Pinch

    // is in placing in progress
    private placingInProgress: boolean = false

    // place item data
    private temporaryLayer: Phaser.Tilemaps.ObjectLayer
    private temporaryPlaceItemData: TemporaryPlaceItemData | undefined
    private temporaryPlaceItemObject: Phaser.GameObjects.Sprite | undefined
    private inventoryTypes: Array<InventoryTypeSchema> = []

    constructor(baseParams: TilemapBaseConstructorParams) {
        super(baseParams)

        // create pinch gesture
        this.pinch = new Pinch(this.scene, {
            enable: true,
        })

        const camera = this.scene.cameras.main

        // add event listener for pinch gesture
        this.pinch.on("drag1", (dragScale: Pinch) => {
            const drag1Vector = dragScale.drag1Vector
            camera.scrollX -= drag1Vector.x / camera.zoom
            camera.scrollY -= drag1Vector.y / camera.zoom
        })
        // add event listener for pinch gesture
        this.pinch.on("pinch", (dragScale: Pinch) => {
            const scaleFactor = dragScale.scaleFactor
            camera.zoom *= scaleFactor
        })

        // add event listener for mouse wheel event
        this.scene.input.on(
            "wheel",
            (
                pointer: Phaser.Input.Pointer,
                gameObjects: Array<Phaser.GameObjects.GameObject>,
                dx: number,
                dy: number
            ) => {
                //zoom in
                if (dy < 0) {
                    camera.zoom += 0.1
                }
                //zoom out
                else {
                    camera.zoom -= 0.1
                }
            }
        )

        // listen for place in progress event
        EventBus.on(EventName.PlaceInprogress, (data: PlacedInprogressMessage) => {
            this.handlePlaceInProgress(data)
        })

        this.inventoryTypes = this.scene.cache.obj.get(CacheKey.InventoryTypes)

        // click on empty tile to plant seed
        this.scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            const tile = this.getTileAtWorldXY(pointer.worldX, pointer.worldY)
            // do nothing if tile is not found
            if (!tile) {
                return
            }
            const data = this.getObjectAtTile(tile.x, tile.y)
            if (!data) {
                return
            }
            switch (data.placedItemType.type) {
            case PlacedItemType.Tile:
                this.handlePressOnTile(data)
                break
            }
        })

        // get the temporary layer
        const temporaryLayer = this.getObjectLayer(ObjectLayerName.Temporary)
        if (!temporaryLayer) {
            throw new Error("Temporary layer not found")
        }
        this.temporaryLayer = temporaryLayer
    }

    // method to handle press on tile
    private handlePressOnTile(data: PlacedItemObjectData ) {
        // check if current is visited or not
        const visitedNeighbor = this.scene.cache.obj.get(CacheKey.VisitedNeighbor) as UserSchema
        if (data.placedItemType.type !== PlacedItemType.Tile) {
            throw new Error("Invalid placed item type")
        }
        const selectedTool = this.scene.cache.obj.get(
            CacheKey.SelectedTool
        ) as ToolLike

        // do nothing if selected tool is default
        if (selectedTool.default) {
            return
        }

        const inventoryType = this.inventoryTypes.find(
            (inventoryType) => inventoryType.id === selectedTool.inventoryType?.id
        )
        if (!inventoryType) {
            throw new Error(
                `Inventory type not found for inventory id: ${selectedTool.inventoryType}`
            )
        }
        const object = data.object
        const currentPlacedItem = object.currentPlacedItem
        const placedItemId = currentPlacedItem?.id
        // do nothing if placed item id is not found
        if (!placedItemId) {
            return
        }

        switch (inventoryType.type) {
        case InventoryType.Seed: {
            // return if seed growth info is found
            if (currentPlacedItem?.seedGrowthInfo) {
                return
            }
            // do nothing if neighbor user id is found
            if (visitedNeighbor) {
                return
            }
            EventBus.once(EventName.PlantSeedCompleted, () => {
                EventBus.emit(EventName.RefreshInventories)
                if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                    EventBus.emit(EventName.TutorialSeedPlanted)
                }
            })
            // emit the event to plant seed
            const eventMessage: PlantSeedRequest = {
                inventorySeedId: selectedTool.id,
                placedItemTileId: placedItemId,
            }
            EventBus.emit(EventName.RequestPlantSeed, eventMessage)
            break
        }
        case InventoryType.Tool: {
            const tools = this.scene.cache.obj.get(CacheKey.Tools) as Array<ToolSchema>
            if (!tools) {
                throw new Error("Tools not found")
            }   
            const tool = tools.find((tool) => tool.id === selectedTool.inventoryType?.id)
            if (!tool) {
                throw new Error(`Tool not found for tool id: ${selectedTool.id}`)
            }
            // check if tool id is water can
            switch (tool.displayId) {
            case ToolId.WateringCan: {
                // return if seed growth info is not need water
                if (currentPlacedItem.seedGrowthInfo?.currentState !== CropCurrentState.NeedWater) {
                    return
                }
                if (visitedNeighbor) {
                    // emit the event to water the plant
                    EventBus.once(EventName.HelpWaterCompleted, () => {
                        EventBus.emit(EventName.RefreshUser)
                        if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                            EventBus.emit(EventName.TutorialCropWatered)
                        }
                    })
                    // emit the event to plant seed
                    const eventMessage: HelpWaterRequest = {
                        placedItemTileId: placedItemId,
                    }
                    EventBus.emit(EventName.RequestHelpWater, eventMessage)
                } else {
                    // emit the event to water the plant
                    EventBus.once(EventName.WaterCompleted, () => {
                        EventBus.emit(EventName.RefreshUser)
                        if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                            EventBus.emit(EventName.TutorialCropWatered)
                        }
                    })
                    // emit the event to plant seed
                    const eventMessage: WaterRequest = {
                        placedItemTileId: placedItemId,
                    }
                    EventBus.emit(EventName.RequestWater, eventMessage)
                }
                break
            }
            case ToolId.Pesticide: {
                // return if seed growth info is not need water
                if (currentPlacedItem.seedGrowthInfo?.currentState !== CropCurrentState.IsInfested) {
                    return
                }
                if (visitedNeighbor) {
                    // emit the event to use pesticide
                    EventBus.once(EventName.HelpUsePesticideCompleted, () => {
                        EventBus.emit(EventName.RefreshUser)
                    })
                    // emit the event to help use pesticide
                    const eventMessage: HelpUsePesticideRequest = {
                        placedItemTileId: placedItemId,
                    }
                    EventBus.emit(EventName.RequestHelpUsePesticide, eventMessage)
                } else {
                // emit the event to water the plant
                    EventBus.once(EventName.UsePesticideCompleted, () => {
                        EventBus.emit(EventName.RefreshUser)
                        if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                            EventBus.emit(EventName.TutorialCropPesticideUsed)
                        }
                    })
                    // emit the event to plant seed
                    const eventMessage: UsePesticideRequest = {
                        placedItemTileId: placedItemId,
                    }
                    EventBus.emit(EventName.RequestUsePesticide, eventMessage)
                }
                break
            }
            case ToolId.Herbicide: {
                // return if seed growth info is not need water
                if (currentPlacedItem.seedGrowthInfo?.currentState !== CropCurrentState.IsWeedy) {
                    return
                }
                if (visitedNeighbor) {
                    // emit the event to water the plant
                    EventBus.once(EventName.HelpUseHerbicideCompleted, () => {
                        EventBus.emit(EventName.RefreshUser)
                    })
                    // emit the event to plant seed
                    const eventMessage: HelpUseHerbicideRequest = {
                        placedItemTileId: placedItemId,
                    }
                    EventBus.emit(EventName.RequestHelpUsePesticide, eventMessage)
                } else {
                // emit the event to water the plant
                    EventBus.once(EventName.UseHerbicideCompleted, () => {
                        EventBus.emit(EventName.RefreshUser)
                        if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                            EventBus.emit(EventName.TutorialCropHerbicideUsed)
                        }
                    })
                    // emit the event to plant seed
                    const eventMessage: UseHerbicideRequest = {
                        placedItemTileId: placedItemId,
                    }
                    EventBus.emit(EventName.RequestUseHerbicide, eventMessage)
                }
                break
            }
            case ToolId.Scythe: {
                // return if seed growth info is not need water
                if (currentPlacedItem.seedGrowthInfo?.currentState !== CropCurrentState.FullyMatured) {
                    return
                }
                if (visitedNeighbor) {
                    // emit the event to water the plant
                    EventBus.once(EventName.ThiefCropCompleted, () => {
                        EventBus.emit(EventName.RefreshUser)
                        EventBus.emit(EventName.RefreshInventories)
                    })
                    // emit the event to plant seed
                    const eventMessage: ThiefCropRequest = {
                        placedItemTileId: placedItemId,
                    }
                    EventBus.emit(EventName.RequestThiefCrop, eventMessage)
                } else {
                // emit the event to water the plant
                    EventBus.once(EventName.HarvestCropCompleted, () => {
                        EventBus.emit(EventName.RefreshUser)
                        EventBus.emit(EventName.RefreshInventories)
                        if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                            EventBus.emit(EventName.TutorialCropHarvested)
                        }
                    })
                    // emit the event to plant seed
                    const eventMessage: HarvestCropRequest = {
                        placedItemTileId: placedItemId,
                    }
                    EventBus.emit(EventName.RequestHarvestCrop, eventMessage)
                }
                break
            }
            }
            break
        }
        }
    }

    // method called to handle place in progress event
    private handlePlaceInProgress({ id, type }: PlacedInprogressMessage) {
        this.placingInProgress = true

        // switch case to set the place item data
        switch (type) {
        case PlacedItemType.Animal:
            this.temporaryPlaceItemData =
          animalAssetMap[id as AnimalId].ages[AnimalAge.Baby]
            break
        case PlacedItemType.Building:
            this.temporaryPlaceItemData = buildingAssetMap[id as BuildingId]
            break
        case PlacedItemType.Tile:
            throw new Error("Not implemented")
        }
    }

    // update method to handle input events
    public update() {
    //check current mouse position is in which tile
        if (this.placingInProgress) {
            const { worldX, worldY } = this.scene.input.activePointer
            const tile = this.getTileAtWorldXY(worldX, worldY)
            // do nothing if tile is not found
            if (!tile) {
                return
            }

            // place the item temporarily on the tile
            this.temporaryPlaceItemOnTile(tile)
        }
    }

    // temporary place item on the tile, for preview the item before placing
    private temporaryPlaceItemOnTile(tile: Phaser.Tilemaps.Tile) {
    // throw error if temporary place item data is not found
        if (!this.temporaryPlaceItemData) {
            throw new Error("Temporary place item data not found")
        }
        const { tilesetConfig } = this.temporaryPlaceItemData
        const tileset = this.getTileset(tilesetConfig.tilesetName)
        if (!tileset) {
            throw new Error("Tileset not found")
        }
        const sourceImage = tileset.image?.getSourceImage() as HTMLImageElement
        if (!sourceImage) {
            throw new Error("Source image not found")
        }
        const { width, height } = sourceImage
        // if temporary place item object is already created
        if (this.temporaryPlaceItemObject) {
            // update the temporary place item object position
            const position = this.tileToWorldXY(tile.x, tile.y)
            if (!position) {
                throw new Error("Position not found")
            }
            const { x = 0, y = 0 } = { ...tilesetConfig.extraOffsets }
            // we need to set the position of the temporary place item object and set the origin
            this.temporaryPlaceItemObject
                .setPosition(position.x + x, position.y + this.tileHeight + y)
                .setOrigin(0.5, 1)
            return
        }
        // push the temporary object to the temporary layer
        this.temporaryLayer.objects.push({
            gid: tilesetConfig.gid,
            id: 0,
            name: "temporary",
            width: width * this.scale,
            height: height * this.scale,
            type: "",
            visible: true,
            ...this.computePositionForTiledObject(tile),
        })

        // create the temporary place item
        const object = this.createFromObjects(ObjectLayerName.Temporary, {
            id: 0,
            classType: Phaser.GameObjects.Sprite,
        }).at(0) as Phaser.GameObjects.Sprite | undefined
        if (!object) {
            throw new Error("Object not found")
        }
        // set the origin of the object
        object.setOrigin(1, 0.5)
        object.setDepth(tile.x + tile.y + 1)
        this.temporaryPlaceItemObject = object
    }
}
