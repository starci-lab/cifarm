import { BaseAssetKey } from "../../../assets"
import { CloseModalMessage, EventBus, EventName, ModalName, ShowPressHereArrowMessage } from "../../../event-bus"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { CacheKey, ContainerLiteBaseConstructorParams } from "../../../types"
import { onGameObjectPress } from "../../utils"
import { XButton } from "../../elements"
import { setTutorialDepth } from "../../tutorial"

export class StandHeader extends ContainerLite {
    private header: Phaser.GameObjects.Image
    private closeButton: XButton

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        // Background header covering the full width
        this.header = this.scene.add.image(0, 0, BaseAssetKey.UIModalStandHeader)
            .setOrigin(0.5, 0)
        this.addLocal(this.header)

        this.closeButton = new XButton({
            baseParams: {
                scene: this.scene,
                config: {
                    x: this.header.width/2 - 50, 
                    y: 120,
                }
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
                            EventBus.emit(EventName.CloseModal, eventMessage)
                            if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                                this.scene.events.emit(EventName.TutorialCloseStandButtonPressed)
                                this.scene.events.emit(EventName.HidePressHereArrow)
                            }
                        },
                    })
                }
            }
        })
        this.scene.add.existing(this.closeButton)
        this.addLocal(this.closeButton)

        this.scene.events.once(EventName.TutorialPrepareCloseStand, () => {
            setTutorialDepth({
                gameObject: this.closeButton,
            })
            const { x, y } = this.closeButton.getCenter()
            const eventMessage: ShowPressHereArrowMessage = {
                originPosition: { x: x - 60, y: y + 60 },
                targetPosition: { x: x - 40, y: y + 40 },
                rotation: 45
            }
            this.scene.events.emit(EventName.ShowPressHereArrow, eventMessage)
        })
    }
}
