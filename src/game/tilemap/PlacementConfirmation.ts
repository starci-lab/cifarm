import { SizerBaseConstructorParams } from "@/game/types"
import { EventBus, EventName, UpdatePlacementConfirmationMessage } from "@/game/event-bus"
import { BaseAssetKey } from "@/game/assets"
import { Buttons, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"

export class PlacementConfirmation extends Buttons {
    private yesButton: Sizer
    private noButton: Sizer
    private onCancel: (() => void) | undefined
    private onConfirm: (() => void) | undefined

    constructor({
        scene,
        config,
    }: SizerBaseConstructorParams) {
        super(scene, config)

        this.yesButton = scene.rexUI.add.sizer()
            .addBackground(this.scene.add.image(0, 0, BaseAssetKey.UICommonCheckRound))

        this.noButton = scene.rexUI.add.sizer()
            .addBackground(this.scene.add.image(0, 0, BaseAssetKey.UICommonXRound))

        EventBus.on(EventName.UpdatePlacementConfirmation, (
            { isPlacementValid = true, onCancel, onConfirm }: UpdatePlacementConfirmationMessage
        ) => {
            this.setYesButtonVisible(isPlacementValid)
            if (onCancel) {
                this.onCancel = onCancel
            }
            if (onConfirm) {
                this.onConfirm = onConfirm
            }
        })

        this.addButton(this.yesButton)
        this.addButton(this.noButton)

        this.on("button.click", (button: Sizer) => {
            if (button === this.yesButton) {
                if (this.onConfirm) {
                    this.onConfirm()
                }
            } else if (button === this.noButton) {
                if (this.onCancel) {
                    this.onCancel()
                }
            }
        })
        
        this.layout()
    }

    public setYesButtonVisible(visible: boolean) {
        this.yesButton.setVisible(visible).setActive(visible)
        this.layout()
    }
}
