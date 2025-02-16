import { BaseAssetKey } from "../../../assets"
import { CloseModalMessage, EventBus, EventName, ModalName } from "../../../event-bus"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ContainerLiteBaseConstructorParams } from "../../../types"
import { onGameObjectPress } from "../../utils"

export class StandHeader extends ContainerLite {
    private header: Phaser.GameObjects.Image
    private closeButton: Phaser.GameObjects.Image

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        // Background header covering the full width
        this.header = this.scene.add.image(0, 0, BaseAssetKey.UIModalStandHeader)
            .setOrigin(0.5, 0)
        this.addLocal(this.header)

        this.closeButton = scene.add
            .image(this.header.width/2 - 50, 90, BaseAssetKey.UIModalInventoryBtnClose)
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
                    EventBus.emit(EventName.CloseModal, eventMessage)
                },
            })
        })

        this.addLocal(this.closeButton)
    }
}
