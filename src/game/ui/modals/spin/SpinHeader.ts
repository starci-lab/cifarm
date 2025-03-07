import { ContainerLiteBaseConstructorParams } from "../../../types"
import { XButton, XButtonColor } from "../../elements"
//import { getScreenRightX, getScreenTopY } from "../../utils"
import { CloseModalMessage, EventBus, EventName, ModalName } from "@/game/event-bus"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { getScreenCenterX } from "../../utils"

export class SpinHeader extends ContainerLite {
    private xButton: XButton
    constructor({ scene, x, y, height, width }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, height, width)

        this.xButton = new XButton({
            baseParams: {
                scene,
                config: {
                    x: 0,
                    y: 0,
                }
            },
            options: {
                onPress: () => {
                    const eventMessage: CloseModalMessage = {
                        modalName: ModalName.Spin,
                    }
                    EventBus.emit(EventName.CloseModal, eventMessage)
                },
                color: XButtonColor.White,
            },
        }).setPosition(getScreenCenterX(this.scene) - 60, 60)
        this.scene.add.existing(this.xButton)
        this.addLocal(this.xButton)
    }
}
