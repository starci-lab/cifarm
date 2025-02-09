import { EventBus, EventName, ShowGameplayBackdropMessage } from "@/game/event-bus"
import { BLACK_COLOR } from "../../constants"
import { calculateGameplayDepth, GameplayLayer } from "../../layers"
import { ContainerLiteBaseConstructorParams } from "../../types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { getScreenCenterX, getScreenCenterY } from "../utils"

export class GameplayBackdrop extends ContainerLite {
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
            ).setDepth(calculateGameplayDepth({
                layer: GameplayLayer.Effects,
            }))
            .setInteractive()
        this.add(this.backdrop)

        EventBus.on(EventName.ShowGameplayBackdrop, ({ depth }: ShowGameplayBackdropMessage) => {
            if (depth) {
                this.backdrop.setDepth(depth)
            }
            this.backdrop.setVisible(true).setActive(true)
        })

        EventBus.on(EventName.HideGameplayBackdrop, () => {
            this.backdrop.setVisible(false).setVisible(false)
        })
    }
}