import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { calculateUiDepth, UILayer } from "../../../layers"
import { ContainerLiteBaseConstructorParams } from "@/game/types"
import { BaseAssetKey } from "@/game/assets"

export interface PlacementPopupConstructorParams extends ContainerLiteBaseConstructorParams {
    onConfirm: () => void
    onCancel: () => void
} 

export class PlacementPopup extends ContainerLite {
    private yesButton: Phaser.GameObjects.Image
    private noButton: Phaser.GameObjects.Image

    constructor({ scene, x, y, width, height, children, onCancel, onConfirm }: PlacementPopupConstructorParams) {
        super(scene, x, y, width, height, children)

        const camera = scene.cameras.main
        const buttonScale = 0.5 / camera.zoom

        this.yesButton = scene.add
            .image(-200, 30, BaseAssetKey.PopupPlacementIconYes)
            .setInteractive()
            .setScale(buttonScale)
            .on("pointerdown", onConfirm)

        this.noButton = scene.add
            .image(200, 30, BaseAssetKey.PopupPlacementIconNo)
            .setInteractive()
            .setScale(buttonScale)
            .on("pointerdown", onCancel)


        this.setDepth(
            calculateUiDepth({
                layer: UILayer.Overlay,
                layerDepth: 2,
            })
        )

        this.add([this.yesButton, this.noButton])

        scene.add.existing(this)
    }
}
