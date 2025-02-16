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

        this.yesButton = scene.add
            .image(0, 0, BaseAssetKey.PopupPlacementIconYes)
            .setInteractive()
            .setScale(1.5) // Phóng to ảnh
            .on("pointerdown", onConfirm)

        this.noButton = scene.add
            .image(80, 0, BaseAssetKey.PopupPlacementIconNo)
            .setInteractive()
            .setScale(1.5) // Phóng to ảnh
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
