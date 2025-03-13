import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { BaseSizerBaseConstructorParams } from "../../../types"
import { Background, BBCodeText, getBackgroundContainerSize, ModalBackground, Size, SizeStyle, Text, TextColor } from "../../elements"
import { EventBus, EventName, ModalName, UpdateConfirmSellModalMessage } from "@/game/event-bus"
import { MODAL_DEPTH_2 } from "../ModalManager"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey } from "@/game/assets"

export class ConfirmSellContent extends BaseSizer {
    private background: ModalBackground
    private bbCodeText: BBCodeText | undefined
    private size: Size
    private callback: (() => void) | undefined
    private goldLabel: Label | undefined

    constructor({
        scene,
        height,
        width,
        x,
        y,
        config,
    }: BaseSizerBaseConstructorParams) {
        super(
            scene,
            x,
            y,
            width,
            height,
            config
        )

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
                onXButtonPress: () => {
                    EventBus.emit(EventName.CloseModal, {
                        modalName: ModalName.ConfirmSell,
                    })
                },
                mainButton: {
                    text: "OK",
                    onPress:() => {   
                        EventBus.emit(EventName.CloseModal, {
                            modalName: ModalName.ConfirmSell,
                        })
                        if (this.callback) {
                            this.callback()
                        }
                    }
                }
            }
        })
        this.scene.add.existing(this.background)
        this.addLocal(this.background)

        this.size = getBackgroundContainerSize({
            style: SizeStyle.Container,
            background: Background.Small,
        })

        EventBus.on(EventName.UpdateConfirmSellModal, ({ message, quantity = 0, callback }: UpdateConfirmSellModalMessage) => {
            if (!this.size.width) {
                throw new Error("Size width not found")
            }
            if(this.bbCodeText){
                this.bbCodeText.destroy()
            }
            this.bbCodeText = new BBCodeText({
                baseParams: { scene: this.scene, text: message, x: 0, y: 40 },
                options: {
                    textColor: TextColor.Brown,
                    fontSize: 32,
                    enableWordWrap: true,
                    width: this.size.width - 80,
                }
            }).setOrigin(0.5, 0).setDepth(MODAL_DEPTH_2 + 1)
            this.scene.add.existing(this.bbCodeText)

            if(this.goldLabel){
                this.goldLabel.text = `${quantity}`
            }else{
                this.goldLabel = this.addLabel({
                    iconKey: BaseAssetKey.UICommonIconCoin,
                    amount: `${quantity}`,
                }).setOrigin(0.5, 0.5).setDepth(MODAL_DEPTH_2 + 1).setPosition(0, 40)
                this.addLocal(this.goldLabel)
                this.scene.add.existing(this.goldLabel)
            }

            if (!this.background.container) {
                throw new Error("Background container not found")
            }
            this.background.container.addLocal(this.bbCodeText)
            if (callback) {
                this.callback = callback
            }
        })

        this.layout()
    }

    private addLabel({ iconKey, amount, scale = 1 }: AddLabelParams) {
        const background = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UITopbarResource
        )
        const iconContainer = this.scene.add.container(0, 0)
        const icon = this.scene.add.image(-90, 0, iconKey).setScale(scale)
        iconContainer.add(icon)
        const amountText = new Text({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text: amount.toString(),
            },
            options: {
                fontSize: 24,
                textColor: TextColor.White,
            },
        })
        this.scene.add.existing(amountText)
        const label = this.scene.rexUI.add.label({
            background,
            icon: iconContainer,
            text: amountText,
            width: background.width,
            height: background.height,
            space: {
                icon: 40,
                top: -2
            },
        })
        return label
    }
}

interface AddLabelParams {
  iconKey: BaseAssetKey;
  scale?: number;
  amount: string;
}
