import {
    EventBus,
    EventName,
    ShowGameplayBackdropMessage,
    UpdateGameplayBackdropMessage,
} from "@/game/event-bus"
import { BLACK_COLOR } from "../../constants"
import { ContainerLiteBaseConstructorParams } from "../../types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { getScreenCenterX, getScreenCenterY } from "../utils"
import { BackdropContext } from "@/game/contexts/backdrop"

export class GameplayBackdrop extends ContainerLite {
    private backdrop: Phaser.GameObjects.Rectangle

    constructor({
        scene,
        x,
        y,
        width,
        height,
        children,
    }: ContainerLiteBaseConstructorParams) {
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
            )
            .setInteractive()
        this.add(this.backdrop)

        EventBus.on(
            EventName.ShowGameplayBackdrop,
            ({ depth }: ShowGameplayBackdropMessage) => {
                // set the backdrop to active for the backdrop context
                BackdropContext.gameplayBackdropActive = true
                // set the backdrop to visible
                this.backdrop.setDepth(depth).setVisible(true).setActive(true).setPosition(
                    this.scene.cameras.main.scrollX + getScreenCenterX(this.scene),
                    this.scene.cameras.main.scrollY + getScreenCenterY(this.scene)
                )
            }
        )

        EventBus.on(EventName.HideGameplayBackdrop, () => {
            // set the backdrop to inactive for the backdrop context
            BackdropContext.gameplayBackdropActive = false
            // hide the backdrop
            this.backdrop.setVisible(false).setVisible(false)
        })

        EventBus.on(
            EventName.UpdateGameplayBackdrop,
            ({ scrollXY }: UpdateGameplayBackdropMessage) => {
                // update the backdrop position
                this.backdrop.setPosition(
                    scrollXY.x + getScreenCenterX(this.scene),
                    scrollXY.y + getScreenCenterY(this.scene)
                )
            }
        )
    }
}
