import { BaseAssetKey, baseAssetMap } from "../../../assets"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ContainerLiteBaseConstructorParams } from "../../../types"
import { getScreenRightX, onGameObjectPress } from "../../utils"
import { XButton } from "../../elements"
import { SceneEventEmitter, SceneEventName, CloseModalMessage, ModalName } from "../../../events"

export class StandHeader extends ContainerLite {
    private header: Phaser.GameObjects.Image
    private closeButton: XButton

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        // Background header covering the full width
        this.header = this.scene.add.image(0, 0, baseAssetMap[BaseAssetKey.UIModalStandHeader].base.textureConfig.key)
            .setOrigin(0.5, 0)
        this.addLocal(this.header)

        this.closeButton = new XButton({
            baseParams: {
                scene: this.scene,
                config: {
                    x: 0,
                    y: 0
                },
            },
            options: {
                onPress: () => {
                    onGameObjectPress({
                        gameObject: this.closeButton,
                        scene: this.scene,
                        onPress: () => {
                            const eventMessage: CloseModalMessage = {
                                modalName: ModalName.Stand,
                            }
                            SceneEventEmitter.emit(SceneEventName.CloseModal, eventMessage)
                        },
                    })
                }
            }
        })
            .setPosition(
                getScreenRightX(this.scene) - this.header.width / 2 - 60,
                this.header.height / 2 - 20
            )
        this.scene.add.existing(this.closeButton)
        this.addLocal(this.closeButton)
    }
}
