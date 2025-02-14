import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { calculateUiDepth, UILayer } from "../../layers"
import { ContainerLiteBaseConstructorParams } from "@/game/types"

export interface PlacementConfirmationConstructorParams extends ContainerLiteBaseConstructorParams {
    onConfirm: () => void
    onCancel: () => void
} 

export class PlacementConfirmation extends ContainerLite {
    private yesButton: Phaser.GameObjects.Text
    private noButton: Phaser.GameObjects.Text

    constructor({ scene, x, y, width, height, children, onCancel, onConfirm } : PlacementConfirmationConstructorParams) {
        super(scene, x, y, width, height, children)

        this.yesButton = scene.add
            .text(0, 0, "Yes", {
                fontSize: "16px",
                color: "#fff",
                backgroundColor: "#4CAF50",
                padding: { left: 10, right: 10, top: 5, bottom: 5 },
            })
            .setInteractive()
            .on("pointerdown", onConfirm)

        this.noButton = scene.add
            .text(50, 0, "No", {
                fontSize: "16px",
                color: "#fff",
                backgroundColor: "#F44336",
                padding: { left: 10, right: 10, top: 5, bottom: 5 },
            })
            .setInteractive()
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
