import {
    ScrollablePanel,
    Sizer,
} from "phaser3-rex-plugins/templates/ui/ui-components"
import { ShopTab } from "./types"
import { BaseAssetKey } from "@/game/assets"
import { adjustTextMinLength } from "../../utils"
import { NinePatch3x3, StrokeColor, BaseText, TextColor } from "../../elements"
import { ContainerBaseConstructorParams } from "../../../types"

export class ShopItemScrollablePanel extends Phaser.GameObjects.Container {
    
    private scrollablePanel: ScrollablePanel
    private items: Partial<Record<ShopTab, Array<Sizer>>> = {}

    constructor({ scene, x, y}: ContainerBaseConstructorParams) {
        super(scene, x, y)
        // create the item container

        // create the scrollable panel
        this.scrollablePanel = new ScrollablePanel(scene, {
            width: 800,
            height: 600,
            scrollMode: "y",
            panel: {
                child: this.createItemCard({
                    assetKey: BaseAssetKey.IconNFTMarketplace,
                    title: "Hentaizzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
                    onClick: () => {
                        console.log("Test")
                    },
                    iconOffset: {
                        y: 0,
                    },
                }),
                mask: {
                    padding: 1,
                },
            },
        })
        this.add(this.scrollablePanel)
    }

    //create the item card
    private createItemCard({
        assetKey,
        title,
        iconOffset,
    }: CreateItemCardParams) {
    // get the icon offset
        const { x = 0, y = 0 } = iconOffset || {}
        // create the icon container
        const iconContainer = this.scene.add.container(0, 0)
        const icon = this.scene.add.image(x, y, assetKey).setPosition(x, y)
        iconContainer.add(icon)
        iconContainer.setSize(100, 100)

        // create the title
        const itemTitle = this.scene.rexUI.add
            .label({
                text: this.scene.add.existing(
                    new BaseText({
                        baseParams: {
                            scene: this.scene,
                            text: adjustTextMinLength(title, 20),
                            x: 0,
                            y: 0
                        },
                        options: {
                            enableStroke: true,
                            textColor: TextColor.White,
                            strokeColor: StrokeColor.Black,
                            fontSize: 28,
                            strokeThickness: 3,
                        },
                    })
                ),
                background: this.scene.add.existing(
                    new NinePatch3x3( {
                        baseParams: {
                            scene: this.scene,
                            config: {
                                x: 0,
                                y: 0,
                            }
                        },
                        options: {
                            assetKey: BaseAssetKey.ModalShopCardTitle,
                            leftWidth: 30,
                            rightWidth: 100,
                            topHeight: 30,
                            bottomHeight: 35,
                        }
                    })
                ),
            })
            .setInnerPadding({
                left: 20,
                right: 20,
                top: 10,
                bottom: 10,
            })

        // create the icon frame

        const iconFrame = this.scene.rexUI.add
            .sizer({
                orientation: "x",
                space: { item: 10 },
            })
            .setInnerPadding(20)
            .addBackground(
                this.scene.add.image(0, 0, BaseAssetKey.ModalShopAvatarShop)
            )
            .add(iconContainer)
            .layout()

        // create the item container
        const item = this.scene.rexUI.add
            .sizer({
                orientation: "x",
                space: { item: 20 },
            })
            .add(iconFrame, {
                align: "top",
            })
            .add(itemTitle, {
                align: "top",
            })
            .setInnerPadding(30)
            .addBackground(this.scene.add.existing(
                new NinePatch3x3({
                    baseParams: {
                        scene: this.scene,
                        config: {
                            x: 0,
                            y: 0,
                        }
                    },
                    options: {
                        assetKey: BaseAssetKey.ModalShopItemCard,
                        leftWidth: 30,
                        rightWidth: 40,
                        topHeight: 30,
                        bottomHeight: 100,
                    }
                })))
            .layout()

        return item
    }

    // layout the scrollable panel
    public layout(): this {
        this.scrollablePanel.layout()
        return this
    }

    private tryCreateItems(tab: ShopTab = ShopTab.Seeds) {
    // already created, skip
        if (this.items[tab]) {
            return
        }

    // create the item container
    }
}

export interface CreateItemCardParams {
  // the asset key of the item card
  assetKey: string;
  // on click callback
  onClick?: () => void;
  // title of the item
  title: string;
  // offsets of the icon
  iconOffset?: IconOffsets;
}

export interface IconOffsets {
  x?: number;
  y?: number;
}
