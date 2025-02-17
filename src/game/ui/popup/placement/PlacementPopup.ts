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

        this.yesButton = scene.add
            .image(100, 30, BaseAssetKey.PopupPlacementIconYes)
            .setInteractive()
            .setScale(buttonScale)
            .on("pointerdown", (pointer: Phaser.Input.Pointer) => {
                pointer.event.stopPropagation()
                onConfirm()
            })

        this.noButton = scene.add
            .image(-100, 30, BaseAssetKey.PopupPlacementIconNo)
            .setInteractive()
            .setScale(buttonScale)
            .on("pointerdown", (pointer: Phaser.Input.Pointer) => {
                pointer.event.stopPropagation()
                onCancel()
            })

        this.buttonContainer = new ContainerLite(scene, 0, 0, width, height)
        this.buttonContainer.add([this.yesButton, this.noButton])

        const spacing = 100
        this.yesButton.setX(-spacing / 2)
        this.noButton.setX(spacing / 2)

        this.setDepth(
            calculateUiDepth({
                layer: UILayer.Overlay,
                layerDepth: 2,
            })
        )

        this.add(this.buttonContainer)

        scene.add.existing(this)
    }
}
