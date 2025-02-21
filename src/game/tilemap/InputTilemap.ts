import { BuyTileRequest, ConstructBuildingRequest, HarvestCropRequest, PlantSeedRequest, UseHerbicideRequest, UsePesticideRequest, WaterRequest } from "@/modules/axios"
import {
    AnimalId,
    BuildingId,
    CropCurrentState,
    InventoryType,
    PlacedItemType,
    TileId,
    ToolId
} from "@/modules/entities"
import { Pinch } from "phaser3-rex-plugins/plugins/gestures"
import {
    AnimalAge,
    animalAssetMap,
    buildingAssetMap,
    TextureConfig,
    tileAssetMap,
    TilesetConfig,
} from "../assets"
import { EventBus, EventName, PlacedInprogressMessage } from "../event-bus"
import { calculateUiDepth, UILayer } from "../layers"
import { CacheKey, TilemapBaseConstructorParams } from "../types"
import { PlacementPopup, ToolLike } from "../ui"
import { ItemTilemap, PlacedItemObjectData } from "./ItemTilemap"
import { ObjectLayerName } from "./types"

export const POPUP_SCALE = 0.7
export const TEMPORARY = "temporary"

// temporary place item data
export interface TemporaryPlaceItemData {
  textureConfig: TextureConfig;
  tilesetConfig: TilesetConfig;
  type?: PlacedItemType;
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

    private placementPopup: PlacementPopup | undefined

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

            if (this.placementPopup) {
                const newScale = POPUP_SCALE / camera.zoom
                this.placementPopup.setScale(newScale)
            }
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

