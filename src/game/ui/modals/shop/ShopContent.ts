import {
    OverlapSizer,
    ScrollablePanel,
} from "phaser3-rex-plugins/templates/ui/ui-components"
import { ShopTab } from "./types"
import { BaseAssetKey, cropAssetMap, getCropSeedAssetKey } from "@/game/assets"
import { adjustTextMinLength } from "../../utils"
import { StrokeColor, BaseText, TextColor } from "../../elements"
import { SizerBaseConstructorParams } from "../../../types"
import { CropId } from "@/modules/entities"
import { UISizer } from "../../UISizer"
import { onAnimatedClick } from "../../utils"

export class ShopContentSizer extends UISizer {
    // list of items
    private scrollablePanelMap: Partial<Record<ShopTab, ScrollablePanel>> = {}
    // current shop tab
    private currentShopTab: ShopTab | undefined

    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)

        this.createScrollablePanels()
    }

    //create seed scrollable panel
    private createScrollablePanels() {
    //list of item cards
        const itemCards: Array<OverlapSizer> = []
        for (const cropId of Object.values(CropId)) {
            // get the image
            const itemCard = this.createItemCard({
                assetKey: getCropSeedAssetKey(cropId),
                title: cropAssetMap[cropId].name,
                onClick: () => {
                    console.log("Clicked on crop", cropId)
                }
            })
            itemCards.push(itemCard)
            // add the item card to the scrollable panel
        }
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
                x: this.x,
                y: this.y + 200,
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
            .layout()

        // add the scrollable panel to the map
        this.scrollablePanelMap[ShopTab.Seeds] = scrollablePanel
        this.add(scrollablePanel)
        return scrollablePanel
    }

    //create the item card
    private createItemCard({
        assetKey,
        title,
        iconOffset,
        price,
        onClick
    }: CreateItemCardParams) {
    // get the icon offset
        const { x = 0, y = 0 } = iconOffset || {}

        // create the components
        const shopItemCardImage = this.scene.add.image(0, 0, BaseAssetKey.ModalShopItemCard)

        const cardTitleImage = this.scene.add.image(0, 0, BaseAssetKey.ModalShopCardTitle)

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
            BaseAssetKey.ModalShopAvatarShop
        )
        iconContainer.add(avatarShop)
        const icon = this.scene.add.image(x, y, assetKey).setPosition(x, y)
        iconContainer.add(icon)
        // create the icon label
        const iconLabel = this.scene.rexUI.add
            .label({
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
        const buttonPriceImage = this.scene.add.image(0, 0, BaseAssetKey.ModalShopButtonPrice)
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
            .setInteractive()
            
        // handle on click event
        if (onClick) {
            button.on("pointerdown", () => {
                onAnimatedClick({
                    gameObject: button,
                    onClick,
                    scene: this.scene,
                })
            })
        }

        //create the item card sizer
        return this.scene.rexUI.add
            .overlapSizer({
                width: shopItemCardImage.width,
                height: shopItemCardImage.height,
            })
            .addBackground(shopItemCardImage)
            .add(
                this.scene.rexUI.add.sizer({
                    space: {
                        item: 20,
                    }
                })
                    .add(iconLabel, {
                        align: "left-top",
                        expand: false,
                    })
                    .add(titleLabel, {
                        align: "left-top",
                        expand: false,
                    })
            )
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
  price?: string;
  // on click event
  onClick?: () => void;
}

export interface IconOffsets {
  x?: number;
  y?: number;
}
