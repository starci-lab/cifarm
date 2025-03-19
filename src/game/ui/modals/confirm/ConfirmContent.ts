import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { BaseSizerBaseConstructorParams } from "../../../types"
import {
    Background,
    BBCodeText,
    getBackgroundContainerSize,
    ModalBackground,
    Size,
    SizeStyle,
    TextColor,
} from "../../elements"
import {
    EventBus,
    EventName,
    ModalName,
    UpdateConfirmModalMessage,
} from "@/game/event-bus"
import { MODAL_DEPTH_2 } from "../ModalManager"

export class ConfirmContent extends BaseSizer {
    private background: ModalBackground
    private bbCodeText: BBCodeText | undefined
    private size: Size

    private callback: (() => void) | undefined
    private secondaryCallback:  (() => void) | undefined
    constructor({
        scene,
        height,
        width,
        x,
        y,
        config,
    }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, width, height, config)

        this.background = new ModalBackground({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                width,
                height,
            },
            options: {
                container: {
                    showContainer: true,
                    showWrapperContainer: false,
                },
                align: "center",
                background: Background.Small,
                title: "Confirm",
                hideXButton: true,
                mainButton: {
                    text: "OK",
                    onPress: () => {
                        EventBus.emit(EventName.CloseModal, {
                            modalName: ModalName.Confirm,
                        })
                        if (this.callback) {
                            this.callback()
                        }
                    },
                },
                secondaryButton: {
                    text: "Cancel",
                    onPress: () => {
                        EventBus.emit(EventName.CloseModal, {
                            modalName: ModalName.Confirm,
                        })
                        if (this.secondaryCallback) {
                            this.secondaryCallback()
                        }
                    },
                }
            },
        })
        this.scene.add.existing(this.background)
        this.addLocal(this.background)

        this.size = getBackgroundContainerSize({
            style: SizeStyle.Container,
            background: Background.Small,
        })

        EventBus.on(
            EventName.UpdateConfirmModal,
            ({ message, callback, secondaryCallback }: UpdateConfirmModalMessage) => {
                if (!this.size.width) {
                    throw new Error("Size width not found")
                }
                if (this.bbCodeText) {
                    if (!this.background.container) {
                        throw new Error("Background container not found")
                    }
                    this.background.container?.remove(this.bbCodeText)
                }
                this.bbCodeText = new BBCodeText({
                    baseParams: { scene: this.scene, text: message, x: 0, y: 40 },
                    options: {
                        textColor: TextColor.Brown,
                        fontSize: 32,
                        enableWordWrap: true,
                        width: this.size.width - 80,
                    },
                })
                    .setOrigin(0.5, 0)
                    .setDepth(MODAL_DEPTH_2 + 1)
                this.scene.add.existing(this.bbCodeText)
                if (!this.background.container) {
                    throw new Error("Background container not found")
                }
                this.background.container.addLocal(this.bbCodeText)

                if (callback) {
                    this.callback = callback
                }

                if (secondaryCallback) {
                    this.secondaryCallback = secondaryCallback
                }
            }
        )
        this.layout()
    }
}
