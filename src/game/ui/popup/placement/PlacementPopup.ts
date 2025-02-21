import { BaseAssetKey } from "@/game/assets"
import { ContainerLiteBaseConstructorParams } from "@/game/types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { calculateUiDepth, UILayer } from "../../../layers"

export interface PlacementPopupConstructorParams extends ContainerLiteBaseConstructorParams {
    onConfirm: () => void;
    onCancel: () => void;
}

export class PlacementPopup extends ContainerLite {
    private buttonContainer: ContainerLite
    private yesButton: Phaser.GameObjects.Image
    private noButton: Phaser.GameObjects.Image

    constructor({ scene, x, y, width, height, children, onCancel, onConfirm }: PlacementPopupConstructorParams) {
        super(scene, x, y, width, height, children)

        const camera = scene.cameras.main
        const buttonScale = 0.5 / camera.zoom

        const hitbox = scene.add.rectangle(0, 0, width, height, 0x000000, 0).setInteractive()
        hitbox.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            pointer.event.stopPropagation()
            pointer.event.preventDefault()
            pointer.event.stopImmediatePropagation()
        })

        this.yesButton = scene.add
            .image(-100, 30, BaseAssetKey.PopupPlacementIconYes)
            .setInteractive({ useHandCursor: true })
            .setScale(buttonScale)
            .on("pointerdown", (pointer: Phaser.Input.Pointer) => {
                pointer.event.stopPropagation()
                pointer.event.preventDefault()
                pointer.event.stopImmediatePropagation()
                onConfirm()
            })

        this.noButton = scene.add
            .image(100, 30, BaseAssetKey.PopupPlacementIconNo)
            .setInteractive({ useHandCursor: true })
            .setScale(buttonScale)
            .on("pointerdown", (pointer: Phaser.Input.Pointer) => {
                pointer.event.stopPropagation()
                pointer.event.preventDefault()
                pointer.event.stopImmediatePropagation()
                onCancel()
            })

        this.buttonContainer = new ContainerLite(scene, 0, 0, width, height)
        this.buttonContainer.add([this.yesButton, this.noButton])

        this.setDepth(
            calculateUiDepth({
                layer: UILayer.Overlay,
                layerDepth: 2,
            })
        )

        this.add([hitbox, this.buttonContainer])

        scene.add.existing(this)
    }

    public setYesButtonVisible(visible: boolean) {
        this.yesButton.setVisible(visible)
    }
}
