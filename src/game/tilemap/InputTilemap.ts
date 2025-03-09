import { IPaginatedResponse } from "@/modules/apollo"
import {
    BuyAnimalRequest,
    BuyTileRequest,
    ConstructBuildingRequest,
    CureAnimalRequest,
    FeedAnimalRequest,
    HarvestCropRequest,
    HelpUseHerbicideRequest,
    HelpUsePesticideRequest,
    HelpWaterRequest,
    PlantSeedRequest,
    ThiefCropRequest,
    UseHerbicideRequest,
    UsePesticideRequest,
    WaterRequest,
} from "@/modules/axios"
import { UseFertilizerRequest } from "@/modules/axios/farming/use-fertilizer"
import {
    AnimalId,
    BuildingId,
    CropCurrentState,
    InventorySchema,
    InventoryType,
    InventoryTypeSchema,
    PlacedItemType,
    PlacedItemTypeId,
    SupplyId,
    SupplySchema,
    TileId,
    ToolId,
    ToolSchema,
    UserSchema,
} from "@/modules/entities"
import { Pinch } from "phaser3-rex-plugins/plugins/gestures"
import {
    AnimalAge,
    animalAssetMap,
    BaseAssetKey,
    buildingAssetMap,
    getAnimalIdFromKey,
    TextureConfig,
    tileAssetMap,
    TilesetConfig,
} from "../assets"
// import { RED_TINT_COLOR, WHITE_TINT_COLOR } from "../constants"
import {
    CreateFlyItemMessage,
    EventBus,
    EventName,
    ModalName,
    OpenModalMessage,
    PlacedInprogressMessage,
    Position,
} from "../event-bus"
import {
    calculateGameplayDepth,
    calculateUiDepth,
    GameplayLayer,
    UILayer,
} from "../layers"
import { CacheKey, TilemapBaseConstructorParams } from "../types"
import { FlyItem, FlyItems, PlacementPopup, ToolLike } from "../ui"
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
// key for experience
const ENERGY_KEY = BaseAssetKey.UITopbarIconEnergy
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
            // console.log("EventName.PlaceInprogress", data)
            this.destroyTemporaryPlaceItemObject()
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

            //if placement in progress
            if (this.placingInProgress) {
                return
            }

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
                console.log(
                    "Placed item type building with id ",
                    data.placedItemType.displayId,
                    data,
                    data.object.currentPlacedItem?.id
                )

                if (data.placedItemType.displayId == PlacedItemTypeId.Home) return

                this.handlePressOnBuilding(data)
                break
            case PlacedItemType.Animal:
                this.handlePressOnAnimal(data)
                break
            }
        })

        // get the temporary layer
        const temporaryLayer = this.getObjectLayer(ObjectLayerName.Temporary)
        if (!temporaryLayer) {
            throw new Error("Temporary layer not found")
        }
        this.temporaryLayer = temporaryLayer

        this.scene.events.on(
            EventName.CreateFlyItem,
            ({
                assetKey,
                position,
                quantity,
                text,
                showIcon,
            }: CreateFlyItemMessage) => {
                const flyItem = new FlyItem({
                    baseParams: {
                        scene: this.scene,
                    },
                    options: {
                        assetKey,
                        quantity,
                        x: position.x,
                        y: position.y,
                        depth: calculateGameplayDepth({
                            layer: GameplayLayer.Effects,
                            layerDepth: 1,
                        }),
                        text,
                        showIcon,
                    },
                })
                this.scene.add.existing(flyItem)
            }
        )

        this.scene.events.on(
            EventName.CreateFlyItems,
            (items: Array<CreateFlyItemMessage>) => {
                const flyItems = new FlyItems({
                    baseParams: {
                        scene: this.scene,
                    },
                    options: {
                        items: items.map((item) => ({
                            ...item,
                            x: item.position.x,
                            y: item.position.y,
                            depth: calculateGameplayDepth({
                                layer: GameplayLayer.Effects,
                            }),
                        })),
                        delay: 500,
                    },
                })
                this.scene.add.existing(flyItems)
            }
        )
    }

    // method to handle press on tile
    private async handlePressOnTile(data: PlacedItemObjectData) {
    // check if current is visited or not
        if (data.placedItemType.type !== PlacedItemType.Tile) {
            throw new Error("Invalid placed item type")
        }

        const visitedNeighbor = this.scene.cache.obj.get(
            CacheKey.VisitedNeighbor
        ) as UserSchema
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

            if (
                !this.energyNotEnough({
                    data,
                    actionEnergy: this.activities.plantSeed.energyConsume,
                })
            ) {
                return
            }

            const { data: inventories } = this.scene.cache.obj.get(
                CacheKey.Inventories
            ) as IPaginatedResponse<InventorySchema>
            const inventory = inventories.find(
                (inventory) => inventory.id === selectedTool.id
            )

            if (!inventory) {
                throw new Error(
                    `Inventory not found for inventory id: ${selectedTool.id}`
                )
            }

            EventBus.once(EventName.PlantSeedCompleted, () => {
                EventBus.emit(EventName.RefreshUser)
                EventBus.emit(EventName.RefreshInventories)
                if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                    EventBus.emit(EventName.TutorialSeedPlanted)
                }
                data.pressBlocked = false
            })
            // emit the event to plant seed
            const eventMessage: PlantSeedRequest = {
                inventorySeedId: selectedTool.id,
                placedItemTileId: placedItemId,
            }
            EventBus.emit(EventName.RequestPlantSeed, eventMessage)
            data.pressBlocked = true

            break
        }
        case InventoryType.Tool: {
            const tools = this.scene.cache.obj.get(
                CacheKey.Tools
            ) as Array<ToolSchema>
            if (!tools) {
                throw new Error("Tools not found")
            }
            const tool = tools.find(
                (tool) => tool.id === selectedTool.inventoryType?.id
            )
            if (!tool) {
                throw new Error(`Tool not found for tool id: ${selectedTool.id}`)
            }
            // check if tool id is water can
            switch (tool.displayId) {
            case ToolId.WateringCan: {
            // return if seed growth info is not need water
                if (
                    currentPlacedItem.seedGrowthInfo?.currentState !==
              CropCurrentState.NeedWater
                ) {
                    return
                }

                if (visitedNeighbor) {
                    if (
                        !this.energyNotEnough({
                            data,
                            actionEnergy: this.activities.helpWater.energyConsume,
                        })
                    ) {
                        return
                    }

                    //emit the event to water the plant
                    EventBus.once(EventName.HelpWaterCompleted, () => {
                        EventBus.emit(EventName.RefreshUser)
                        data.pressBlocked = true
                    })

                    // emit the event to plant seed
                    const eventMessage: HelpWaterRequest = {
                        placedItemTileId: placedItemId,
                    }
                    EventBus.emit(EventName.RequestHelpWater, eventMessage)
                } else {
                    if (
                        !this.energyNotEnough({
                            data,
                            actionEnergy: this.activities.water.energyConsume,
                        })
                    ) {
                        return
                    }
                    //emit the event to water the plant
                    EventBus.once(EventName.WaterCompleted, () => {
                        EventBus.emit(EventName.RefreshUser)
                        if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                            EventBus.emit(EventName.TutorialCropWatered)
                        }
                        data.pressBlocked = true
                    })
                    // emit the event to plant seed
                    const eventMessage: WaterRequest = {
                        placedItemTileId: placedItemId,
                    }
                    EventBus.emit(EventName.RequestWater, eventMessage)
                    data.pressBlocked = true
                }
                break
            }
            case ToolId.Pesticide: {
            // return if seed growth info is not need water
                if (
                    currentPlacedItem.seedGrowthInfo?.currentState !==
              CropCurrentState.IsInfested
                ) {
                    return
                }
                if (visitedNeighbor) {
                    if (
                        !this.energyNotEnough({
                            data,
                            actionEnergy: this.activities.helpUsePesticide.energyConsume,
                        })
                    ) {
                        return
                    }
                    EventBus.once(EventName.HelpUsePesticideCompleted, () => {
                        EventBus.emit(EventName.RefreshUser)
                        data.pressBlocked = false
                    })

                    // emit the event to help use pesticide
                    const eventMessage: HelpUsePesticideRequest = {
                        placedItemTileId: placedItemId,
                    }
                    EventBus.emit(EventName.RequestHelpUsePesticide, eventMessage)
                    data.pressBlocked = true
                } else {
                    if (
                        !this.energyNotEnough({
                            data,
                            actionEnergy: this.activities.usePesticide.energyConsume,
                        })
                    ) {
                        return
                    }

                    // emit the event to water the plant
                    EventBus.once(EventName.UsePesticideCompleted, () => {
                        EventBus.emit(EventName.RefreshUser)
                        if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                            EventBus.emit(EventName.TutorialCropPesticideUsed)
                        }
                        // reset the isPressed flag
                        data.pressBlocked = false
                    })
                    // emit the event to plant seed
                    const eventMessage: UsePesticideRequest = {
                        placedItemTileId: placedItemId,
                    }
                    EventBus.emit(EventName.RequestUsePesticide, eventMessage)
                    data.pressBlocked = true
                }
                break
            }
            case ToolId.Herbicide: {
            // return if seed growth info is not need water
                if (
                    currentPlacedItem.seedGrowthInfo?.currentState !==
              CropCurrentState.IsWeedy
                ) {
                    return
                }

                if (visitedNeighbor) {
                    if (
                        !this.energyNotEnough({
                            data,
                            actionEnergy: this.activities.helpUseHerbicide.energyConsume,
                        })
                    ) {
                        return
                    }
                    // emit the event to water the plant
                    EventBus.once(EventName.HelpUseHerbicideCompleted, () => {
                        EventBus.emit(EventName.RefreshUser)
                        // reset the isPressed flag
                        data.pressBlocked = false
                    })
                    // emit the event to plant seed
                    const eventMessage: HelpUseHerbicideRequest = {
                        placedItemTileId: placedItemId,
                    }
                    EventBus.emit(EventName.RequestHelpUseHerbicide, eventMessage)
                    data.pressBlocked = true
                } else {
                    if (
                        !this.energyNotEnough({
                            data,
                            actionEnergy: this.activities.useHerbicide.energyConsume,
                        })
                    ) {
                        return
                    }
                    // emit the event to water the plant
                    EventBus.once(EventName.UseHerbicideCompleted, () => {
                        EventBus.emit(EventName.RefreshUser)
                        if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                            EventBus.emit(EventName.TutorialCropHerbicideUsed)
                        }
                        // reset the isPressed flag
                        data.pressBlocked = false
                    })
                    // emit the event to plant seed
                    const eventMessage: UseHerbicideRequest = {
                        placedItemTileId: placedItemId,
                    }
                    EventBus.emit(EventName.RequestUseHerbicide, eventMessage)
                    data.pressBlocked = true
                }
                break
            }
            case ToolId.Crate: {
            // return if seed growth info is not need water
                if (
                    currentPlacedItem.seedGrowthInfo?.currentState !==
              CropCurrentState.FullyMatured
                ) {
                    return
                }
                const placedItem = object.currentPlacedItem
                if (!placedItem) {
                    throw new Error("Placed item not found")
                }
                const crop = this.crops.find(
                    (crop) => crop.id === placedItem.seedGrowthInfo?.crop
                )
                if (!crop) {
                    throw new Error("Crop not found")
                }
                const product = this.products.find(
                    (product) => product.crop === crop.id
                )
                if (!product) {
                    throw new Error("Product not found")
                }
                if (visitedNeighbor) {
                    if (
                        !this.thiefQuantityReactMinimun({
                            data,
                        })
                    ) {
                        return
                    }
                    if (
                        !this.hasThievedCrop({
                            data,
                        })
                    ) {
                        return
                    }
                    if (
                        !this.energyNotEnough({
                            data,
                            actionEnergy: this.activities.thiefCrop.energyConsume,
                        })
                    ) {
                        return
                    }
                    // emit the event to water the plant
                    EventBus.once(EventName.ThiefCropCompleted, async () => {
                        EventBus.emit(EventName.RefreshUser)
                        EventBus.emit(EventName.RefreshInventories)
                        data.pressBlocked = false
                    })
                    // emit the event to plant seed
                    const eventMessage: ThiefCropRequest = {
                        placedItemTileId: placedItemId,
                    }
                    EventBus.emit(EventName.RequestThiefCrop, eventMessage)
                    data.pressBlocked = true
                } else {
                    // emit the event to water the plant
                    if (
                        !this.energyNotEnough({
                            data,
                            actionEnergy: this.activities.harvestCrop.energyConsume,
                        })
                    ) {
                        return
                    }
                    EventBus.once(EventName.HarvestCropCompleted, async () => {
                        EventBus.emit(EventName.RefreshUser)
                        EventBus.emit(EventName.RefreshInventories)
                        if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                            EventBus.emit(EventName.TutorialCropHarvested)
                        }
                        data.pressBlocked = false
                    })
                    // emit the event to plant seed
                    const eventMessage: HarvestCropRequest = {
                        placedItemTileId: placedItemId,
                    }
                    EventBus.emit(EventName.RequestHarvestCrop, eventMessage)
                    data.pressBlocked = true
                }
                break
            }
            }
            break
        }
        case InventoryType.Supply: {
            const supplies = this.scene.cache.obj.get(
                CacheKey.Supplies
            ) as Array<SupplySchema>

            if (!supplies) {
                throw new Error("Supplies not found")
            }

            const supply = supplies.find(
                (supply) => supply.id === selectedTool.inventoryType?.id
            )

            if (!supply) {
                throw new Error(`Supply not found for supply id: ${selectedTool.id}`)
            }

            switch (supply.displayId) {
            case SupplyId.BasicFertilizer: {
            // return if seed growth info is not need water
                if (currentPlacedItem.seedGrowthInfo == null) {
                    return
                }

                if (currentPlacedItem.seedGrowthInfo?.isFertilized) {
                    return
                }

                if (
                    !this.energyNotEnough({
                        data,
                        actionEnergy: this.activities.useFertilizer.energyConsume,
                    })
                ) {
                    return
                }

                EventBus.once(EventName.UseFertilizerCompleted, () => {
                    EventBus.emit(EventName.RefreshUser)

                    // reset the isPressed flag
                    data.pressBlocked = false
                })

                // emit the event to plant seed
                const eventMessage: UseFertilizerRequest = {
                    placedItemTileId: placedItemId,
                    inventorySupplyId: selectedTool.id,
                }
                EventBus.emit(EventName.RequestUseFertilizer, eventMessage)
                data.pressBlocked = true
                break
            }
            }
        }
        }
    }

    //handlePressOnAnimal
    private async handlePressOnAnimal(data: PlacedItemObjectData) {
        if (data.placedItemType.type !== PlacedItemType.Animal) {
            throw new Error("Invalid placed item type")
        }

        const visitedNeighbor = this.scene.cache.obj.get(
            CacheKey.VisitedNeighbor
        ) as UserSchema
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
        case InventoryType.Supply: {
            const supplies = this.scene.cache.obj.get(
                CacheKey.Supplies
            ) as Array<SupplySchema>

            if (!supplies) {
                throw new Error("Supplies not found")
            }

            const supply = supplies.find(
                (supply) => supply.id === selectedTool.inventoryType?.id
            )

            if (!supply) {
                throw new Error(`Supply not found for supply id: ${selectedTool.id}`)
            }

            switch (supply.displayId) {
            case SupplyId.AnimalFeed: {
                if (!currentPlacedItem?.animalInfo) {
                    return
                }
                // do nothing if neighbor user id is found
                if (visitedNeighbor) {
                    return
                }

                if (
                    !this.energyNotEnough({
                        data,
                        actionEnergy: this.activities.feedAnimal.energyConsume,
                    })
                ) {
                    return
                }

                EventBus.once(EventName.FeedAnimalCompleted, () => {
                    EventBus.emit(EventName.RefreshUser)
                    EventBus.emit(EventName.RefreshInventories)
                    data.pressBlocked = false
                })
                // emit the event to plant seed
                const eventMessage: FeedAnimalRequest = {
                    inventorySupplyId: selectedTool.id,
                    placedItemAnimalId: placedItemId,
                }
                EventBus.emit(EventName.RequestFeedAnimal, eventMessage)
                data.pressBlocked = true
                break
            }
            case SupplyId.AnimalPill: {
                if (!currentPlacedItem?.animalInfo) {
                    return
                }
                // do nothing if neighbor user id is found
                if (visitedNeighbor) {
                    return
                }

                if (
                    !this.energyNotEnough({
                        data,
                        actionEnergy: this.activities.cureAnimal.energyConsume,
                    })
                ) {
                    return
                }

                EventBus.once(EventName.CureAnimalCompleted, () => {
                    EventBus.emit(EventName.RefreshUser)
                    EventBus.emit(EventName.RefreshInventories)
                    data.pressBlocked = false
                })
                // emit the event to plant seed
                const eventMessage: CureAnimalRequest = {
                    inventorySupplyId: selectedTool.id,
                    placedItemAnimalId: placedItemId,
                }
                EventBus.emit(EventName.RequestCureAnimal, eventMessage)
                data.pressBlocked = true
                break
            }
            }
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
            const camera = this.scene.cameras.main
            const { x, y } = this.scene.input.activePointer.positionToCamera(camera) as Phaser.Math.Vector2
            const tile = this.getTileAtWorldXY(x, y)
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

        const isPlacementValid = this.canPlaceItemAtTile({
            tileX: position.x,
            tileY: position.y,
            tileSizeWidth,
            tileSizeHeight,
        })

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
            this.temporaryPlaceItemObject.setTint(
                isPlacementValid ? WHITE_TINT_COLOR : RED_TINT_COLOR
            )

            this.showPlacmentPopupUI(tile)

            this.placementPopup?.setYesButtonVisible(isPlacementValid)

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
        })
            .setPosition(620, 900)
            .setDepth(
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

        this.placeItemOnTile(
            this.getActualTileCoordinates(tileWorld.x, tileWorld.y)
        )
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

            EventBus.emit(EventName.RequestConstructBuilding, eventMessage)

            EventBus.once(EventName.ConstructBuildingCompleted, () => {
                EventBus.emit(EventName.RefreshUser)
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

            EventBus.emit(EventName.RequestBuyTile, eventMessage)

            EventBus.once(EventName.BuyTileCompleted, () => {
                EventBus.emit(EventName.RefreshUser)
                this.cancelPlacement()
            })
            break
        }
        case PlacedItemType.Animal: {
            const tileKey = textureConfig.key
            if (!tileKey) {
                console.error("Error: Tile key is undefined")
                return
            }

            const animalId: AnimalId = getAnimalIdFromKey(tileKey) as AnimalId
            if (!animalId) {
                throw new Error("Animal id not found")
            }

            const eventMessage: BuyAnimalRequest = {
                position: {
                    x: position.x,
                    y: position.y,
                },
                animalId,
            }

            EventBus.emit(EventName.RequestBuyAnimal, eventMessage)

            EventBus.once(EventName.BuyAnimalCompleted, () => {
                EventBus.emit(EventName.RefreshUser)
                this.cancelPlacement()
            })
            break
        }
        default:
            console.error("Unsupported placed item type:", placedItemType)
        }
    }

    private handlePressOnBuilding(data: PlacedItemObjectData) {
        if (data.placedItemType.type !== PlacedItemType.Building) {
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
        case InventoryType.Tool: {
            const tools = this.scene.cache.obj.get(
                CacheKey.Tools
            ) as Array<ToolSchema>
            if (!tools) {
                throw new Error("Tools not found")
            }
            const tool = tools.find(
                (tool) => tool.id === selectedTool.inventoryType?.id
            )
            if (!tool) {
                throw new Error(`Tool not found for tool id: ${selectedTool.id}`)
            }
            // check if tool id is water can
            switch (tool.displayId) {
            case ToolId.Hammer: {
                EventBus.emit(EventName.SyncDelayStarted)
                // update the placed item in client
                // EventBus.emit(EventName.RequestUpgradeBuilding, updatePlacedItemLocal)

                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.UpgradeBuilding,
                }
                EventBus.emit(EventName.OpenModal, eventMessage)

                EventBus.emit(
                    EventName.UpdateUpgadeBuildingModal,
                    currentPlacedItem
                )
            }
            }
        }
        }
    }

    private cancelPlacement() {
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

    private hasThievedCrop({ data }: HasThievedCropParams): boolean {
        if (
            data.object.currentPlacedItem?.seedGrowthInfo?.thieves.includes(
                this.user.id
            )
        ) {
            this.scene.events.emit(EventName.CreateFlyItems, [
                {
                    position: data.object.getCenter(),
                    text: "You are already thieved",
                },
            ])
            return false
        }
        return true
    }

    private thiefQuantityReactMinimun({
        data,
    }: ThiefQuantityReactMinimunParams): boolean {
        const crop = this.crops.find(
            (crop) => crop.id === data.object.currentPlacedItem?.seedGrowthInfo?.crop
        )
        if (!crop) {
            throw new Error("Crop not found")
        }
        if (
            !data.object.currentPlacedItem?.seedGrowthInfo?.harvestQuantityRemaining
        ) {
            throw new Error("Harvest quantity remaining not found")
        }
        if (
            crop.minHarvestQuantity >=
      data.object.currentPlacedItem.seedGrowthInfo.harvestQuantityRemaining
        ) {
            this.scene.events.emit(EventName.CreateFlyItems, [
                {
                    position: data.object.getCenter(),
                    text: "Minimum quantity reached",
                },
            ])
            return false
        }
        return true
    }

    private energyNotEnough({
        data,
        actionEnergy = 0,
    }: EnergyNotEnoughParams): boolean {
        if (this.user.energy < actionEnergy) {
            this.scene.events.emit(EventName.CreateFlyItems, [
                {
                    assetKey: ENERGY_KEY,
                    position: data.object.getCenter(),
                    text: "Not enough",
                },
            ])
            return false
        }
        return true
    }
}

export interface HasThievedCropParams {
  data: PlacedItemObjectData;
}

export interface ThiefQuantityReactMinimunParams {
  data: PlacedItemObjectData;
}

export interface EnergyNotEnoughParams {
  data: PlacedItemObjectData;
  actionEnergy: number;
}

export interface PlayProductFlyAnimationParams {
  position: Position;
  assetKey: string;
  quantity: number;
}
