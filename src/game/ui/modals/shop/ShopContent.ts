import {
    Label,
    ScrollablePanel,
    Sizer,
} from "phaser3-rex-plugins/templates/ui/ui-components"
import { ShopTab } from "./types"
import {
    AnimalAge,
    animalAssetMap,
    BaseAssetKey,
    buildingAssetMap,
    cropAssetMap,
} from "../../../assets"
import {
    adjustTextMinLength,
    getScreenBottomY,
    getScreenCenterX,
} from "../../utils"
import { StrokeColor, BaseText, TextColor } from "../../elements"
import { CacheKey, BaseSizerBaseConstructorParams } from "../../../types"
import {
    AnimalSchema,
    BuildingSchema,
    CropSchema,
    CropId,
    InventorySchema,
    PlacedItemType,
    DefaultInfo,
} from "@/modules/entities"
import { onGameObjectPress } from "../../utils"
import { defaultShopTab } from "./ShopTabs"
import {
    CloseModalMessage,
    EventBus,
    EventName,
    ModalName,
    PlacedInprogressMessage,
    ShowPressHereArrowMessage,
} from "../../../event-bus"
import { BuySeedsRequest } from "@/modules/axios"
import { calculateUiDepth, UILayer } from "../../../layers"
import { CONTENT_DEPTH, HIGHLIGH_DEPTH } from "./ShopModal"
import { getFirstSeedInventory } from "../../../queries"
import { sleep } from "@/modules/common"
import { SCALE_TIME } from "../../../constants"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { IPaginatedResponse } from "@/modules/apollo"

// own depth for the shop content
export const PLAY_BUY_CROP_ANIMATION_DURATION = 2000

export class ShopContent extends BaseSizer {
    // list of items
    private scrollablePanelMap: Partial<Record<ShopTab, ScrollablePanel>> = {}

    // data
    private animals: Array<AnimalSchema> = []
    private crops: Array<CropSchema> = []
    private buildings: Array<BuildingSchema> = []

    //default
    private defaultItemCard: Sizer | undefined
    private defaultSeedButton: Label | undefined
    // previous selected tab
    private selectedShopTab: ShopTab = defaultShopTab
    private inventories: Array<InventorySchema> = []
    private defaultInfo: DefaultInfo

    constructor({
        scene,
        height,
        width,
        x,
        y,
        config,
    }: BaseSizerBaseConstructorParams) {
        super(scene, height, width, x, y, config)

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

        const { data } = this.scene.cache.obj.get(CacheKey.Inventories) as IPaginatedResponse<InventorySchema>
        this.inventories = data
        this.defaultInfo = this.scene.cache.obj.get(CacheKey.DefaultInfo)

        // create the scrollable panel
        for (const shopTab of Object.values(ShopTab)) {
            this.createScrollablePanel(shopTab)
        }
        // set the default seed button position
        this.setDefaultSeedButton()

        //this.layout()
        // listen for the select shop tab event
        this.scene.events.on(EventName.SelectShopTab, (shopTab: ShopTab) => {
            this.onShopTabSelected(shopTab)
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
            // disable the default scroller
            this.disableDefaultScroller()

            const inventory = getFirstSeedInventory({
                cropId: this.defaultInfo.defaultCropId,
                scene: this.scene,
                inventories: this.inventories,
            })
            if (inventory && inventory.quantity > this.defaultInfo.defaultSeedQuantity) {
                this.scene.events.emit(EventName.TutorialPrepareCloseShop)
                return
            }

            this.defaultItemCard.setDepth(HIGHLIGH_DEPTH)

            const eventMessage: ShowPressHereArrowMessage = {
                originPosition: {
                    x: this.defaultSeedButton.x + 60,
                    y: this.defaultSeedButton.y + 60,
                },
                targetPosition: {
                    x: this.defaultSeedButton.x + 40,
                    y: this.defaultSeedButton.y + 40,
                }
            }
            this.scene.events.emit(EventName.ShowPressHereArrow, eventMessage)
        })

        EventBus.on(EventName.BuySeedsCompleted, () => {
            // refresh user & inventories
            EventBus.emit(EventName.RefreshUser)
            EventBus.emit(EventName.RefreshInventories)
        })
    }

