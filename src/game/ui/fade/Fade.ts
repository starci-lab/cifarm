import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { getScreenCenterX, getScreenCenterY } from "../utils"
import { ContainerLiteBaseConstructorParams } from "../../types"
import { BLACK_COLOR, FADE_HOLD_TIME, FADE_TIME } from "../../constants"
import { calculateUiDepth, UILayer } from "../../layers"
import { EventBus, EventName } from "@/game/event-bus"
import { sleep } from "@/modules/common"

export class Fade extends ContainerLite {
    private fade: Phaser.GameObjects.Rectangle
    private isFading = false
    constructor({
        scene,
        x,
        y,
        width,
        height,
        children,
    }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        const { width: gameWidth, height: gameHeight } = scene.game.scale
        this.fade = this.scene.add
            .rectangle(
                getScreenCenterX(this.scene),
                getScreenCenterY(this.scene),
                gameWidth,
                gameHeight,
                BLACK_COLOR,
                1
            )
            .setInteractive()
            .setVisible(false)
            .setActive(false)
            .setAlpha(0)
            .setDepth(
                calculateUiDepth({
                    layer: UILayer.Overlay,
                    layerDepth: 3,
                })
            )
        this.add(this.fade)

        EventBus.on(EventName.FadeIn, () => {
            this.fadeIn()
        })

        EventBus.on(EventName.FadeOut, () => {
            this.fadeOut()
        })

        EventBus.on(EventName.FadeAll, () => {
            this.fadeAll()
        })
        
        EventBus.on(EventName.ShowFade, async (toNeighbor: boolean) => {
            this.fadeIn()
            await sleep(FADE_TIME)
            EventBus.emit(toNeighbor ? EventName.Visit : EventName.Return)
            await sleep(FADE_HOLD_TIME)
            this.fadeOut()
        })
    }

    private fadeOut() {
        this.isFading = false
        // Fade out over 1 second
        this.scene.tweens.add({
            targets: this.fade,
            alpha: 0, // Fade to fully transparent
            duration: FADE_TIME,
            onStart: () => {
                // Ensure it's visible and active before fading out
                this.fade.setVisible(true).setActive(true)
            },
            onComplete: () => {
                // Set to invisible and inactive after fade out
                this.fade.setVisible(false).setActive(false)
            },
        })
    }

    private fadeIn() {
        this.isFading = true
        // Fade in over 1 second
        this.scene.tweens.add({
            targets: this.fade,
            alpha: 1, // Fade to fully opaque
            duration: FADE_TIME,
            onStart: () => {
                // Ensure it's visible and active before fading in
                this.fade.setVisible(true).setActive(true)
            },
        })

        // if the fade is not faded out, fade out after 5 * FADE_TIME
        this.scene.time.delayedCall(FADE_TIME * 5 + FADE_HOLD_TIME, () => {
            if (this.isFading) {
                this.fadeOut()
            }
        })
    }

    private fadeAll() {
        // process both fade in and fade out
        this.fadeIn()
        this.scene.time.delayedCall(FADE_TIME, () => {
            this.fadeOut()
        })
    }
}
