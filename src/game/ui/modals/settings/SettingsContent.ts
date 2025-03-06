import { BaseSizerBaseConstructorParams } from "../../../types"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { Background, ModalBackground, XButton } from "../../elements"
import { EventBus, EventName, ModalName } from "@/game/event-bus"
import { onGameObjectPress } from "../../utils"

export class SettingsContent extends BaseSizer {
    private background: ModalBackground
    constructor({ scene, x, y, width, height }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, width, height)

        this.background = new ModalBackground({
            baseParams: {
                scene,
            },
            options: {
                align: "center",
                container: {
                    showWrapperContainer: false,
                    showContainer: true,
                },
                onXButtonPress: (button: XButton) => {
                    onGameObjectPress({
                        gameObject: button,
                        onPress: () => {
                            EventBus.emit(EventName.CloseModal, {
                                modalName: ModalName.Settings
                            })
                        },
                        scene: this.scene,
                    })
                },
                title: "Settings",
                background: Background.Medium,
            }
        })
        this.scene.add.existing(this.background)
        this.addLocal(this.background)
    }
}