    private disableDefaultScroller() {
        const defaultScrollablePanel =
      this.scrollablePanelMap[this.selectedShopTab]
        if (!defaultScrollablePanel) {
            throw new Error("Default scrollable panel is not found")
        }
        defaultScrollablePanel.setMouseWheelScrollerEnable(false)
        defaultScrollablePanel.setScrollerEnable(false)
        defaultScrollablePanel.setSliderEnable(false)
    }

    private enableDefaultScroller() {
        const defaultScrollablePanel =
      this.scrollablePanelMap[this.selectedShopTab]
        if (!defaultScrollablePanel) {
            throw new Error("Default scrollable panel is not found")
        }
        defaultScrollablePanel.setMouseWheelScrollerEnable(true)
        defaultScrollablePanel.setScrollerEnable(true)
        defaultScrollablePanel.setSliderEnable(true)
    }

    private setDefaultSeedButton() {
    //check if current tab is not the default tab
        if (this.selectedShopTab !== defaultShopTab) {
            throw new Error("Selected tab is not the default tab")
        }
        // get the first item card
        const scrollablePanel = this.scrollablePanelMap[this.selectedShopTab]
        if (!scrollablePanel) {
            throw new Error("Panel map is not found")
        }
        const panel = scrollablePanel.getElement("panel") as Sizer
        if (!panel) {
            throw new Error("Panel is not found")
        }
        this.defaultItemCard = panel.getChildren()[0] as Sizer
        if (!this.defaultItemCard) {
            throw new Error("Default item card is not found")
        }
        // get the click button
        this.defaultSeedButton = this.defaultItemCard.getChildren()[3] as Label
    }

    // handle the selected shop tab
    private onShopTabSelected(shopTab: ShopTab) {
    // hide the previous scrollable panel
        const previousScrollablePanel =
      this.scrollablePanelMap[this.selectedShopTab]
        if (!previousScrollablePanel) {
            throw new Error("Previous selected tab is not found")
        }
        previousScrollablePanel.hide()

        // show the selected scrollable panel
        const scrollablePanel = this.scrollablePanelMap[shopTab]
        if (!scrollablePanel) {
            throw new Error("Selected tab is not found")
        }
        scrollablePanel.show()
        // set the selected tab
        this.selectedShopTab = shopTab
    }

    private createScrollablePanel(shopTab: ShopTab) {
    // get the item cards
        const itemCards = this.createItemCards(shopTab)
        // create a sizer to hold all the item cards
        const itemCardsSizer = this.scene.rexUI.add
            .sizer({
                orientation: "y",
                space: { item: 40 },
            })
            .addMultiple(itemCards)

        // create the scrollable panel
        const scrollablePanel = this.scene.rexUI.add
            .scrollablePanel({
                x: getScreenCenterX(this.scene),
                y: getScreenBottomY(this.scene) - 250,
                originY: 1,
                width: 1000,
                height: 1000,
                scrollMode: "y",
                panel: {
                    child: itemCardsSizer,
                    mask: {
                        padding: 1,
                    },
                },
                mouseWheelScroller: {
                    focus: false,
                    speed: 2,
                },
            })      
        // add the scrollable panel to the map and the sizer
        this.add(scrollablePanel)
        scrollablePanel.layout()
        this.scrollablePanelMap[shopTab] = scrollablePanel
        // hide the scrollable panel if it is not the default shop tab
        if (shopTab !== this.selectedShopTab) {
            scrollablePanel.hide()
        }
    }

