import { calculateUiDepth, UILayer } from "@/game/layers"
import { IPaginatedResponse } from "@/modules/apollo"
import { BuySeedsRequest, BuySuppliesRequest } from "@/modules/axios"
import { createObjectId, sleep } from "@/modules/common"
import {
    AnimalSchema,
    BuildingSchema,
    CropId,
    CropSchema,
    DefaultInfo,
    InventorySchema,
    PlacedItemSchema,
    PlacedItemType,
    PlacedItemTypeSchema,
    SupplyId,
    SupplySchema,
    TileSchema,
    UserSchema
} from "@/modules/entities"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import {
    GridTable,
    Label,
    Sizer,
} from "phaser3-rex-plugins/templates/ui/ui-components"
import {
    AnimalAge,
    animalAssetMap,
    BaseAssetKey,
    buildingAssetMap,
    cropAssetMap,
    supplyAssetMap,
    tileAssetMap,
} from "../../../assets"
import { SCALE_TIME } from "../../../constants"
import {
    CloseModalMessage,
    EventBus,
    EventName,
    ModalName,
    PlacedInprogressMessage,
    SelectTabMessage,
    ShowPressHereArrowMessage,
} from "../../../event-bus"
import { getFirstSeedInventory } from "../../../queries"
import { BaseSizerBaseConstructorParams, CacheKey } from "../../../types"
import {
    Background,
    Text,
    Button,
    ButtonBackground,
    FlyItem,
    getBackgroundContainerSize,
    IconOffsets,
    ModalBackground,
    Size,
    SizeStyle,
    TextColor,
    XButton,
} from "../../elements"
import { restoreTutorialDepth, setTutorialDepth } from "../../tutorial"
import { onGameObjectPress } from "../../utils"
import { MODAL_DEPTH_1 } from "../ModalManager"
import { ITEM_DATA_KEY, tabsConfig } from "./constants"
import { ShopTab } from "./types"

const CELL_SPACE = 25
const defaultShopTab = ShopTab.Seeds
export class ShopContent extends BaseSizer {
    private contentContainer: ContainerLite
    private background: ModalBackground
    // list of items
    private gridTableMap: Partial<Record<ShopTab, GridTable>> = {}
    // data
    private animals: Array<AnimalSchema> = []
    private crops: Array<CropSchema> = []
    private buildings: Array<BuildingSchema> = []
    private tiles: Array<TileSchema> = []
    private supplies: Array<SupplySchema> = []
    private placedItems: Array<PlacedItemSchema> = []
    //default
    private defaultItemCard: ContainerLite | undefined
    private defaultSeedButton: Label | undefined
    // previous selected tab
    private selectedShopTab: ShopTab = defaultShopTab
    private inventories: Array<InventorySchema> = []
    private defaultInfo: DefaultInfo
    private user: UserSchema
    private cellWidth: number
    private cellHeight: number
    private contentWidth: number
    private size: Size
    constructor({
        scene,
        height,
        width,
        x,
        y,
        config,
    }: BaseSizerBaseConstructorParams) {
        super(
            scene,
            x,
            y,
            width,
            height,
            config
        )

        const cellSourceImage = this.scene.textures
            .get(BaseAssetKey.UIModalShopCard)
            .getSourceImage()
        this.cellWidth = cellSourceImage.width
        this.cellHeight = cellSourceImage.height

        this.contentWidth = 3 * this.cellWidth + 2 * CELL_SPACE
        this.size = getBackgroundContainerSize({
            background: Background.XLarge,
            style: SizeStyle.TabContainer,
        })
        this.background = new ModalBackground({
            baseParams: {
                scene: scene,
            },
            options: {
                background: Background.XLarge,
                onXButtonPress: (xButton: XButton) => {
                    EventBus.emit(EventName.CloseModal, {
                        modalName: ModalName.Shop
                    })
                    // emit the events related to the tutorial
                    if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                        restoreTutorialDepth({
                            gameObject: xButton,
                        })
                        this.scene.events.emit(EventName.TutorialCloseShopButtonPressed)
                        this.scene.events.emit(EventName.HidePressHereArrow)
                    }
                },
                title: "Shop",
                tabs: {
                    options: {
                        tabs: Object.values(ShopTab).map((tab) => ({
                            tabKey: tab,
                            iconKey: tabsConfig[tab].iconKey,
                            scale: tabsConfig[tab].scale,
                            offsets: tabsConfig[tab].offsets,
                        })),
                        name: ShopContent.name,
                        defaultTab: defaultShopTab,
                        tabsX: -this.contentWidth / 2,
                        tabsY: 0,
                    },
                },
                container: {
                    showWrapperContainer: true,
                    showContainer: false,
                }
            }
        })
        this.scene.add.existing(this.background)
        this.addLocal(this.background)
        // create the container
        this.contentContainer = scene.rexUI.add.container(0, 20)
        if (!this.background.container) {
            throw new Error("Container is not found")
        }
        this.background.container.addLocal(this.contentContainer)

