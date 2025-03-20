import { calculateUiDepth, UILayer } from "@/game/layers"
import {
    BuySeedsRequest,
    BuySuppliesRequest,
    BuyToolRequest,
} from "@/modules/apollo"
import { sleep } from "@/modules/common"
import {
    AnimalId,
    AnimalSchema,
    BuildingSchema,
    CropId,
    CropSchema,
    DefaultInfo,
    FruitSchema,
    InventorySchema,
    InventoryTypeSchema,
    PetSchema,
    PlacedItemSchema,
    PlacedItemType,
    PlacedItemTypeSchema,
    SupplyId,
    SupplySchema,
    TileSchema,
    ToolId,
    ToolSchema,
    UserSchema,
} from "@/modules/entities"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import {
    GridTable,
    Label,
    Sizer,
} from "phaser3-rex-plugins/templates/ui/ui-components"
import {
    animalAssetMap,
    BaseAssetKey,
    buildingAssetMap,
    cropAssetMap,
    fruitAssetMap,
    petAssetMap,
    supplyAssetMap,
    tileAssetMap,
    toolAssetMap,
} from "../../../assets"
import { SCALE_TIME } from "../../../constants"
import {
    CloseModalMessage,
    EventBus,
    EventName,
    ModalName,
    BuyingModeOnMessage,
    SelectTabMessage,
    ShowPressHereArrowMessage,
} from "../../../event-bus"
import { getFirstSeedInventory, getPlacedItemsByType } from "../../../queries"
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
    XButton,
    TextColor,
} from "../../elements"
import { restoreTutorialDepth, setTutorialDepth } from "../../tutorial"
import { onGameObjectPress } from "../../utils"
import { MODAL_DEPTH_1 } from "../ModalManager"
import { ITEM_DATA_KEY, tabsConfig } from "./constants"
import { ShopTab } from "./types"
import { PlacedItemsSyncedMessage } from "@/hooks"

const CELL_SPACE = 25
const defaultShopTab = ShopTab.Seeds

export interface ShopTabData {
  showLimitText?: boolean;
}

export const shopTabData: Record<ShopTab, ShopTabData> = {
    [ShopTab.Seeds]: {
        showLimitText: false,
    },
    [ShopTab.Animals]: {
        showLimitText: false,
    },
    [ShopTab.Buildings]: {
        showLimitText: true,
    },
    [ShopTab.Fruits]: {
        showLimitText: true,
    },
    [ShopTab.Tiles]: {
        showLimitText: true,
    },
    [ShopTab.Supplies]: {
        showLimitText: false,
    },
    [ShopTab.Tools]: {
        showLimitText: false,
    },
    [ShopTab.Pets]: {
        showLimitText: false,
    },
    [ShopTab.Decorations]: {
        showLimitText: false,
    },
}

export interface LimitData {
  limitReached: boolean;
}