    // method to play the buy animation
    private playBuySeedAnimation(id: CropId, pointer: Phaser.Input.Pointer) {
        const assetKey = cropAssetMap[id as CropId].seed.textureConfig.key
        // create the sizer that will has the + 1 asset
        const flyItem = this.scene.rexUI.add
            .sizer({
                orientation: "x",
                space: {
                    item: 20,
                },
            })
            .add(
                this.scene.add.existing(
                    new BaseText({
                        baseParams: {
                            scene: this.scene,
                            text: "+1",
                            x: 0,
                            y: 0,
                        },
                        options: {
                            enableStroke: true,
                            fontSize: 64,
                        },
                    })
                )
            )
            .add(this.scene.add.image(0, 0, assetKey))
            .layout()

        // set the position of the fly item
        flyItem.setDepth(calculateUiDepth({
            layer: UILayer.Overlay
        })).setPosition(pointer.x, pointer.y)
        // Play the animation with fading effect before destruction
        this.scene.tweens.add({
            targets: flyItem,
            y: flyItem.y - 200,
            alpha: 0, // Set alpha to 0 for fading effect
            duration: PLAY_BUY_CROP_ANIMATION_DURATION,
            onComplete: () => {
                flyItem.destroy()
            },
        })
    }

    //create item cards based on the shop tab
    private createItemCards(shopTab: ShopTab = defaultShopTab) {
    //list of item cards
        const itemCards: Array<Sizer> = []
        switch (shopTab) {
        case ShopTab.Seeds: {
            for (const { displayId, price } of this.crops) {
                // get the image
                const itemCard = this.createItemCard({
                    assetKey: cropAssetMap[displayId].seed.textureConfig.key,
                    title: cropAssetMap[displayId].name,
                    onPress: (pointer: Phaser.Input.Pointer) => {
                        this.playBuySeedAnimation(displayId, pointer)
                        const eventMessage: BuySeedsRequest = {
                            cropId: displayId,
                            quantity: 1,
                        }
                        // send request to buy seeds
                        EventBus.emit(EventName.RequestBuySeeds, eventMessage)
                        if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                            this.defaultItemCard?.setDepth(CONTENT_DEPTH)
                            this.scene.events.emit(EventName.TutorialPrepareCloseShop)
                        }
                    },
                    price,
                })
                itemCards.push(itemCard)
                // add the item card to the scrollable panel
            }
            break
        }
        case ShopTab.Animals: {
            for (const { displayId, price } of this.animals) {
                // get the image
                const itemCard = this.createItemCard({
                    assetKey: animalAssetMap[displayId].ages[AnimalAge.Baby].textureConfig.key,
                    title: animalAssetMap[displayId].name,
                    onPress: () => {
                        console.log("Clicked on animal", displayId)
                    },
                    price,
                })
                itemCards.push(itemCard)
                // add the item card to the scrollable panel
            }
            break
        }
        case ShopTab.Buildings: {
            for (const { displayId, price } of this.buildings) {
                // get the image
                const itemCard = this.createItemCard({
                    assetKey: buildingAssetMap[displayId].textureConfig.key,
                    title: displayId,
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
                itemCards.push(itemCard)
                // add the item card to the scrollable panel
            }
            break
        }
        case ShopTab.Decorations:
            for (const { displayId, price } of this.buildings) {
                // get the image
                const itemCard = this.createItemCard({
                    assetKey: buildingAssetMap[displayId].textureConfig.key,
                    title: buildingAssetMap[displayId].name,
                    onPress: () => {
                        console.log("Clicked on building", displayId)
                    },
                    price,
                })
                itemCards.push(itemCard)
                // add the item card to the scrollable panel
            }
            break
        case ShopTab.Others:
            for (const { displayId, price } of this.buildings) {
                // get the image
                const itemCard = this.createItemCard({
                    assetKey: buildingAssetMap[displayId].textureConfig.key,
                    title: displayId,
                    onPress: () => {
                        console.log("Clicked on building", displayId)
                    },
                    price,
                })
                itemCards.push(itemCard)
                // add the item card to the scrollable panel
            }
            break
        case ShopTab.Trees:
            for (const { displayId, price } of this.buildings) {
                // get the image
                const itemCard = this.createItemCard({
                    assetKey: buildingAssetMap[displayId].textureConfig.key,
                    title: displayId,
                    onPress: () => {
                        console.log("Clicked on building", displayId)
                    },
                    price,
                })
                itemCards.push(itemCard)
                // add the item card to the scrollable panel
            }
            break
        }
        return itemCards
    }

    //create the item card
    private createItemCard({
        assetKey,
        title,
        iconOffset,
        price,
        onPress,
        scaleX = 1,
        scaleY = 1,
    }: CreateItemCardParams) {
    // get the icon offset
        const { x = 0, y = 0 } = iconOffset || {}

        // create the components
        const shopItemCardImage = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalShopItemCard
        )

        const cardTitleImage = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalShopCardTitle
        )

