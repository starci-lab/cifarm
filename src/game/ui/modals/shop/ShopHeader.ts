import { ContainerBaseConstructorParams } from "../../../types"
import { BaseText } from "../../elements"
import { BaseAssetKey } from "@/game/assets"
import { onGameObjectClick } from "../../utils"
import { EventName } from "@/game/event-bus"
import { ModalName } from "../ModalManager"

export class ShopHeader extends Phaser.GameObjects.Container {
    // close button
    private closeButton: Phaser.GameObjects.Sprite
    private titleShop: Phaser.GameObjects.Container

    constructor({ scene, x, y }: ContainerBaseConstructorParams) {
        const { width } = scene.game.scale
        super(
            scene,
            x ?? 0,
            y ?? 0,
        )

        // create the background
        const backgroundContainer = this.scene.add.container(0, 0)
        const background = this.scene.add.image(0, 0, BaseAssetKey.ModalShopTopBar)
        backgroundContainer.add(background)
        const topDecorator = this.scene.add
            .image(0, - background.height / 2, BaseAssetKey.ModalShopTopDecorator)
            .setOrigin(0.5, 1)
        backgroundContainer.add(topDecorator)
        this.add(backgroundContainer)

        const frame = this.scene.add.image(
            0,
            0,
            BaseAssetKey.ModalShopTitleShop
        )

        // create the text
        const text = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text: "Shop"
            },
            options: {
                enableStroke: true,
                fontSize: 64,
            },
        })
        this.scene.add.existing(text)

        // add the text to the label
        this.titleShop = this.scene.add.container(0, 0)
        this.titleShop.add(frame)
        this.titleShop.add(text)
        this.add(this.titleShop)

        // add the close button
        this.closeButton = this.scene.add.sprite(width/2 - 30, 0, BaseAssetKey.ModalShopX).setOrigin(1, 0.5)
        // add the on click event
        this.closeButton.setInteractive().on("pointerdown", () => {
            onGameObjectClick({
                gameObject: this.closeButton,
                scene: this.scene,
                onClick: () => {
                    this.scene.events.emit(EventName.CloseModal, ModalName.Shop)
                },
            })
        })
        this.add(this.closeButton)
    }
}