        // load animals
        this.animals = this.scene.cache.obj.get(CacheKey.Animals)
        this.animals = this.animals.filter((animal) => animal.availableInShop)

        // load crops
        this.crops = this.scene.cache.obj.get(CacheKey.Crops)
        this.crops = this.crops.filter((crop) => crop.availableInShop)

        // load buildings
        this.buildings = this.scene.cache.obj.get(CacheKey.Buildings)
        this.buildings = this.buildings.filter(
            (building) => building.availableInShop
        )

        const { data } = this.scene.cache.obj.get(
            CacheKey.Inventories
        ) as IPaginatedResponse<InventorySchema>
        this.inventories = data
        this.defaultInfo = this.scene.cache.obj.get(CacheKey.DefaultInfo)
        this.user = this.scene.cache.obj.get(CacheKey.User)
        this.tiles = this.scene.cache.obj.get(CacheKey.Tiles)

        this.supplies = this.scene.cache.obj.get(CacheKey.Supplies)
        this.placedItems = this.scene.cache.obj.get(CacheKey.PlacedItems)

        // create the scrollable panel
        for (const shopTab of Object.values(ShopTab)) {
            this.updateGridTable(shopTab)
        }

        //this.layout()
        // listen for the select shop tab event
        this.scene.events.on(
            EventName.SelectTab,
            ({ name, tabKey }: SelectTabMessage<ShopTab>) => {
                if (name !== ShopContent.name) {
                    return
                }
                this.onShopTabSelected(tabKey)
            }
        )

        // set the tutorial depth
        scene.events.once(EventName.TutorialPrepareCloseShop, () => {
            setTutorialDepth({
                gameObject: this.background.xButton,
            })
            const { x, y } = this.background.xButton.getCenter()
            const eventMessage: ShowPressHereArrowMessage = {
                rotation: 45,
                originPosition: { x: x - 60, y: y + 60 },
                targetPosition: { x: x - 40, y: y + 40 },
            }
            scene.events.emit(EventName.ShowPressHereArrow, eventMessage)
        })

        this.scene.events.once(EventName.TutorialShopButtonPressed, async () => {
            // wait for the scale time
            await sleep(SCALE_TIME)
            // get the default seed button
            if (!this.defaultSeedButton) {
                throw new Error("Default seed button is not found")
            }

            if (!this.defaultItemCard) {
                throw new Error("Default item card is not found")
            }

            const inventory = getFirstSeedInventory({
                cropId: this.defaultInfo.defaultCropId,
                scene: this.scene,
                inventories: this.inventories,
            })
            if (
                inventory &&
        inventory.quantity > this.defaultInfo.defaultSeedQuantity
            ) {
                this.scene.events.emit(EventName.TutorialPrepareCloseShop)
                return
            }

            const gridTable = this.gridTableMap[this.selectedShopTab]
            if (!gridTable) {
                throw new Error("Grid table is not found")
            }
            setTutorialDepth({
                gameObject: gridTable,
            })
            
            const eventMessage: ShowPressHereArrowMessage = {
                originPosition: {
                    x: this.defaultSeedButton.x + 60,
                    y: this.defaultSeedButton.y + 40,
                },
                targetPosition: {
                    x: this.defaultSeedButton.x + 40,
                    y: this.defaultSeedButton.y + 20,
                },
            }
            this.scene.events.emit(EventName.ShowPressHereArrow, eventMessage)

            // EventBus.on(EventName.RefreshActivePlacedItem)
        })

        EventBus.on(EventName.UserRefreshed, (user: UserSchema) => {
            this.user = user
            this.updateOwnership()
        })