        const titleText = new BaseText({
            baseParams: {
                scene: this.scene,
                text: adjustTextMinLength(title, 20),
                x: 0,
                y: 0,
            },
            options: {
                enableStroke: true,
                textColor: TextColor.White,
                strokeColor: StrokeColor.Black,
                fontSize: 24,
                strokeThickness: 3,
                enableWordWrap: true,
                wordWrapWidth: 400,
            },
        })
        this.scene.add.existing(titleText)

        // create the icon sizer
        const iconContainer = this.scene.add.container(0, 0)
        const avatarShop = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalShopAvatarShop
        )
        iconContainer.add(avatarShop)

        // resize the icon, the icon is resized based on the scale
        const icon = this.scene.add.image(x, y, assetKey).setScale(scaleX, scaleY)
        iconContainer.add(icon)
        // create the icon sizer
        const iconSizer = this.scene.rexUI.add
            .sizer({
                width: avatarShop.width,
                height: avatarShop.height,
            })
            .addBackground(iconContainer)

        // create the title
        const titleLabel = this.scene.rexUI.add
            .label({
                x: 0,
                y: 0,
                background: cardTitleImage,
                text: titleText,
            })
            .setInnerPadding({
                left: 20,
                right: 20,
                top: 10,
                bottom: 10,
            })

        // create button
        const buttonPriceImage = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalShopButtonPrice
        )
        const priceText = new BaseText({
            baseParams: {
                scene: this.scene,
                text: `$${price ?? 0}`,
                x: 0,
                y: 0,
            },
            options: {
                enableStroke: true,
                textColor: TextColor.White,
                strokeColor: StrokeColor.Black,
                fontSize: 48,
                strokeThickness: 3,
            },
        })
        this.scene.add.existing(priceText)
        // button
        const button = this.scene.rexUI.add
            .label({
                width: buttonPriceImage.width,
                height: buttonPriceImage.height,
                background: buttonPriceImage,
                text: priceText,
                align: "center",
            })
            .layout()
            .setInteractive()
        // handle on click event
        if (onPress) {
            button.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
                onGameObjectPress({
                    gameObject: button,
                    onPress: () => {
                        onPress(pointer)
                    },
                    scene: this.scene,
                    disableInteraction: false
                })
            })
        }

        //create the item card sizer
        return this.scene.rexUI.add
            .sizer({
                width: shopItemCardImage.width,
                height: shopItemCardImage.height,
            })
            .addBackground(shopItemCardImage)
            .add(
                this.scene.rexUI.add
                    .sizer({
                        space: {
                            item: 20,
                        },
                    })
                    .add(iconSizer, {
                        align: "left-top",
                        expand: false,
                    })
                    .add(titleLabel, {
                        align: "left-top",
                        expand: false,
                    })
            )
            .addSpace()
            .add(button, {
                align: "right-bottom",
                expand: false,
            })
            .setInnerPadding({
                left: 30,
                right: 45,
                top: 30,
                bottom: 30,
            })
    }
}

export interface CreateItemCardParams {
  // the asset key of the item card
  assetKey: string;
  // title of the item
  title: string;
  // offsets of the icon
  iconOffset?: IconOffsets;
  // price
  price?: number;
  // on click event
  onPress?: (pointer: Phaser.Input.Pointer) => void;
  // scale X
  scaleX?: number;
  // scale Y
  scaleY?: number;
}

export interface IconOffsets {
  x?: number;
  y?: number;
}
