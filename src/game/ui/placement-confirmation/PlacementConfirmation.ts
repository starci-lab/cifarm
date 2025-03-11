import { BaseSizerBaseConstructorParams } from "@/game/types"
import { getScreenCenterX, getScreenCenterY } from "../utils"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { EventBus, EventName, UpdatePlacementConfirmationMessage } from "@/game/event-bus"
import { BaseAssetKey } from "@/game/assets"

export class PlacementConfirmation extends BaseSizer {
    private container: ContainerLite
    private buttonContainer: ContainerLite
    private yesButton: Phaser.GameObjects.Image
    private noButton: Phaser.GameObjects.Image
    private onCancel: () => void = () => { }
    private onConfirm: () => void = () => { }

    constructor({
        scene,
        x,
        y,
        height,
        width,
        config,
    }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.container = this.scene.rexUI.add.container(
            getScreenCenterX(this.scene),
            getScreenCenterY(this.scene)
        )
        this.add(this.container)

        const placementConfirmationContainer = new ContainerLite(scene, x, y, width, height)

        // Prevent event propagation inside placementConfirmation
        const placementConfirmationHitbox = scene.add.rectangle(0, 0, width, height, 0x000000, 0).setInteractive()
        placementConfirmationHitbox.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            pointer.event.stopPropagation()
            pointer.event.preventDefault()
            pointer.event.stopImmediatePropagation()
        })

        this.yesButton = scene.add
            .image(-65, 30, BaseAssetKey.UICommonCheckRound)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", (pointer: Phaser.Input.Pointer) => {
                pointer.event.stopPropagation()
                pointer.event.preventDefault()
                pointer.event.stopImmediatePropagation()
                this.onConfirm()
            })

        this.noButton = scene.add
            .image(65, 30, BaseAssetKey.UICommonXRound)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", (pointer: Phaser.Input.Pointer) => {
                pointer.event.stopPropagation()
                pointer.event.preventDefault()
                pointer.event.stopImmediatePropagation()
                this.onCancel()
            })

        this.buttonContainer = new ContainerLite(scene, 0, 0, width, height)
        this.buttonContainer.add([this.yesButton, this.noButton])

        placementConfirmationContainer.add([placementConfirmationHitbox, this.buttonContainer])

        this.add([placementConfirmationContainer])

        scene.add.existing(this)

        EventBus.on(EventName.UpdatePlacementConfirmation, ({ isPlacementValid = true, onCancel, onConfirm }: UpdatePlacementConfirmationMessage) => {
            this.setYesButtonVisible(isPlacementValid)
            if (onCancel) {
                this.onCancel = onCancel
            }
            if (onConfirm) {
                this.onConfirm = onConfirm
            }
        })
    }

    public setYesButtonVisible(visible: boolean) {
        this.yesButton.setVisible(visible)
    }
}
