import { BaseAssetKey } from "../../../assets"
import { CloseModalMessage, EventBus, EventName, ModalName } from "../../../event-bus"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ContainerLiteBaseConstructorParams } from "../../../types"
import { onGameObjectPress } from "../../utils"

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
            onGameObjectPress({
                gameObject: this.closeButton,
                scene: this.scene,
                onPress: () => {
                    const eventMessage: CloseModalMessage = {
                        modalName: ModalName.Stand,
                    }
                    EventBus.emit(EventName.OpenModal, eventMessage)
                },
            })
        })

        this.addLocal(this.closeButton)
    }
}
