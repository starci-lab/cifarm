import { BaseAssetKey } from "@/game/assets"
import { EventName } from "@/game/event-bus"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ContainerLiteBaseConstructorParams } from "../../../types"
import { BaseText } from "../../elements"
import { getScreenRightX, onGameObjectClick } from "../../utils"
import { ModalName } from "../ModalManager"

// own depth for the shop header
export const HIGHLIGHT_DEPTH = 2

export class ShopHeader extends ContainerLite {
    // close button
    private closeButton: Phaser.GameObjects.Image
    private titleShop: Phaser.GameObjects.Container

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(
            scene,
            x,
            y,
            width,
            height,
            children
        )

        // create the background
        const backgroundContainer = this.scene.add.container(0, 0)
        const background = this.scene.add.image(0, 0, BaseAssetKey.ModalShopTopbar)
        backgroundContainer.add(background)
        const topDecorator = this.scene.add
            .image(0, - background.height / 2, BaseAssetKey.ModalShopTopDecorator)
            .setOrigin(0.5, 1)
        backgroundContainer.add(topDecorator)
        this.addLocal(backgroundContainer)

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
        this.addLocal(this.titleShop)

        // add the close button
        this.closeButton = this.scene.add.image(getScreenRightX(this.scene)/2 - 50, 0, BaseAssetKey.ModalShopX).setOrigin(1, 0.5)
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
        this.addLocal(this.closeButton)

        this.scene.events.once(EventName.TutorialCloseShop, () => {
            this.closeButton.setDepth(HIGHLIGHT_DEPTH)  
        })
    }
}