        EventBus.on(EventName.RefreshPlaceItemsCacheKey, () => {
            this.updateOwnership()
        })
    }

    // handle the selected shop tab
    private onShopTabSelected(shopTab: ShopTab) {
    // hide the previous scrollable panel
        const previousGridTable = this.gridTableMap[this.selectedShopTab]
        if (!previousGridTable) {
            throw new Error("Previous grid table is not found")
        }
        previousGridTable.hide()

        // show the selected scrollable panel
        const gridTable = this.gridTableMap[shopTab]
        if (!gridTable) {
            throw new Error("Selected grid table is not found")
        }
        gridTable.show()
        // set the selected tab
        this.selectedShopTab = shopTab
    }

    private updateGridTable(shopTab: ShopTab) {
    // get the item cards
        const items = this.createItems(shopTab)
        if (this.gridTableMap[shopTab]) {
            this.gridTableMap[shopTab].setItems(items)
            this.gridTableMap[shopTab].layout()
            return
        }
        // create a sizer to hold all the item cards
        const gridTable = this.scene.rexUI.add
            .gridTable({
                x: 0,
                y: 0,
                originY: 0,
                height: this.size?.height,
                width: 3 * this.cellWidth + 2 * CELL_SPACE,
                scrollMode: 0,
                table: {
                    cellWidth: this.cellWidth + CELL_SPACE,
                    cellHeight: this.cellHeight + CELL_SPACE,
                    columns: 3,
                    mask: {
                        padding: 1,
                    },
                },
                createCellContainerCallback: (cell, cellContainer) => {
                    if (cellContainer === null) {
                        if (!cellContainer) {
                            cellContainer = this.scene.rexUI.add
                                .sizer({ orientation: "y" })
                                .setDepth(MODAL_DEPTH_1 + 1)
                            const _cellContainer = cellContainer as Sizer
                            const params = cell.item as ExtendedCreateItemCardParams
                            const itemCard = this.createItemCard(params)
                            if (params.defaultSeed) {
                                this.defaultItemCard = itemCard
                                this.defaultSeedButton = itemCard.getChildren()[2] as Label
                            }
                            _cellContainer.add(itemCard).setDepth(MODAL_DEPTH_1 + 1)
                            cellContainer.setData(ITEM_DATA_KEY, params)
                        }
                    }
                    return cellContainer
                },
                items,
            })
            .layout()

        gridTable.on(
            "cell.click",
            (
                cellContainer: ContainerLite,
                _: number,
                pointer: Phaser.Input.Pointer
            ) => {
                const { onPress, locked } = cellContainer.getData(ITEM_DATA_KEY) as ExtendedCreateItemCardParams
                const button = (
          cellContainer.getChildren()[0] as ContainerLite
        ).getChildren()[2] as Button
                // check if clicked on the button
                if (!locked && button.getBounds().contains(pointer.x, pointer.y)) {
                    onGameObjectPress({
                        gameObject: button,
                        onPress: () => {
                            onPress(pointer)
                        },
                        scene: this.scene,
                    })
                }
            }
        )

        this.gridTableMap[shopTab] = gridTable
        this.contentContainer.addLocal(gridTable)

        // hide the grid table if it is not the default shop tab
        if (shopTab !== this.selectedShopTab) {
            gridTable.hide()
        }
    }

    private checkUnlock(unlockLevel?: number) {
        if (!unlockLevel) {
            return true
        }
        return this.user.level >= unlockLevel
    }

    //create item cards based on the shop tab
    private createItems(
        shopTab: ShopTab = defaultShopTab
    ): Array<ExtendedCreateItemCardParams> {
    //list of item cards
        const items: Array<ExtendedCreateItemCardParams> = []
        switch (shopTab) {
        case ShopTab.Seeds: {
            for (const { displayId, price } of this.crops) {
                // get the image
                items.push({
                    assetKey: cropAssetMap[displayId].seed.textureConfig.key,
                    locked: !this.checkUnlock(
                        this.crops.find((crop) => crop.displayId === displayId)
                            ?.unlockLevel
                    ),
                    unlockLevel: this.crops.find((crop) => crop.displayId === displayId)
                        ?.unlockLevel,
                    onPress: (pointer: Phaser.Input.Pointer) => {
                        this.onBuySeedPress(displayId, pointer)
                    },
                    prepareCloseShop: true,
                    price,
                    defaultSeed: displayId === this.defaultInfo.defaultCropId,
                })
            }
            break
        }
        case ShopTab.Animals: {
            for (const { displayId, price } of this.animals) {
                // get the image
                items.push({
                    assetKey:
                    animalAssetMap[displayId].ages[AnimalAge.Baby].textureConfig.key,
                    locked: !this.checkUnlock(
                        this.animals.find((animal) => animal.displayId === displayId)
                            ?.unlockLevel
                    ),
                    unlockLevel: this.animals.find((animal) => animal.displayId === displayId)
                        ?.unlockLevel,
                    onPress: () => {
                        // close the modal
                        const eventMessage: CloseModalMessage = {
                            modalName: ModalName.Shop,
                        }
                        EventBus.emit(EventName.CloseModal, eventMessage)
                        // then turn on the building mode
                        const message: PlacedInprogressMessage = {
                            id: displayId,
                            type: PlacedItemType.Animal,
                        }
                        EventBus.emit(EventName.PlaceInprogress, message)
                    },
                    price,
                    maxOwnership: this.getAnimalMaxOwnership({
                        displayId
                    }),
                    currentOwnership: this.getCurrentOwnership({
                        type: PlacedItemType.Animal,
                        displayId
                    })
                })
                // add the item card to the scrollable panel
            }
            break
        }
        case ShopTab.Buildings: {
            for (const { displayId, price } of this.buildings) {
                // get the image
                items.push({
                    assetKey: buildingAssetMap[displayId].textureConfig.key,
                    locked: !this.checkUnlock(
                        this.buildings.find((building) => building.displayId === displayId)
                            ?.unlockLevel
                    ),
                    unlockLevel: this.buildings.find((building) => building.displayId === displayId)
                        ?.unlockLevel,
                    onPress: () => {
                        // close the modal
                        const eventMessage: CloseModalMessage = {
                            modalName: ModalName.Shop,
                        }
                        EventBus.emit(EventName.CloseModal, eventMessage)
                        // then turn on the building mode
                        const message: PlacedInprogressMessage = {
                            id: displayId,
                            type: PlacedItemType.Building,
                        }
                        EventBus.emit(EventName.PlaceInprogress, message)
                    },
                    price,
                    scaleX: 0.5,
                    scaleY: 0.5,
                    maxOwnership: this.buildings.find((building) => building.displayId === displayId)?.maxOwnership,
                    currentOwnership: this.getCurrentOwnership({
                        type: PlacedItemType.Building,
                        displayId
                    })
                })
            }
            break
        }
        case ShopTab.Tiles:
            for (const { displayId, price } of this.tiles) {
                // get the image
                items.push({
                    assetKey: tileAssetMap[displayId].textureConfig.key,
                    onPress: () => {
                        // close the modal
                        const eventMessage: CloseModalMessage = {
                            modalName: ModalName.Shop,
                        }
                        EventBus.emit(EventName.CloseModal, eventMessage)
                        // then turn on the building mode
                        const message: PlacedInprogressMessage = {
                            id: displayId,
                            type: PlacedItemType.Tile,
                        }
                        EventBus.emit(EventName.PlaceInprogress, message)
                    },
                    price,
                    maxOwnership: this.tiles.find((tile) => tile.displayId === displayId)?.maxOwnership,
                    currentOwnership: this.getCurrentOwnership({
                        type: PlacedItemType.Tile,
                        displayId
                    })
                })
                // add the item card to the scrollable panel
            }
            break
        case ShopTab.Supply:
            for (const { displayId, price } of this.supplies) {
                // get the image
                items.push({
                    assetKey: supplyAssetMap[displayId].textureConfig.key,
                    locked: false,
                    unlockLevel: 0,
                    onPress: (pointer: Phaser.Input.Pointer) => {
                        this.onBuySupplyPress(displayId, pointer)
                    },
                    prepareCloseShop: true,
                    price,
                })
            }
            break
        case ShopTab.Decorations:
            for (const { displayId, price } of this.buildings) {
                // get the image
                items.push({
                    assetKey: buildingAssetMap[displayId].textureConfig.key,
                    onPress: () => {
                        console.log("Clicked on building", displayId)
                    },
                    price,
                })
                // add the item card to the scrollable panel
            }
            break
        }
        return items
    }

    //create the item card
    private createItemCard({
        assetKey,
        iconOffset,
        price,
        scaleX = 1,
        scaleY = 1,
        unlockLevel,
        locked = false,
        currentOwnership = 0,
        maxOwnership = 0,
    }: CreateItemCardParams) {
    // get the icon offset
        const { x = 0, y = 0 } = iconOffset || {}

        const canAfford = this.user.golds >= (price ?? 0)
        const isAtMaxOwnership = maxOwnership !== 0 && currentOwnership >= maxOwnership
        const isDisabled = !canAfford || isAtMaxOwnership
        // create the components
        const cardBackground = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalShopCard
        )
        const container = this.scene.rexUI.add.container(
            0,
            0,
            cardBackground.width,
            cardBackground.height
        )
        container.addLocal(cardBackground)
        const icon = this.scene.add
            .image(x, y - 40, assetKey)
            .setScale(scaleX, scaleY)
        container.addLocal(icon)
        // create button
        const buttonPrice = new Button({
            baseParams: {
                scene: this.scene,
            },
            options: {
                text: `$${price ?? 0}`,
                disableInteraction: isDisabled,
                height: 100,
                width: 200,
                scale: 0.8,
                syncTextScale: true,
                background: ButtonBackground.Primary,
            },
        })
            .setPosition(0, 90)
        this.scene.add.existing(buttonPrice)
        container.addLocal(buttonPrice)

        if (isDisabled) {
            buttonPrice.disable()
        } else {
            buttonPrice.enable()
        }

        if (locked) {
            const off = this.scene.add.image(0, 0, BaseAssetKey.UIModalShopOff)
            const lockContainer = this.scene.rexUI.add.container(
                0,
                0,
                off.width,
                off.height
            )

            const lock = this.scene.add
                .image(0, 0, BaseAssetKey.UIModalShopLock)
                .setOrigin(0, 0)
            const lockText = new Text({
                baseParams: {
                    scene: this.scene,
                    text: `Lv. ${unlockLevel}`,
                    x: 0,
                    y: 0,
                },
                options: {
                    fontSize: 32,
                },
            }).setOrigin(0.5, 0)
            this.scene.add.existing(lockText)
            lockContainer.addLocal(off)
            const lockLabel = this.scene.rexUI.add
                .label({
                    icon: lock,
                    text: lockText,
                    space: {
                        icon: 10,
                    },
                    originX: 0,
                    originY: 0,
                })
                .layout()
                .setPosition(-(off.width / 2 - 15), -(off.height / 2 - 15))
            lockContainer.addLocal(lockLabel)
            container.addLocal(lockContainer)
            if (buttonPrice.input) {
                buttonPrice.input.enabled = false
            }
        }else{
            if(maxOwnership == 0) return container

            const ownershipText = maxOwnership !== undefined 
                ? `${currentOwnership}/${maxOwnership}`
                : ""

            const ownershipLabel = new Text({
                baseParams: {
                    scene: this.scene,
                    text: ownershipText,
                    x: cardBackground.width / 2 - 10,
                    y: -cardBackground.height / 2 + 10
                },
                options: {
                    fontSize: 28,
                    textColor: TextColor.Brown
                }
            }).setOrigin(1, 0)

            this.scene.add.existing(ownershipLabel)
            container.addLocal(ownershipLabel)
        }
        return container
    }

    private onBuySeedPress(displayId: CropId, pointer: Phaser.Input.Pointer) {
        EventBus.once(EventName.BuySeedsCompleted, () => {
            // refresh user & inventories
            EventBus.emit(EventName.RefreshUser)
            EventBus.emit(EventName.RefreshInventories)
            // emit the events related to the tutorial
            if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                const gridTable = this.gridTableMap[this.selectedShopTab]
                if (!gridTable) {
                    throw new Error("Grid table is not found")
                }
                restoreTutorialDepth({
                    gameObject: gridTable,
                    plusOne: true
                })
                this.scene.events.emit(EventName.TutorialPrepareCloseShop)
            }
        })
        const eventMessage: BuySeedsRequest = {
            cropId: displayId,
            quantity: 1,
        }
        // send request to buy seeds
        EventBus.emit(EventName.RequestBuySeeds, eventMessage)
        const flyItem = new FlyItem({
            baseParams: {
                scene: this.scene,
            },
            options: {
                assetKey: cropAssetMap[displayId].seed.textureConfig.key,
                x: pointer.x,
                y: pointer.y,
                quantity: 1,
                depth: calculateUiDepth({
                    layer: UILayer.Overlay,
                    layerDepth: 1,
                }),
            },
        })
        this.scene.add.existing(flyItem)
    }

    //onBuySupplyPress
    private onBuySupplyPress(displayId: SupplyId, pointer: Phaser.Input.Pointer) {
        EventBus.once(EventName.BuySuppliesCompleted, () => {
            // refresh user & inventories
            EventBus.emit(EventName.RefreshUser)
            EventBus.emit(EventName.RefreshInventories)
            const flyItem = new FlyItem({
                baseParams: {
                    scene: this.scene,
                },
                options: {
                    assetKey: supplyAssetMap[displayId].textureConfig.key,
                    x: pointer.x,
                    y: pointer.y,
                    quantity: 1,
                    depth: calculateUiDepth({
                        layer: UILayer.Overlay,
                        layerDepth: 1,
                    }),
                },
            })
            this.scene.add.existing(flyItem)
        })
        const eventMessage: BuySuppliesRequest = {
            supplyId: displayId,
            quantity: 1,
        }
        // send request to buy seeds
        EventBus.emit(EventName.RequestBuySupplies, eventMessage)
    }

    private getCurrentOwnership({ type, displayId }: GetCurrentOwnershipParams): number {
        if(!this.placedItems) return 0

        //all placed item types
        const placedItemTypes = this.scene.cache.obj.get(CacheKey.PlacedItemTypes) as Array<PlacedItemTypeSchema>

        //get the placed item type
        const placedItemType = placedItemTypes.find(item => item.displayId === displayId && item.type === type)
        if (!placedItemType){
            throw new Error("Placed item type not found.")
        }

        return this.placedItems.filter(item => item.placedItemType === createObjectId(displayId)).length
    }
    

    private getAnimalMaxOwnership({ displayId }: GetAnimalMaxOwnershipParams): number {
        const animal = this.animals.find(animal => animal.displayId === displayId)
        if (!animal){
            throw new Error("[getAnimalMaxOwnership] Animal not found.")
        }
    
        const relatedBuilding = this.buildings.find(building => building.type === animal.type)
        if (!relatedBuilding){
            throw new Error("[getAnimalMaxOwnership] Related building not found.")
        }
    
        if (!this.placedItems){
            return 0
        }
    
        const userBuildings = this.placedItems.filter(item => item.placedItemType === createObjectId(relatedBuilding.displayId))
        let maxCapacity = 0
        for (const building of userBuildings) {
            console.log("[getAnimalMaxOwnership] building", building)
            const upgradeLevel = building.buildingInfo?.currentUpgrade || 0
            if (relatedBuilding.upgrades) {
                console.log("[getAnimalMaxOwnership] upgradeLevel", upgradeLevel)
                const upgrade = relatedBuilding.upgrades.find(upgrade => upgrade.upgradeLevel === upgradeLevel)
                if (upgrade){
                    maxCapacity += upgrade.capacity
                }else{
                    throw new Error("[getAnimalMaxOwnership] Upgrade not found.")
                }
            }
        }
    
        return maxCapacity
    }
    

    private updateOwnership() {
        console.log("Updating ownership data...")
        
        this.placedItems = this.scene.cache.obj.get(CacheKey.PlacedItems) as Array<PlacedItemSchema>
        if (!this.placedItems) {
            console.warn("No placed items found.")
            return
        }
    
        Object.values(ShopTab).forEach((shopTab) => {
            if (!this.gridTableMap[shopTab]) return
            
            const items = this.createItems(shopTab)
            this.gridTableMap[shopTab].setItems(items)
            this.gridTableMap[shopTab].layout()
        })
    
        console.log("Ownership update complete.")
    }
}
        

export interface GetCurrentOwnershipParams {
    type: PlacedItemType;
    displayId: string;
}

export interface GetAnimalMaxOwnershipParams {
    displayId: string;
}

export interface CreateItemCardParams {
  // the asset key of the item card
  assetKey: string;
  // offsets of the icon
  iconOffset?: IconOffsets;
  // price
  price?: number;
  // scale X
  scaleX?: number;
  // scale Y
  scaleY?: number;
  // locked
  locked?: boolean;
  // level unlock
  unlockLevel?: number;
  // prepare close shop
  prepareCloseShop?: boolean;
  // default seed
  defaultSeed?: boolean;
  // Maximum ownership limit (only for applicable items)
  maxOwnership?: number;
  // Current ownership count
  currentOwnership?: number;
}

export interface ExtendedCreateItemCardParams extends CreateItemCardParams {
  onPress: (pointer: Phaser.Input.Pointer) => void;
}