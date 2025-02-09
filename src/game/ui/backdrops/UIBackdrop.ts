import { EventBus, EventName, ShowUIBackdropMessage } from "@/game/event-bus"
import { BLACK_COLOR } from "../../constants"
import { calculateUiDepth, UILayer } from "../../layers"
import { ContainerLiteBaseConstructorParams } from "../../types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { getScreenCenterX, getScreenCenterY } from "../utils"

export class UIBackdrop extends ContainerLite {
    private backdrop: Phaser.GameObjects.Rectangle

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        //full size backdrop
        const { width: gameWidth, height: gameHeight } = scene.game.scale
        this.backdrop = this.scene.add
            .rectangle(
                getScreenCenterX(this.scene),
                getScreenCenterY(this.scene),
                gameWidth,
                gameHeight,
                BLACK_COLOR,
                0.5
            ).setDepth(calculateUiDepth({
                layer: UILayer.Modal,
            }))
            .setInteractive()
        this.add(this.backdrop)

        EventBus.on(EventName.ShowUIBackdrop, ({ depth }: ShowUIBackdropMessage) => {
            if (depth) {
                this.backdrop.setDepth(depth)
            }
            this.backdrop.setVisible(true).setActive(true)
        })
        
        EventBus.on(EventName.HideUIBackdrop, () => {
            this.backdrop.setVisible(false).setActive(false)
        })
    }
}