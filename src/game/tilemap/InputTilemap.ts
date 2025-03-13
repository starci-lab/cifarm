import { IPaginatedResponse } from "@/modules/apollo"
import {
    BuyTileRequest,
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
    UseFertilizerRequest,
    ConstructBuildingRequest,
    BuyAnimalRequest,
} from "@/modules/axios"
import {
    AnimalId,
    CropCurrentState,
    InventorySchema,
    InventoryType,
    PlacedItemSchema,
    PlacedItemType,
    PlacedItemTypeId,
    PlacedItemTypeSchema,
    SupplyId,
    SupplySchema,
    ToolId,
    ToolSchema,
    UserSchema,
} from "@/modules/entities"
import { Pinch, Tap } from "phaser3-rex-plugins/plugins/gestures"
import {
    AnimalAge,
    animalAssetMap,
    BaseAssetKey,
    buildingAssetMap,
    TextureConfig,
    tileAssetMap,
    TilesetConfig,
} from "../assets"
//import { GREEN_TINT_COLOR } from "../constants"
import {
    CreateFlyItemMessage,
    EventBus,
    EventName,
    ModalName,
    OpenModalMessage,
    BuyingModeOnMessage,
    Position,
    UpdateConfirmModalMessage,
} from "../event-bus"
import { calculateGameplayDepth, GameplayLayer } from "../layers"
import { CacheKey, TilemapBaseConstructorParams } from "../types"
import { FlyItem, FlyItems, ToolLike } from "../ui"
import { ItemTilemap, PlacedItemObjectData } from "./ItemTilemap"
import { WHITE_TINT_COLOR, RED_TINT_COLOR } from "../constants"
import { SpineGameObject } from "@esotericsoftware/spine-phaser"
import { PlacementConfirmation } from "./PlacementConfirmation"

export const POPUP_SCALE = 0.7
export const DRAG = "drag"

export enum InputMode {
  Normal,
  Buy,
  Move,
  Sell,
}

interface BuyingDragSpriteData {
  textureConfig: TextureConfig;
  tilesetConfig: TilesetConfig;
  type: PlacedItemType;
  placedItemType: PlacedItemTypeSchema;
}
// key for experience
const ENERGY_KEY = BaseAssetKey.UITopbarIconEnergy
// tilemap for handling input events
export class InputTilemap extends ItemTilemap {
    // pinch instance
    private pinch: Pinch

    // input mode
    private inputMode = InputMode.Normal
    private storedPlacedItem: PlacedItemSchema | undefined
    private sellingPlacedItem: PlacedItemSchema | undefined

    // place item data
    private buyingDragSpriteData: BuyingDragSpriteData | undefined
    private dragVisual: Phaser.GameObjects.Sprite | SpineGameObject | undefined
    private placementConfirmation: PlacementConfirmation | undefined

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
        EventBus.on(EventName.BuyingModeOn, (data: BuyingModeOnMessage) => {
            this.hideEverything()
            this.inputMode = InputMode.Buy
            this.handleBuyingMode(data)
        })
        EventBus.on(EventName.SellPlacementModeOff, () => {
            this.cancelPlacement()
        })