export class ShopContent extends BaseSizer {
    private contentContainer: ContainerLite
    private background: ModalBackground
    // list of items
    private gridTableMap: Partial<Record<ShopTab, Sizer>> = {}
    private limitMap: Partial<Record<ShopTab, LimitData>> = {}
    // data
    private animals: Array<AnimalSchema>
    private crops: Array<CropSchema>
    private buildings: Array<BuildingSchema>
    private tiles: Array<TileSchema>
    private fruits: Array<FruitSchema>
    private supplies: Array<SupplySchema>
    private placedItems: Array<PlacedItemSchema> = []
    private placedItemTypes: Array<PlacedItemTypeSchema>
    private inventoryTypes: Array<InventoryTypeSchema>
    private pets: Array<PetSchema>
    private tools: Array<ToolSchema>
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
        super(scene, x, y, width, height, config)

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
                        modalName: ModalName.Shop,
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
                },
            },
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

        this.fruits = this.scene.cache.obj.get(CacheKey.Fruits)
        this.fruits = this.fruits.filter((fruit) => fruit.availableInShop)

        this.placedItemTypes = this.scene.cache.obj.get(CacheKey.PlacedItemTypes)

        // load buildings
        this.buildings = this.scene.cache.obj.get(CacheKey.Buildings)
        this.buildings = this.buildings.filter(
            (building) => building.availableInShop
        )

        // load supplies
        this.supplies = this.scene.cache.obj.get(CacheKey.Supplies)
        this.supplies = this.supplies.filter((supply) => supply.availableInShop)

        // load tools
        this.tools = this.scene.cache.obj.get(CacheKey.Tools)
        this.tools = this.tools.filter((tool) => tool.availableInShop)

        // load pets
        this.pets = this.scene.cache.obj.get(CacheKey.Pets)
        this.pets = this.pets.filter((pet) => pet.availableInShop)

        // load inventory types
        this.inventoryTypes = this.scene.cache.obj.get(CacheKey.InventoryTypes)

        this.inventories = this.scene.cache.obj.get(CacheKey.Inventories)
        this.defaultInfo = this.scene.cache.obj.get(CacheKey.DefaultInfo)
        this.user = this.scene.cache.obj.get(CacheKey.User)
        this.tiles = this.scene.cache.obj.get(CacheKey.Tiles)

        EventBus.on(
            EventName.PlacedItemsSynced,
            ({ placedItems }: PlacedItemsSyncedMessage) => {
                this.placedItems = placedItems
                this.updateGridTables()
            }
        )


        // create the scrollable panel
        this.updateGridTables()

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
            if (!this.background.xButton) {
                throw new Error("XButton not found")
            }
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
            this.updateGridTables()
        })

        EventBus.on(
            EventName.InventoriesRefreshed,
            (inventories: Array<InventorySchema>) => {
                this.inventories = inventories
                this.updateGridTables()
            }
        )

        EventBus.on(EventName.RefreshPlaceItemsCacheKey, () => {
            this.updateGridTables()
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

        // check the limit
        this.checkLimit(shopTab)
    }

    private getLimit(shopTab: ShopTab): GetLimitResult {
        switch (shopTab) {
        case ShopTab.Tiles:
            return {
                currentOwnership: getPlacedItemsByType({
                    scene: this.scene,
                    placedItems: this.placedItems,
                    type: PlacedItemType.Tile,
                }).length,
                maxOwnership: this.defaultInfo.tileLimit,
            }
        case ShopTab.Buildings:
            return {
                currentOwnership: getPlacedItemsByType({
                    scene: this.scene,
                    placedItems: this.placedItems,
                    type: PlacedItemType.Building,
                }).length,
                maxOwnership: this.defaultInfo.buildingLimit,
            }
        case ShopTab.Fruits:
            return {
                currentOwnership: getPlacedItemsByType({
                    scene: this.scene,
                    placedItems: this.placedItems,
                    type: PlacedItemType.Fruit,
                }).length,
                maxOwnership: this.defaultInfo.fruitLimit,
            }
        default:
            throw new Error("Shop tab not found")
        }
    }

    private getGridTable(shopTab: ShopTab) {
        const { showLimitText } = shopTabData[shopTab] 
        return this.gridTableMap[shopTab]?.getChildren()[showLimitText ? 1 : 0] as GridTable
    }
    
    private updateGridTable(shopTab: ShopTab) {
        // get the item cards
        const items = this.createItems(shopTab)
        const { showLimitText } = shopTabData[shopTab]
        if (this.gridTableMap[shopTab]) {
            if (showLimitText) {
                const limitText = this.gridTableMap[shopTab].getChildren()[0] as Text
                console.log(shopTab)
                const { currentOwnership, maxOwnership } = this.getLimit(shopTab)
                limitText.setText(`Limit: ${currentOwnership}/${maxOwnership}`)
            }
            const gridTable = this.getGridTable(shopTab)
            gridTable.setItems(items)
            gridTable.layout()
            return
        }

        // create a sizer to hold all the item cards
        if (!this.size.width || !this.size.height) {
            throw new Error("Size not found")
        }

        this.gridTableMap[shopTab] = this.scene.rexUI.add
            .sizer({ orientation: "y", space: { item: 40 }, originY: 0 })

        if (showLimitText) {
            const limitText = new Text({
                baseParams: {
                    scene: this.scene,
                    x: 0,
                    y: 0,
                    text: "",
                },
                options: {
                    textColor: TextColor.White,
                    fontSize: 40,
                },
            })
                .setVisible(false)
                .setOrigin(0, 0)
            this.scene.add.existing(limitText)
            const { currentOwnership, maxOwnership } = this.getLimit(shopTab)
            limitText.setText(`Limit: ${currentOwnership}/${maxOwnership}`)
            // add the limit text to the grid table
            this.gridTableMap[shopTab].add(limitText, {
                align: "left-center",
            })
        }
        const gridTable = this.scene.rexUI.add
            .gridTable({
                x: 0,
                y: 0,
                height: this.size.height,
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
                    const depth = this.gridTableMap[shopTab]?.depth || MODAL_DEPTH_1 + 1
                    if (cellContainer === null) {
                        if (!cellContainer) {
                            cellContainer = this.scene.rexUI.add
                                .sizer({ orientation: "y" })
                                .setDepth(depth)
                            const _cellContainer = cellContainer as Sizer
                            const params = cell.item as ExtendedCreateItemCardParams
                            const itemCard = this.createItemCard(params)
                            if (params.defaultSeed) {
                                this.defaultItemCard = itemCard
                                this.defaultSeedButton = itemCard.getChildren()[2] as Label
                            }
                            _cellContainer.add(itemCard).setDepth(depth + 1)
                            cellContainer.setData(ITEM_DATA_KEY, params)
                        }
                    }
                    return cellContainer
                },
                items,
            })
            .layout()
        this.gridTableMap[shopTab].add(gridTable)
        this.gridTableMap[shopTab].layout()

        gridTable.on(
            "cell.click",
            (
                cellContainer: ContainerLite,
                _: number,
                pointer: Phaser.Input.Pointer
            ) => {
                const { onPress, locked, disabled } = cellContainer.getData(
                    ITEM_DATA_KEY
                ) as ExtendedCreateItemCardParams
                const button = (
          cellContainer.getChildren()[0] as ContainerLite
        ).getChildren()[2] as Button
        // check if clicked on the button
                if (
                    !disabled &&
          !locked &&
          button.getBounds().contains(pointer.x, pointer.y)
                ) {
                    onGameObjectPress({
                        gameObject: button,
                        onPress: () => {
                            onPress(pointer)
                        },
                        scene: this.scene,
                    })
                    this.scene.events.emit(EventName.CreateFlyItem, {
                        position: pointer.position,
                        text: "Max ownership reached.11",
                    })
                }
            }
        )

        this.contentContainer.addLocal(this.gridTableMap[shopTab])

        // hide the grid table if it is not the default shop tab
        if (shopTab !== this.selectedShopTab) {
            this.gridTableMap[shopTab].hide()
        }

        // check the limit
        if (shopTab === this.selectedShopTab) {
            //check the limit
            this.checkLimit(shopTab)
        }
    }

    private checkLimit(shopTab: ShopTab) {
        if (!this.gridTableMap[shopTab]) {
            throw new Error("Grid table is not found")
        }
        const { showLimitText } = shopTabData[shopTab]
        if (!showLimitText) {
            return
        }
        const limitText = this.gridTableMap[shopTab].getChildren()[0] as Text
        if (!shopTabData[shopTab].showLimitText) {
            limitText.setVisible(false)
            return
        }
        const { currentOwnership, maxOwnership } = this.getLimit(shopTab)
        limitText
            .setText(`Limit: ${currentOwnership}/${maxOwnership}`)
            .setVisible(true)
        if (currentOwnership >= maxOwnership) {
            this.limitMap[shopTab] = {
                limitReached: true,
            }
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
            for (const { displayId, price, unlockLevel } of this.crops) {
                if (!cropAssetMap[displayId].shop) {
                    throw new Error("Price is not found.")
                }
                // get the image
                items.push({
                    assetKey: cropAssetMap[displayId].shop.textureConfig.key,
                    locked: !this.checkUnlock(unlockLevel),
                    disabled: this.user.golds < price,
                    unlockLevel,
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
            for (const { displayId, price, unlockLevel, id } of this.animals) {
                if (!price) {
                    throw new Error("Price is not found.")
                }
                const goldsEnough = this.user.golds >= price
                const maxOwnership = this.getAnimalMaxOwnership({
                    displayId,
                })
                const currentOwnership = this.getCurrentOwnership({
                    displayId,
                    type: PlacedItemType.Animal,
                })
                const ownershipSastified = currentOwnership < maxOwnership
                const disabled = !(goldsEnough && ownershipSastified)
                // get the image
                if (!animalAssetMap[displayId].shop) {
                    throw new Error("Shop asset is not found.")
                }
                items.push({
                    assetKey: animalAssetMap[displayId].shop.textureConfig.key,
                    locked: !this.checkUnlock(unlockLevel),
                    disabled,
                    showOwnership: true,
                    unlockLevel,
                    onPress: () => {
                        // close the modal
                        const eventMessage: CloseModalMessage = {
                            modalName: ModalName.Shop,
                        }
                        EventBus.emit(EventName.CloseModal, eventMessage)
                        // then turn on the building mode
                        const message: BuyingModeOnMessage = {
                            id,
                            type: PlacedItemType.Animal,
                        }
                        EventBus.emit(EventName.BuyingModeOn, message)
                        EventBus.emit(EventName.HideButtons)
                    },
                    price,
                    maxOwnership,
                    currentOwnership,
                })
                // add the item card to the scrollable panel
            }
            break
        }
        case ShopTab.Buildings: {
            for (const { displayId, price, unlockLevel, id } of this.buildings) {
                if (!price) {
                    throw new Error("Price is not found.")
                }
                const goldsEnough = this.user.golds >= price
                const currentOwnership = this.getCurrentOwnership({
                    displayId,
                    type: PlacedItemType.Building,
                })
                const maxOwnership = this.buildings.find(
                    (building) => building.displayId === displayId
                )?.maxOwnership
                if (!maxOwnership) {
                    throw new Error("Max ownership is not found.")
                }
                const ownershipSastified = currentOwnership < maxOwnership
                const disabled =
            !(goldsEnough && ownershipSastified) ||
            this.limitMap[ShopTab.Buildings]?.limitReached
                // get the image
                if (!buildingAssetMap[displayId].shop) {
                    throw new Error("Shop asset is not found.")
                }
                items.push({
                    assetKey: buildingAssetMap[displayId].shop.textureConfig.key,
                    locked: !this.checkUnlock(unlockLevel),
                    disabled,
                    unlockLevel,
                    onPress: () => {
                        // close the modal
                        const eventMessage: CloseModalMessage = {
                            modalName: ModalName.Shop,
                        }
                        EventBus.emit(EventName.CloseModal, eventMessage)
                        // then turn on the building mode
                        const message: BuyingModeOnMessage = {
                            id,
                            type: PlacedItemType.Building,
                        }
                        EventBus.emit(EventName.HideButtons)
                        EventBus.emit(EventName.BuyingModeOn, message)
                    },
                    price,
                    scaleWidth:
              buildingAssetMap[displayId].shop.textureConfig.scaleWidth,
                    scaleHeight:
              buildingAssetMap[displayId].shop.textureConfig.scaleHeight,
                    showOwnership: true,
                    maxOwnership,
                    currentOwnership,
                })
            }
            break
        }
        case ShopTab.Fruits: {
            for (const { displayId, price, unlockLevel, id } of this.fruits) {
                if (!fruitAssetMap[displayId].shop) {
                    throw new Error("Price is not found.")
                }
                const goldsEnough = this.user.golds >= price
                const disabled =
            !goldsEnough || this.limitMap[ShopTab.Fruits]?.limitReached
                // get the image
                items.push({
                    assetKey: fruitAssetMap[displayId].shop.textureConfig.key,
                    locked: !this.checkUnlock(unlockLevel),
                    unlockLevel,
                    onPress: () => {
                        // close the modal
                        const eventMessage: CloseModalMessage = {
                            modalName: ModalName.Shop,
                        }
                        EventBus.emit(EventName.CloseModal, eventMessage)
                        // then turn on the building mode
                        const message: BuyingModeOnMessage = {
                            id,
                            type: PlacedItemType.Fruit,
                        }
                        EventBus.emit(EventName.HideButtons)
                        EventBus.emit(EventName.BuyingModeOn, message)
                    },
                    prepareCloseShop: true,
                    price,
                    disabled,
                })
            }
            break
        }
        case ShopTab.Tiles: {
            for (const { displayId, price, unlockLevel, id } of this.tiles) {
                if (!price) {
                    throw new Error("Price is not found.")
                }
                const goldsEnough = this.user.golds >= price
                const currentOwnership = this.getCurrentOwnership({
                    displayId,
                    type: PlacedItemType.Tile,
                })
                const maxOwnership = this.defaultInfo.tileLimit
                if (!maxOwnership) {
                    throw new Error("Max ownership is not found.")
                }
                const ownershipSastified = currentOwnership < maxOwnership
                const disabled =
            !(goldsEnough && ownershipSastified) ||
            this.limitMap[ShopTab.Tiles]?.limitReached
                // get the image
                items.push({
                    assetKey: tileAssetMap[displayId].textureConfig.key,
                    locked: !this.checkUnlock(unlockLevel),
                    disabled,
                    unlockLevel,
                    onPress: () => {
                        // close the modal
                        const eventMessage: CloseModalMessage = {
                            modalName: ModalName.Shop,
                        }
                        EventBus.emit(EventName.CloseModal, eventMessage)
                        // then turn on the building mode
                        const message: BuyingModeOnMessage = {
                            id,
                            type: PlacedItemType.Tile,
                        }
                        EventBus.emit(EventName.BuyingModeOn, message)
                        EventBus.emit(EventName.HideButtons)
                    },
                    price,
                })
                // add the item card to the scrollable panel
            }
            break
        }
        case ShopTab.Supplies: {
            for (const { displayId, price, unlockLevel } of this.supplies) {
                // get the image
                items.push({
                    assetKey: supplyAssetMap[displayId].textureConfig.key,
                    locked: !this.checkUnlock(unlockLevel),
                    unlockLevel,
                    onPress: (pointer: Phaser.Input.Pointer) => {
                        this.onBuySupplyPress(displayId, pointer)
                    },
                    prepareCloseShop: true,
                    price,
                })
            }
            break
        }
        case ShopTab.Pets: {
            for (const { displayId, price, unlockLevel } of this.pets) {
                // get the image
                items.push({
                    assetKey: petAssetMap[displayId].textureConfig.key,
                    locked: !this.checkUnlock(unlockLevel),
                    unlockLevel,
                    onPress: (pointer: Phaser.Input.Pointer) => {
                        // this.onBuySupplyPress(displayId, pointer)
                        console.log(pointer)
                    },
                    price,
                })
            }
            break
        }
        case ShopTab.Tools: {
            for (const { displayId, price, unlockLevel, id } of this.tools) {
                if (!price) {
                    throw new Error("Price is not found.")
                }
                const goldsEnough = this.user.golds >= price
                const inventoryType = this.inventoryTypes.find(
                    (inventoryType) => inventoryType.tool === id
                )
                if (!inventoryType) {
                    throw new Error("Inventory type is not found.")
                }
                const owned = this.inventories.some(
                    (inventory) => inventory.inventoryType === inventoryType.id
                )
                const disabled = !goldsEnough || owned
                // get the image
                items.push({
                    assetKey: toolAssetMap[displayId].textureConfig.key,
                    locked: !this.checkUnlock(unlockLevel),
                    unlockLevel,
                    disabled,
                    onPress: (pointer: Phaser.Input.Pointer) => {
                        this.onBuyToolPress(displayId, pointer)
                    },
                    price,
                })
            }
            break
        }
        case ShopTab.Decorations:
            for (const { displayId, price } of this.buildings) {
                // get the image
                items.push({
                    assetKey: buildingAssetMap[displayId].map.textureConfig.key,
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
        scaleHeight = 1,
        scaleWidth = 1,
        disabled,
        unlockLevel,
        locked = false,
        showOwnership = false,
        currentOwnership = 0,
        maxOwnership = 0,
    }: CreateItemCardParams) {
    // get the icon offset
        const { x = 0, y = 0 } = iconOffset || {}

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
            .image(x, y + 20, assetKey)
            .setOrigin(0.5, 1)
            .setScale(scaleWidth, scaleHeight)
        container.pinLocal(icon, {
            syncScale: false,
        })
        // create button
        const buttonPrice = new Button({
            baseParams: {
                scene: this.scene,
            },
            options: {
                text: `$${price ?? 0}`,
                height: 100,
                width: 200,
                scale: 0.8,
                syncTextScale: true,
                background: ButtonBackground.Primary,
            },
        }).setPosition(0, 90)
        this.scene.add.existing(buttonPrice)
        if (disabled) {
            buttonPrice.disable()
        }
        container.addLocal(buttonPrice)

        if (showOwnership) {
            const ownership = new Text({
                baseParams: {
                    scene: this.scene,
                    text: `${currentOwnership}/${maxOwnership}`,
                    x: cardBackground.width / 2 - 10,
                    y: -cardBackground.height / 2 + 10,
                },
                options: {
                    fontSize: 32,
                    enableStroke: true,
                },
            }).setOrigin(1, 0)
            this.scene.add.existing(ownership)
            container.addLocal(ownership)
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
        }

        return container
    }

    private onBuySeedPress(displayId: CropId, pointer: Phaser.Input.Pointer) {
        EventBus.once(EventName.BuySeedsCompleted, () => {
            // refresh user & inventories
            // emit the events related to the tutorial
            if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                const gridTable = this.gridTableMap[this.selectedShopTab]
                if (!gridTable) {
                    throw new Error("Grid table is not found")
                }
                restoreTutorialDepth({
                    gameObject: gridTable,
                    plusOne: true,
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
        if (!cropAssetMap[displayId].shop) {
            throw new Error("Shop asset is not found.")
        }
        const flyItem = new FlyItem({
            baseParams: {
                scene: this.scene,
            },
            options: {
                assetKey: cropAssetMap[displayId].shop.textureConfig.key,
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
        })
        const eventMessage: BuySuppliesRequest = {
            supplyId: displayId,
            quantity: 1,
        }
        // send request to buy seeds
        EventBus.emit(EventName.RequestBuySupplies, eventMessage)
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
    }

    private onBuyToolPress(displayId: ToolId, pointer: Phaser.Input.Pointer) {
        EventBus.once(EventName.BuyToolCompleted, () => {
        })
        const eventMessage: BuyToolRequest = {
            toolId: displayId,
        }
        // send request to buy seeds
        EventBus.emit(EventName.RequestBuyTool, eventMessage)
        const flyItem = new FlyItem({
            baseParams: {
                scene: this.scene,
            },
            options: {
                assetKey: toolAssetMap[displayId].textureConfig.key,
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

    private getCurrentOwnership({
        type,
        displayId,
    }: GetCurrentOwnershipParams): number {
        if (this.placedItemTypes.length === 0) return 0
        //get the placed item type
        const placedItemType = this.placedItemTypes.find(
            (placedItemType) =>
                placedItemType.displayId === displayId && placedItemType.type === type
        )
        if (!placedItemType) {
            throw new Error("Placed item type not found.")
        }

        return this.placedItems.filter(
            (item) => item.placedItemType === placedItemType.id
        ).length
    }

    private getAnimalMaxOwnership({
        displayId,
    }: GetAnimalMaxOwnershipParams): number {
        const animal = this.animals.find(
            (animal) => animal.displayId === displayId
        )
        if (!animal) {
            throw new Error("Animal not found.")
        }

        const building = this.buildings.find(
            (building) => building.animalContainedType === animal.type
        )
        if (!building) {
            throw new Error("Building not found.")
        }
        const placedItemType = this.placedItemTypes.find(
            (placedItemType) => placedItemType.building === building.id
        )
        if (!placedItemType) {
            throw new Error("Placed item type not found.")
        }
        const placedItemBuildings = this.placedItems.filter(
            (placedItemBuilding) => {
                return placedItemBuilding.placedItemType === placedItemType.id
            }
        )
        let maxCapacity = 0
        for (const placedItemBuilding of placedItemBuildings) {
            const upgradeLevel = placedItemBuilding.buildingInfo?.currentUpgrade
            if (!upgradeLevel) {
                throw new Error("Upgrade level not found.")
            }
            if (building.upgrades) {
                const upgrade = building.upgrades.find(
                    (upgrade) => upgrade.upgradeLevel === upgradeLevel
                )
                if (!upgrade) {
                    throw new Error("[getAnimalMaxOwnership] Upgrade not found.")
                }
                maxCapacity += upgrade.capacity
            }
        }
        return maxCapacity
    }

    private updateGridTables() {
        for (const shop of Object.values(ShopTab)) {
            this.updateGridTable(shop) 
        }
    }
}

export interface GetCurrentOwnershipParams {
  type: PlacedItemType;
  displayId: string;
}

export interface GetAnimalMaxOwnershipParams {
  displayId: AnimalId;
}

export interface CreateItemCardParams {
  // the asset key of the item card
  assetKey: string;
  // offsets of the icon
  iconOffset?: IconOffsets;
  // price
  price?: number;
  // scale width
  scaleWidth?: number;
  // scale height
  scaleHeight?: number;
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
  // show ownership
  showOwnership?: boolean;
  // disabled
  disabled?: boolean;
}

export interface ExtendedCreateItemCardParams extends CreateItemCardParams {
  onPress: (pointer: Phaser.Input.Pointer) => void;
}

export interface GetLimitResult {
  currentOwnership: number;
  maxOwnership: number;
}
