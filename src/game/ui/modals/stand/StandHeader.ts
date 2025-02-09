import { BaseAssetKey } from "@/game/assets"
import { EventName } from "@/game/event-bus"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ContainerLiteBaseConstructorParams } from "../../../types"
import { onGameObjectClick } from "../../utils"
import { ModalName } from "../ModalManager"

export class StandHeader extends ContainerLite {
    private closeButton: Phaser.GameObjects.Sprite

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        // Background header covering the full width
        const frame = this.scene.add.image(0, 0, BaseAssetKey.ModalStandHeader)
            .setOrigin(0.5, 0)
            .setDisplaySize(this.width, 250).setDepth(1)

        this.addLocal(frame)

        this.closeButton = scene.add
            .sprite(this.width / 2 - 80, 80, BaseAssetKey.ModalInventoryBtnClose)
            .setOrigin(0.5, 0)
            .setDepth(1)
            .setInteractive()

        this.closeButton.on("pointerdown", () => {
            onGameObjectClick({
                gameObject: this.closeButton,
                scene: this.scene,
                onClick: () => {
                    this.scene.events.emit(EventName.CloseModal, ModalName.Stand)
                },
            })
        })

        this.addLocal(this.closeButton)
    }
}
