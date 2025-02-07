import { BaseAssetKey } from "@/game/assets"
import { EventName } from "@/game/event-bus"
import { ContainerBaseConstructorParams } from "../../../types"
import { onGameObjectClick } from "../../utils"
import { ModalName } from "../ModalManager"

export class StandHeader extends Phaser.GameObjects.Container {
    private closeButton: Phaser.GameObjects.Sprite

    constructor({ scene, x, y }: ContainerBaseConstructorParams) {
        const { width } = scene.game.scale
        super(scene, x ?? 0, y ?? 0)

        // Background header covering the full width
        const frame = this.scene.add.image(0, 0, BaseAssetKey.ModalStandHeader)
            .setOrigin(0.5, 0)
            .setDisplaySize(width, 250).setDepth(5)

        this.add(frame)

        this.closeButton = scene.add
            .sprite(width / 2 - 40, 80, BaseAssetKey.ModalInventoryBtnClose)
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

        this.add(this.closeButton)
    }
}
