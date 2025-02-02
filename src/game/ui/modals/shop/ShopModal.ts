import { BaseAssetKey } from "@/game/assets"
import { BLACK_COLOR, } from "@/game/constants"
import { ShopTabs } from "./ShopTabs"
import { ContainerBaseConstructorParams } from "@/game/types"
import { ShopContentSizer } from "./ShopContent"
import { BaseText } from "../../elements"
import { onAnimatedClick } from "../../utils"
import { EventName } from "@/game/event-bus"
import { IModal } from "../../../interfaces"

export class ShopModal extends Phaser.GameObjects.Container implements IModal {
    private wall: Phaser.GameObjects.Image | undefined
    private topDecorator: Phaser.GameObjects.Image | undefined
    private topBar: Phaser.GameObjects.Image | undefined
    private shadow: Phaser.GameObjects.Rectangle | undefined
    private titleShop: Phaser.GameObjects.Image | undefined
    private titleShopText: Phaser.GameObjects.Text | undefined
    private bottomBar: Phaser.GameObjects.Image | undefined
    private bottomDecorator: Phaser.GameObjects.Image | undefined
    private shopTabs: ShopTabs
    private shopContentSizer: ShopContentSizer
    private closeButton: Phaser.GameObjects.Sprite | undefined

    constructor({ scene, x, y }: ContainerBaseConstructorParams) {
        super(scene, x, y)

        // add the layouts
        const { width, height } = this.scene.game.scale

        this.wall = scene.add
            .image(0, 200, BaseAssetKey.ModalShopWall)
            .setScale(1.1)
        this.add(this.wall)

        // draw the shop tabs
        this.shopTabs = new ShopTabs({
            scene,
            x: 0,
            y: -580,
        }).setPosition(-width / 2 + 20, -580)
        this.add(this.shopTabs)

        // draw the scrollable panel
        this.shopContentSizer = new ShopContentSizer({
            scene,
        }).hide()

        this.topDecorator = scene.add
            .image(0, -580, BaseAssetKey.ModalShopTopDecorator)
            .setOrigin(0.5, 1)
        this.add(this.topDecorator)

        this.shadow = scene.add
            .rectangle(0, -500, width, 160, BLACK_COLOR, 0.5)
            .setOrigin(0.5, 0)
        this.add(this.shadow)

        //this.add(shopTabs)
        this.topBar = scene.add.image(0, -500, BaseAssetKey.ModalShopTopBar)
        this.add(this.topBar)

        this.titleShop = scene.add.image(0, -500, BaseAssetKey.ModalShopTitleShop)
        this.add(this.titleShop)

        this.titleShopText = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: -500,
                text: "Shop",
            },
            options: {
                enableStroke: true,
                fontSize: 64,
            }
        })
        this.scene.add.existing(this.titleShopText)
        this.add(this.titleShopText)

        this.bottomBar = scene.add
            .image(0, height / 2, BaseAssetKey.ModalShopBottomBar)
            .setOrigin(0.5, 1)
        this.add(this.bottomBar)

        this.bottomDecorator = scene.add
            .image(0, height / 2, BaseAssetKey.ModalShopBottomDecorator)
            .setOrigin(0.5, 1)
        this.add(this.bottomDecorator)

        this.closeButton = scene.add.sprite(width/2 - 50, -500, BaseAssetKey.ModalShopX).setOrigin(1, 0.5)
        if (!this.closeButton) {
            throw new Error("Close button not found")
        }
        this.closeButton.setInteractive()
        this.closeButton.on("pointerdown", () => {
            onAnimatedClick({
                gameObject: this.closeButton as Phaser.GameObjects.GameObject,
                onClick: () => {
                    // hide the content
                    this.hideContent()
                    // emit the event
                    this.scene.events.emit(EventName.ModalClosed)
                },
                scene: this.scene,
            })
        })
        this.add(this.closeButton)
    }

    public showContent() {
        this.shopContentSizer.setDepth(1).show()
    }

    public hideContent() {
        this.shopContentSizer.hide()
    }
}
