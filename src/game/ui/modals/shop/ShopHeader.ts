import { BaseAssetKey } from "../../../assets"
import { EventName, TutorialPrepareCloseShopResponsedMessage } from "../../../event-bus"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ContainerLiteBaseConstructorParams } from "../../../types"
import { BaseText } from "../../elements"
import { onGameObjectClick } from "../../utils"
import { ModalName } from "../ModalManager"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import { HIGHLIGH_DEPTH } from "./ShopModal"
import { sleep } from "@/modules/common"
import { SCALE_TIME } from "../../../constants"

export class ShopHeader extends ContainerLite {
    // close button
    private closeButton: Phaser.GameObjects.Image
    private titleShop: Label
    private isTutorial = false
    constructor({
        scene,
        x,
        y,
        width,
        height,
        children,
    }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        // create the background
        const backgroundContainer = this.scene.rexUI.add.container(0, 0)
        const background = this.scene.add.image(0, 0, BaseAssetKey.ModalShopTopbar)
        backgroundContainer.addLocal(background)

        // add the close button
        this.closeButton = this.scene.add
            .image(background.width / 2 - 50, 0, BaseAssetKey.ModalShopX)
            .setOrigin(1, 0.5)
        // add the on click event
        this.closeButton.setInteractive().on("pointerdown", () => {
            onGameObjectClick({
                gameObject: this.closeButton,
                scene: this.scene,
                onClick: () => {
                    //close the modal
                    this.scene.events.emit(EventName.CloseModal, ModalName.Shop)
                    // emit the events related to the tutorial
                    if (this.isTutorial) {
                        this.scene.events.emit(EventName.TutorialCloseShopButtonPressed)
                        this.scene.events.emit(EventName.HidePressHereArrow)
                        this.isTutorial = false
                    }
                    
                },
            })
        })
        backgroundContainer.addLocal(this.closeButton)

        const topDecorator = this.scene.add
            .image(0, -background.height / 2, BaseAssetKey.ModalShopTopDecorator)
            .setOrigin(0.5, 1)
        backgroundContainer.addLocal(topDecorator)
        this.addLocal(backgroundContainer)

        const frame = this.scene.add.image(0, 0, BaseAssetKey.ModalShopTitleShop)

        // create the text
        const text = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text: "Shop",
            },
            options: {
                enableStroke: true,
                fontSize: 64,
            },
        })
        this.scene.add.existing(text)

        // add the text to the label
        this.titleShop = this.scene.rexUI.add.label({
            width: frame.width,
            height: frame.height,
            background: frame,
            text: text,
            align: "center",
        })
        this.addLocal(this.titleShop)

        this.scene.events.once(EventName.TutorialPrepareCloseShop, async () => {
            this.isTutorial = true
            // await until the shop is opened
            await sleep(SCALE_TIME)
            this.closeButton = this.closeButton.setDepth(HIGHLIGH_DEPTH)
            const eventMessage: TutorialPrepareCloseShopResponsedMessage = {
                position: this.closeButton.getCenter(),
            }
            this.scene.events.emit(EventName.TutorialPrepareCloseShopResponsed, eventMessage)
        })
    }
}
