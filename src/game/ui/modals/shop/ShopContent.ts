import {
    GridTable,
    Label,
    Sizer,
} from "phaser3-rex-plugins/templates/ui/ui-components"
import { ShopTab } from "./types"
import {
    AnimalAge,
    animalAssetMap,
    BaseAssetKey,
    buildingAssetMap,
    cropAssetMap,
    tileAssetMap,
} from "../../../assets"
import { restoreTutorialDepth, setTutorialDepth } from "../../tutorial"
import {
    Background,
    BaseTabs,
    BaseText,
    Button,
    ButtonBackground,
    FlyItem,
    IconOffsets,
    ModalBackground,
} from "../../elements"
import { CacheKey, BaseSizerBaseConstructorParams } from "../../../types"
import {
    AnimalSchema,
    BuildingSchema,
    CropSchema,
    InventorySchema,
    PlacedItemType,
    DefaultInfo,
    TileSchema,
    UserSchema,
} from "@/modules/entities"
import {
    CloseModalMessage,
    EventBus,
    EventName,
    ModalName,
    PlacedInprogressMessage,
    SelectTabMessage,
    ShowPressHereArrowMessage,
} from "../../../event-bus"
import { BuySeedsRequest } from "@/modules/axios"
import { getFirstSeedInventory } from "../../../queries"
import { sleep } from "@/modules/common"
import { SCALE_TIME } from "../../../constants"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { IPaginatedResponse } from "@/modules/apollo"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { MODAL_DEPTH_1 } from "../ModalManager"
import { calculateUiDepth, UILayer } from "@/game/layers"
import { tabsConfig } from "./constants"
import { onGameObjectPress } from "../../utils"

const CELL_SPACE = 25
const defaultShopTab = ShopTab.Seeds
export class ShopContent extends BaseSizer {
    private tabs: BaseTabs
    private containerBackground: Phaser.GameObjects.Image
    private contentContainer: ContainerLite
    private background: ModalBackground
    // list of items
    private gridTableMap: Partial<Record<ShopTab, GridTable>> = {}
    // data
    private animals: Array<AnimalSchema> = []
    private crops: Array<CropSchema> = []
    private buildings: Array<BuildingSchema> = []
    private tiles: Array<TileSchema> = []

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
    constructor({
        scene,
        height,
        width,
        x,
        y,
        config,
    }: BaseSizerBaseConstructorParams) {
        const shopBackground = new ModalBackground({
            baseParams: {
                scene: scene,
            },
            options: {
                background: Background.XLarge,
                onXButtonPress: () => {
                    EventBus.emit(EventName.CloseModal, {
                        modalName: ModalName.Shop
                    })
                },
                title: "Shop",
            }
        })
        const containerBackground = scene.add
            .image(0, 0, BaseAssetKey.UIModalShopContainer)
            .setOrigin(0.5, 1)
        super(
            scene,
            x,
            y,
            width ?? containerBackground.width,
            height ?? containerBackground.height,
            config
        )
        this.background = shopBackground
        this.scene.add.existing(this.background)
        this.addLocal(this.background)

        // create the container
        this.contentContainer = scene.rexUI.add.container(0, -100)
        this.addLocal(this.contentContainer)

        this.containerBackground = containerBackground
        this.contentContainer.addLocal(containerBackground)

        const cellSourceImage = this.scene.textures
            .get(BaseAssetKey.UIModalShopCard)
            .getSourceImage()
        this.cellWidth = cellSourceImage.width
        this.cellHeight = cellSourceImage.height

        this.contentWidth = 3 * this.cellWidth + 2 * CELL_SPACE

        this.tabs = new BaseTabs({
            baseParams: {
                scene,
                width: this.contentWidth,
                y: -(this.containerBackground.height - 200),
            },
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
        })
        this.scene.add.existing(this.tabs)
        this.contentContainer.addLocal(this.tabs)

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
            // disable the default scroller
            this.disableDefaultScroller()

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

            setTutorialDepth({
                scene: this.scene,
                gameObject: this.defaultItemCard,
            })

            const eventMessage: ShowPressHereArrowMessage = {
                originPosition: {
                    x: this.defaultSeedButton.x + 60,
                    y: this.defaultSeedButton.y + 60,
                },
                targetPosition: {
                    x: this.defaultSeedButton.x + 40,
                    y: this.defaultSeedButton.y + 40,
                },
            }
            this.scene.events.emit(EventName.ShowPressHereArrow, eventMessage)

            // EventBus.on(EventName.RefreshActivePlacedItem)
        })

        EventBus.on(EventName.UserRefreshed, (user: UserSchema) => {
            this.user = user
        })

        this.layout()
    }

    private disableDefaultScroller() {
        const defaultScrollablePanel = this.gridTableMap[this.selectedShopTab]
        if (!defaultScrollablePanel) {
            throw new Error("Default scrollable panel is not found")
        }
        defaultScrollablePanel.setMouseWheelScrollerEnable(false)
        defaultScrollablePanel.setScrollerEnable(false)
    }

    private enableDefaultScroller() {
        const defaultScrollablePanel = this.gridTableMap[this.selectedShopTab]
        if (!defaultScrollablePanel) {
            throw new Error("Default scrollable panel is not found")
        }
        defaultScrollablePanel.setMouseWheelScrollerEnable(true)
        defaultScrollablePanel.setScrollerEnable(true)
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
                originY: 1,
                height: 920,
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
                            if (params.prepareCloseShop) {
                                if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                                    restoreTutorialDepth({
                                        gameObject: itemCard,
                                        scene: this.scene,
                                    })
                                    this.scene.events.emit(EventName.TutorialPrepareCloseShop)
                                }
                            }
                            _cellContainer.add(itemCard).setDepth(MODAL_DEPTH_1 + 1)
                            cellContainer.setData(CellKey.Data, params)
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
                const { onPress, locked } = cellContainer.getData(CellKey.Data) as ExtendedCreateItemCardParams
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
                        EventBus.once(EventName.BuySeedsCompleted, () => {
                            // refresh user & inventories
                            EventBus.emit(EventName.RefreshUser)
                            EventBus.emit(EventName.RefreshInventories)
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
                        })
                        const eventMessage: BuySeedsRequest = {
                            cropId: displayId,
                            quantity: 1,
                        }
                        // send request to buy seeds
                        EventBus.emit(EventName.RequestBuySeeds, eventMessage)
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
                })
                // add the item card to the scrollable panel
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
        case ShopTab.Others:
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
        case ShopTab.Trees:
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
            .image(x, y - 40, assetKey)
            .setScale(scaleX, scaleY)
        container.addLocal(icon)
        // create button
        const buttonPrice = new Button({
            baseParams: {
                scene: this.scene,
            },
            options: {
                //onPress,
                text: `$${price ?? 0}`,
                background: ButtonBackground.Secondary,
                disableInteraction: false,
                height: 100,
                width: 200,
            },
        })
            .setPosition(0, 90)
            .setScale(0.8)
        this.scene.add.existing(buttonPrice)
        container.addLocal(buttonPrice)

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
            const lockText = new BaseText({
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
}

export interface ExtendedCreateItemCardParams extends CreateItemCardParams {
  onPress: (pointer: Phaser.Input.Pointer) => void;
}

export enum CellKey {
  Data = "data",
}