        // click on empty tile to plant seed
        const tap = new Tap(this.scene)
        tap.on("tap", (pointer: Phaser.Input.Pointer) => {
            const tile = this.getTileAtWorldXY(pointer.worldX, pointer.worldY)
            // do nothing if tile is not found
            if (!tile) {
                return
            }

            //if buying mode is on
            if (this.inputMode === InputMode.Buy) {
                return
            }

            const data = this.findPlacedItemRoot(tile.x, tile.y)

            if (!data) {
                console.error("No placed item found for position")
                return
            }

            if (this.inputMode === InputMode.Move) {
                const placedItemId = data.object.currentPlacedItem?.id
                this.movingPlacedItemId = placedItemId
                if (placedItemId) {
                    this.storedPlacedItem = data.object.currentPlacedItem

                    if (data.object.currentPlacedItem && this.movingPlacedItemId) {
                        this.clearPlacedItem(data.object.currentPlacedItem)
                        this.placedItemObjectMap[this.movingPlacedItemId]?.object.destroy()
                        this.placedItemObjectMap[this.movingPlacedItemId] = {
                            ...this.placedItemObjectMap[this.movingPlacedItemId],
                            occupiedTiles: [],
                        }
                    }
                }

                // console.log("Placing mode is on", data.placedItemType)

                const message: BuyingModeOnMessage = {
                    id: data.placedItemType.displayId,
                    type: data.placedItemType.type,
                }
                EventBus.emit(EventName.BuyingModeOn, message)
                return
            }

            if (this.inputMode === InputMode.Sell) {
                const placedItemId = data.object.currentPlacedItem?.id
                if (placedItemId && this.sellingPlacedItem) {
                    this.handleSellPlacedItem({
                        placedItem: this.sellingPlacedItem,
                    })
                }
            }

            switch (data.placedItemType.type) {
            case PlacedItemType.Tile:
                this.handlePressOnTile(data)
                break
            case PlacedItemType.Building:
                if (data.placedItemType.displayId == PlacedItemTypeId.Home) return
                this.handlePressOnBuilding(data)
                break
            case PlacedItemType.Animal:
                this.handlePressOnAnimal(data)
                break
            }
        })

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
                                layerDepth: 1,
                            }),
                        })),
                        delay: 500,
                    },
                })
                this.scene.add.existing(flyItems)
            }
        )

        EventBus.on(EventName.UserRefreshed, (user: UserSchema) => {
            this.user = user
        })
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
                    EventBus.emit(EventName.RefreshInventories)
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
            const supply = this.supplies.find(
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
            }
            break
        }
        case InventoryType.Tool: {
            const tool = this.tools.find(
                (tool) => tool.id === selectedTool.inventoryType?.id
            )
            if (!tool) {
                throw new Error(`Tool not found for tool id: ${selectedTool.id}`)
            }
            switch (tool.displayId) {
            case ToolId.AnimalMedicine: {
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
            break
        }
        }
    }

    // method called to handle the buying mode
    private handleBuyingMode({ id, type }: BuyingModeOnMessage) {
        this.inputMode = InputMode.Buy

        switch (type) {
        case PlacedItemType.Building: {
            const building = this.buildings.find((building) => building.id === id)
            if (!building) {
                throw new Error(`Building not found for id: ${id}`)
            }
            const placedItemType = this.placedItemTypes.find(
                (placedItemType) => placedItemType.building === building.id
            )
            if (!placedItemType) {
                throw new Error("Placed item type not found")
            }
            const { textureConfig, tilesetConfig } =
          buildingAssetMap[building.displayId]
            this.buyingDragSpriteData = {
                textureConfig,
                tilesetConfig,
                type,
                placedItemType,
            }
            break
        }
        case PlacedItemType.Tile: {
            const tile = this._tiles.find((tile) => tile.id === id)
            if (!tile) {
                throw new Error(`Tile not found for id: ${id}`)
            }
            const placedItemType = this.placedItemTypes.find(
                (placedItemType) => placedItemType.tile === tile.id
            )
            if (!placedItemType) {
                throw new Error("Placed item type not found")
            }
            const { textureConfig, tilesetConfig } = tileAssetMap[tile.displayId]
            this.buyingDragSpriteData = {
                textureConfig,
                tilesetConfig,
                type,
                placedItemType,
            }
            break
        }
        case PlacedItemType.Animal: {
            const animal = this.animals.find((animal) => animal.id === id)
            if (!animal) {
                throw new Error(`Animal not found for id: ${id}`)
            }
            const placedItemType = this.placedItemTypes.find(
                (placedItemType) => placedItemType.animal === animal.id
            )
            if (!placedItemType) {
                throw new Error("Placed item type not found")
            }
            const { textureConfig, tilesetConfig } =
          animalAssetMap[animal.displayId].ages[AnimalAge.Baby]
            this.buyingDragSpriteData = {
                textureConfig,
                tilesetConfig,
                type,
                placedItemType,
            }
            break
        }
        }
    }

    // update method to handle input events
    public update() {
    //check current mouse position is in which tile
        if (this.inputMode === InputMode.Buy) {
            const camera = this.scene.cameras.main
            const { x, y } = this.scene.input.activePointer.positionToCamera(
                camera
            ) as Phaser.Math.Vector2
            const tile = this.getTileAtWorldXY(x, y)
            // do nothing if tile is not found
            if (!tile) {
                return
            }
            // place the item temporarily on the tile
            this.dragBuyingSpriteOnTile(tile)
        }
        if (this.inputMode === InputMode.Sell) {
            const camera = this.scene.cameras.main
            const { x, y } = this.scene.input.activePointer.positionToCamera(
                camera
            ) as Phaser.Math.Vector2
            const tile = this.getTileAtWorldXY(x, y)
            // do nothing if tile is not found
            if (!tile) {
                return
            }
            //check if it is sellable - set green tint - set red tint
            const data = this.findPlacedItemRoot(tile.x, tile.y)
            if (this.sellingPlacedItem?.id === data?.object.currentPlacedItem?.id) {
                return
            }
            //clear tint
            if (this.sellingPlacedItem) {
                //this.placedItemObjectMap[this.sellingPlacedItem.id].object.clearTint()
                //this.placedItemObjectMap[this.sellingPlacedItem.id].object.clearAllTintSprite()
            }
            this.sellingPlacedItem = data?.object.currentPlacedItem
        }

        if (this.sellingPlacedItem) {
            this.checkCanSellPlacedItem({
                placedItem: this.sellingPlacedItem,
            })
        }
    }

    // drag sprite on tile
    private dragBuyingSpriteOnTile(tile: Phaser.Tilemaps.Tile) {
    // throw error if drag sprite data is not found
        if (!this.buyingDragSpriteData) {
            throw new Error("No drag sprite data found")
        }
        const { placedItemType, textureConfig, tilesetConfig } =
      this.buyingDragSpriteData

        const position = this.getActualTileCoordinates(tile.x, tile.y)

        const isPlacementValid = this.canPlaceItemAtTile({
            tileX: position.x,
            tileY: position.y,
            tileSizeWidth: placedItemType.sizeX,
            tileSizeHeight: placedItemType.sizeY,
        })

        // if temporary place item object is already created
        if (!this.dragVisual) {
            this.dragVisual = this.scene.add
                .sprite(0, 0, textureConfig.key)
                .setOrigin(0.5, 1)
                .setDepth(
                    calculateGameplayDepth({
                        layer: GameplayLayer.Effects,
                        layerDepth: 2,
                    })
                )
                .setScale(this.scale, this.scale)
        }

        // update the temporary place item object position
        const tilePosition = this.tileToWorldXY(tile.x, tile.y)
        if (!tilePosition) {
            throw new Error("Position not found")
        }
        this.showPlacmentConfirmation({
            tile,
            onCancel: () => {
                this.cancelPlacement()
            },
            onConfirm: (tileX: number, tileY: number) => {       
                switch (placedItemType.type) {
                case PlacedItemType.Building: {
                    const updateConfirmSellModalMessage: UpdateConfirmModalMessage = {
                        message: "Are you sure you want to construct this building?",
                        callback: () => {
                            EventBus.on(EventName.ConstructBuildingCompleted, () => {
                                EventBus.emit(EventName.RefreshUser)
                            })
                            const building = this.buildings.find(
                                (building) => building.id === placedItemType.building
                            )
                            if (!building) {
                                throw new Error(`Building not found for id: ${placedItemType.building}`)
                            }
                            const eventMessage: ConstructBuildingRequest = {
                                buildingId: building.displayId,
                                position: {
                                    x: tileX,
                                    y: tileY,
                                },
                            }
                            EventBus.emit(EventName.RequestConstructBuilding, eventMessage)
                        }
                    }
                    EventBus.emit(EventName.UpdateConfirmModal, updateConfirmSellModalMessage)
                    EventBus.emit(EventName.OpenModal, {
                        modalName: ModalName.Confirm,
                    })
                    break
                }
                case PlacedItemType.Tile: {
                    EventBus.on(EventName.BuyTileCompleted, () => {
                        EventBus.emit(EventName.RefreshUser)
                    })
                    const tile = this._tiles.find(
                        (tile) => tile.id === placedItemType.tile
                    )
                    if (!tile) {
                        throw new Error(`Tile not found for id: ${placedItemType.tile}`)
                    }
                    const eventMessage: BuyTileRequest = {
                        tileId: tile.displayId,
                        position: {
                            x: tileX,
                            y: tileY,
                        },
                    }
                    EventBus.emit(EventName.RequestBuyTile, eventMessage)
                    break
                }
                case PlacedItemType.Animal: {
                    EventBus.on(EventName.BuyAnimalCompleted, () => {
                        EventBus.emit(EventName.RefreshUser)
                    })
                    const animal = this.animals.find(
                        (animal) => animal.id === placedItemType.animal
                    )
                    if (!animal) {
                        throw new Error(`Animal not found for id: ${placedItemType.tile}`)
                    }
                    const eventMessage: BuyAnimalRequest = {
                        animalId: animal.displayId,
                        position: {
                            x: tileX,
                            y: tileY,
                        },
                    }
                    EventBus.emit(EventName.RequestBuyAnimal, eventMessage)
                    break
                }
                }
            },
        })
        if (!this.placementConfirmation) {
            throw new Error("Placement confirmation not found")
        }
        this.placementConfirmation.setYesButtonVisible(isPlacementValid)
        const { x: centeredX, y: centeredY } = this.getActualTileCoordinates(
            tile.x,
            tile.y
        )
        this.placementConfirmation.updateTileXY(centeredX, centeredY)

        const { x = 0, y = 0 } = { ...tilesetConfig.extraOffsets }
        // set tint based on can place

        if (this.dragVisual instanceof SpineGameObject) {
            // this.dragVisual.setTint(isPlacementValid ? GREEN_TINT_COLOR : RED_TINT_COLOR)
        } else {
            this.dragVisual.setTint(
                isPlacementValid ? WHITE_TINT_COLOR : RED_TINT_COLOR
            )
        }
        this.dragVisual.setPosition(
            tilePosition.x + x,
            tilePosition.y + this.tileHeight + y
        )
    }

    private showPlacmentConfirmation({
        tile,
        onCancel,
        onConfirm,
    }: ShowPlacmentConfirmationParams) {
        const tilePosition = this.tileToWorldXY(tile.x, tile.y)

        if (!tilePosition) {
            throw new Error("Position not found")
        }

        if (!this.placementConfirmation) {
            this.placementConfirmation = new PlacementConfirmation({
                baseParams: {
                    scene: this.scene,
                },
                options: {
                    onCancel,
                    onConfirm,
                },
            }).setDepth(
                calculateGameplayDepth({
                    layer: GameplayLayer.Effects,
                    layerDepth: 3,
                })
            )
            this.scene.add.existing(this.placementConfirmation)
        }
        this.placementConfirmation.setPosition(tilePosition.x, tilePosition.y)
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
        this.showEverything()
        this.destroyDragVisual()
        this.inputMode = InputMode.Normal
        this.placementConfirmation?.removeAll(true)
        this.placementConfirmation?.destroy()
        this.placementConfirmation = undefined
    }

    private getAnimalIdFromKey(tileKey: string): AnimalId {
        for (const [animalId, animalData] of Object.entries(animalAssetMap)) {
            for (const ageData of Object.values(animalData.ages)) {
                if (ageData.textureConfig.key === tileKey) {
                    return animalId as AnimalId
                }
            }
        }
        throw new Error("Animal id not found")
    }

    // destroy method to clean up the resources
    public destroyDragVisual() {
        this.dragVisual?.destroy()
        this.dragVisual = undefined
    // remove the temporary object from the temporary layer
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

    private checkCanSellPlacedItem({ placedItem }: CheckCanSellPlacedItemParams) {
        const placedItemObjectData = this.placedItemObjectMap[placedItem.id]
        if (placedItemObjectData.placedItemType.sellable) {
            //placedItemObjectData.object.setTint(GREEN_TINT_COLOR)
            //placedItemObjectData.object.setTintSprite(GREEN_TINT_COLOR)
        } else {
            //placedItemObjectData.object.setTint(RED_TINT_COLOR)
            //placedItemObjectData.object.setTintSprite(RED_TINT_COLOR)
        }
    }

    private handleSellPlacedItem({ placedItem }: HandleSellPlacedItemParams) {
        let sellPrice: number = 0
        const placedItemObjectData = this.placedItemObjectMap[placedItem.id]

        if (!placedItemObjectData.placedItemType.sellable) {
            throw new Error("Item is not sellable")
        }

        switch (placedItemObjectData.placedItemType.type) {
        case PlacedItemType.Building: {
            const building = this.buildings.find(
                (building) =>
                    building.displayId.toString() ===
            placedItemObjectData.placedItemType.displayId.toString()
            )
            if (!building) {
                throw new Error("Building not found")
            }
            const upgradeLevel =
          placedItemObjectData.object.currentPlacedItem?.buildingInfo
              ?.currentUpgrade ?? 1
            const upgradePrice =
          building.upgrades?.find(
              (upgrade) => upgrade.upgradeLevel === upgradeLevel
          )?.sellPrice ?? 0
            sellPrice = upgradePrice
            break
        }
        case PlacedItemType.Tile: {
            const tile = this._tiles.find(
                (tile) =>
                    tile.displayId.toString() ===
            placedItemObjectData.placedItemType.displayId.toString()
            )
            if (!tile) {
                throw new Error("Tile not found")
            }
            sellPrice = tile.sellPrice ?? 0
            break
        }
        case PlacedItemType.Animal: {
            const animal = this.animals.find(
                (animal) =>
                    animal.displayId.toString() ===
            placedItemObjectData.placedItemType.displayId.toString()
            )
            if (!animal) {
                throw new Error("Animal not found")
            }
            sellPrice = animal.sellPrice ?? 0
            break
        }
        }

        const updateConfirmSellModalMessage: UpdateConfirmModalMessage = {
            message:
        "Are you sure you want to sell this item? You will receive " +
        sellPrice +
        " coins.",
            callback: () => {
                // EventBus.emit(EventName.SellPlacedItem, placedItem)
                console.log("Sell placed item")
                this.inputMode = InputMode.Normal
            },
        }
        EventBus.emit(EventName.UpdateConfirmModal, updateConfirmSellModalMessage)

        EventBus.emit(EventName.OpenModal, {
            modalName: ModalName.Confirm,
        })
    }

    private hideEverything() {
        EventBus.emit(EventName.ShowPlacementModeButtons)
        EventBus.emit(EventName.HideToolbar)
        EventBus.emit(EventName.HideButtons)
    }
    private showEverything() {
        EventBus.emit(EventName.HidePlacementModeButtons)
        EventBus.emit(EventName.ShowToolbar)
        EventBus.emit(EventName.ShowButtons)
    }
}

export interface CheckCanSellPlacedItemParams {
  placedItem: PlacedItemSchema;
}
export interface HandleSellPlacedItemParams {
  placedItem: PlacedItemSchema;
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

export interface ShowPlacmentConfirmationParams {
  tile: Phaser.Tilemaps.Tile;
  onConfirm: (tileX: number, tileY: number) => void;
  onCancel: () => void;
}