                if (this.placementPopup) {
                    const newScale = POPUP_SCALE / camera.zoom
                    this.placementPopup.setScale(newScale)
                }
            }
        )

        // listen for place in progress event
        EventBus.on(EventName.PlaceInprogress, (data: PlacedInprogressMessage) => {
            this.destroyTemporaryPlaceItemObject()
            this.handlePlaceInProgress(data)
        })

        // click on empty tile to plant seed
        this.scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            const tile = this.getTileAtWorldXY(pointer.worldX, pointer.worldY)
            // do nothing if tile is not found
            if (!tile) {
                return
            }

            console.log("Tile clicked", tile, this.placedItemObjectMap)

            const data = this.findPlacedItemRoot(tile.x, tile.y)
            if (!data) {
                console.error("No placed item found for position")
                return
            }

            switch (data.placedItemType.type) {
            case PlacedItemType.Tile:
                this.handlePressOnTile(data)
                break
            case PlacedItemType.Building:
                console.log("Placed item type building with id ", data.placedItemType.displayId, data)
                break
            }
        })

        // get the temporary layer
        const temporaryLayer = this.getObjectLayer(ObjectLayerName.Temporary)
        if (!temporaryLayer) {
            throw new Error("Temporary layer not found")
        }
        this.temporaryLayer = temporaryLayer
        //set depth of the temporary layer
    }


    // method to handle press on tile
    private handlePressOnTile(data: PlacedItemObjectData ) {
        if (data.placedItemType.type !== PlacedItemType.Tile) {
            throw new Error("Invalid placed item type")
        }
        const selectedTool = this.scene.cache.obj.get(
            CacheKey.SelectedTool
        ) as ToolLike

        const object = data.object
        const currentPlacedItem = object.currentPlacedItem
        
        const placedItemId = currentPlacedItem?.id
        // do nothing if placed item id is not found
        if (!placedItemId) {
            return
        }

        switch (selectedTool.inventoryType) {
        case InventoryType.Seed: {
            // return if seed growth info is found
            if (currentPlacedItem?.seedGrowthInfo) {
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
        }
        }
        // check if tool id is water can
        switch (selectedTool.id) {
        case ToolId.WateringCan: {
            // return if seed growth info is not need water
            if (currentPlacedItem.seedGrowthInfo?.currentState !== CropCurrentState.NeedWater) {
                return
            }
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

            break
        }
        case ToolId.Pesticide: {
            // return if seed growth info is not need water
            if (currentPlacedItem.seedGrowthInfo?.currentState !== CropCurrentState.IsInfested) {
                return
            }
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

            break
        }
        case ToolId.Herbicide: {
            // return if seed growth info is not need water
            if (currentPlacedItem.seedGrowthInfo?.currentState !== CropCurrentState.IsWeedy) {
                return
            }
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

            break
        }
        case ToolId.Scythe: {
            // return if seed growth info is not need water
            if (currentPlacedItem.seedGrowthInfo?.currentState !== CropCurrentState.FullyMatured) {
                return
            }
            // emit the event to water the plant
            EventBus.once(EventName.HarvestCropCompleted, () => {
                EventBus.emit(EventName.RefreshUser)
                if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                    EventBus.emit(EventName.TutorialCropHarvested)
                }
            })
            // emit the event to plant seed
            const eventMessage: HarvestCropRequest = {
                placedItemTileId: placedItemId,
            }
            EventBus.emit(EventName.RequestHarvestCrop, eventMessage)

            break
        }
        }
    }

    // method called to handle place in progress event
    private handlePlaceInProgress({ id, type }: PlacedInprogressMessage) {
        this.placingInProgress = true
        this.removePlacmentPopupUI()

        // switch case to set the place item data
        switch (type) {
        case PlacedItemType.Animal:
            this.temporaryPlaceItemData = {
                ...animalAssetMap[id as AnimalId].ages[AnimalAge.Baby],
                type: PlacedItemType.Animal,
            }
            break
        case PlacedItemType.Building:
            this.temporaryPlaceItemData = {
                ...buildingAssetMap[id as BuildingId],
                type: PlacedItemType.Building,
            }
            break
        case PlacedItemType.Tile:
            this.temporaryPlaceItemData = {
                ...tileAssetMap[id as TileId],
                type: PlacedItemType.Tile,
            }
            break
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

        const { tileSizeWidth = 1, tileSizeHeight = 1 } = tilesetConfig

        const position = this.getActualTileCoordinates(tile.x, tile.y)
        
        let isOccupied = false

        for (let dx = 0; dx < tileSizeWidth; dx++) {
            for (let dy = 0; dy < tileSizeHeight; dy++) {
                const checkTileKey = `${position.x - dx},${position.y - dy}`
                console.log("checkTileKey", checkTileKey, this.occupiedTiles, tile, position)
                if (this.occupiedTiles.has(checkTileKey)) {
                    isOccupied = true
                    break
                }
            }
            if (isOccupied) break
        }



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

            // set tint based on can place
            this.temporaryPlaceItemObject.setTint(!isOccupied ? 0xffffff : 0xff0000)
            
            this.showPlacmentPopupUI(tile)

            this.placementPopup?.setYesButtonVisible(!isOccupied)

            return
        }

    
        // push the temporary object to the temporary layer
        this.temporaryLayer.objects.push({
            gid: tilesetConfig.gid,
            id: 0,
            name: TEMPORARY,
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
        object.setDepth(
            calculateUiDepth({
                layer: UILayer.Base,
                layerDepth: 5,
            })
        )
        this.temporaryPlaceItemObject = object
    }

    private showPlacmentPopupUI(tile: Phaser.Tilemaps.Tile) {
        const position = this.tileToWorldXY(tile.x, tile.y)

        if (!position) {
            throw new Error("Position not found")
        }

        if (this.placementPopup) {
            this.placementPopup.setPosition(position.x + 20, position.y - 2)
            return
        } 

        if (!position) {
            throw new Error("Position not found")
        }
        
        this.placementPopup = new PlacementPopup({
            scene: this.scene,
            onCancel: () => {
                this.cancelPlacement()
            },
            onConfirm: () => this.handlePlaced(),
        }).setPosition(
            620,
            900
        ).setDepth(
            calculateUiDepth({
                layer: UILayer.Overlay,
                layerDepth: 6,
            })
        )
        this.scene.add.existing(this.placementPopup)

    }

    private handlePlaced() {
        if (!this.temporaryPlaceItemObject) {
            console.error("No temporary place item object found")
            return
        }

        const { worldX, worldY } = this.scene.input.activePointer

        const tileWorld = this.getTileAtWorldXY(worldX, worldY)
        if (!tileWorld) {
            console.error("No tile found for temporary place item object")
            return
        }
        console.log("getActualTileCoordinates", this.getActualTileCoordinates(tileWorld.x, tileWorld.y))

        this.placeItemOnTile(this.getActualTileCoordinates(tileWorld.x, tileWorld.y))
    }
    

    private removePlacmentPopupUI() {
        this.placementPopup?.destroy()
        this.placementPopup = undefined
        this.temporaryPlaceItemData = undefined
    }

    private placeItemOnTile(position: Phaser.Math.Vector2) {
        if (!this.temporaryPlaceItemData) {
            console.error("No item data found for placement")
            return
        }
    
        const { textureConfig, type: placedItemType } = this.temporaryPlaceItemData

        switch (placedItemType) {
        case PlacedItemType.Building: {
            const buildingKey = textureConfig.key
            if (!buildingKey) {
                console.error("Error: Building key is undefined")
                return
            }
        
            const eventMessage: ConstructBuildingRequest = {
                buildingId: buildingKey as BuildingId,
                position: {
                    x: position.x,
                    y: position.y,
                },
            }

            console.log("Requesting to buy building:", eventMessage)
        
            EventBus.emit(EventName.RequestConstructBuilding, eventMessage)

            EventBus.once(EventName.ConstructBuildingCompleted, () => {
                this.cancelPlacement()
            })
            break
        }
        case PlacedItemType.Tile: {
            const tileKey = textureConfig.key
            if (!tileKey) {
                console.error("Error: Tile key is undefined")
                return
            }
        
            const eventMessage: BuyTileRequest = {
                tileId: tileKey as TileId,
                position: {
                    x: position.x,
                    y: position.y,
                },
            }

            console.log("Requesting to buy tile:", eventMessage)
        
            EventBus.emit(EventName.RequestBuyTile, eventMessage)

            EventBus.once(EventName.BuyTileCompleted, () => {
                this.cancelPlacement()
            })
            break
        }
        default:
            console.error("Unsupported placed item type:", placedItemType)
        }
    }

    private cancelPlacement() {
        console.log("Placement canceled")
        this.destroyTemporaryPlaceItemObject()
        this.placingInProgress = false
        this.removePlacmentPopupUI()
    }

    // destroy method to clean up the resources
    public destroyTemporaryPlaceItemObject() {
        this.temporaryPlaceItemObject?.destroy()
        this.temporaryPlaceItemObject = undefined
        // remove the temporary object from the temporary layer
        this.temporaryLayer.objects = this.temporaryLayer.objects.filter(
            (object) => object.name !== TEMPORARY
        )
        //temporaryPlaceItemData
        this.temporaryPlaceItemData = undefined
    }
}
