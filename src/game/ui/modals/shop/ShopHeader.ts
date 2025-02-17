import { BaseAssetKey } from "../../../assets"
import { CloseModalMessage, EventBus, EventName, ModalName, ShowPressHereArrowMessage } from "../../../event-bus"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { CacheKey, ContainerLiteBaseConstructorParams } from "../../../types"
import { BaseText } from "../../elements"
import { onGameObjectPress } from "../../utils"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import { HIGHLIGH_DEPTH } from "./ShopModal"
import { sleep } from "@/modules/common"
import { SCALE_TIME } from "../../../constants"

export class ShopHeader extends ContainerLite {
    // close button
    private closeButton: Phaser.GameObjects.Image
    private titleShop: Label
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
        const background = this.scene.add.image(0, 0, BaseAssetKey.UIModalShopTopbar)
        backgroundContainer.addLocal(background)

        // add the close button
        this.closeButton = this.scene.add
            .image(background.width / 2 - 50, 0, BaseAssetKey.UIModalShopX)
            .setOrigin(1, 0.5)
        // add the on click event
        this.closeButton.setInteractive().on("pointerdown", () => {
            onGameObjectPress({
                gameObject: this.closeButton,
                scene: this.scene,
                onPress: () => {
                    // close the modal
                    const eventMessage: CloseModalMessage = {
                        modalName: ModalName.Shop,
                    }
                    EventBus.emit(EventName.CloseModal, eventMessage)
                    // emit the events related to the tutorial
                    if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                        this.scene.events.emit(EventName.TutorialCloseShopButtonPressed)
                        this.scene.events.emit(EventName.HidePressHereArrow)
                    }
                },
            })
        })
        backgroundContainer.addLocal(this.closeButton)

        const topDecorator = this.scene.add
            .image(0, -background.height / 2, BaseAssetKey.UIModalShopTopDecorator)
            .setOrigin(0.5, 1)
        backgroundContainer.addLocal(topDecorator)
        this.addLocal(backgroundContainer)

        const frame = this.scene.add.image(0, 0, BaseAssetKey.UIModalShopTitleShop)

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
            // await until the shop is opened
            await sleep(SCALE_TIME)
            this.closeButton = this.closeButton.setDepth(HIGHLIGH_DEPTH)
            const { x, y } = this.closeButton.getCenter()
            const eventMessage: ShowPressHereArrowMessage = {
                rotation: 45,
                originPosition: { x: x - 60, y: y + 60 },
                targetPosition: { x: x - 40, y: y + 40 },
            }
            this.scene.events.emit(EventName.ShowPressHereArrow, eventMessage)
        })
    }
}
