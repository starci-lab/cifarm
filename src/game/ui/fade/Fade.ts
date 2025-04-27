
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ContainerLiteBaseConstructorParams } from "../../types"
import { BLACK_COLOR, FADE_TIME } from "../../constants"
import { SceneEventEmitter, SceneEventName } from "@/modules/event-emitter"
import { uiDepth } from "@/game/depth"

export class Fade extends ContainerLite {
    private fade: Phaser.GameObjects.Rectangle
    constructor({
        scene,
        x,
        y,
        width,
        height,
        children,
    }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)
        this.fade = this.scene.add
            .rectangle(
                this.scene.scale.width / 2,
                this.scene.scale.height / 2,
                this.scene.scale.width,
                this.scene.scale.height,
                BLACK_COLOR,
                1
            )
            .setInteractive()
            .setVisible(false)
            .setActive(false)
            .setAlpha(0)
            .setDepth(
                uiDepth.fade
            )
        this.add(this.fade)

        SceneEventEmitter.on(SceneEventName.FadeIn, () => {
            this.fadeIn()
        })

        SceneEventEmitter.on(SceneEventName.FadeOut, () => {
            this.fadeOut()
        })
    }

    private fadeOut() {
        // Fade out over 1 second
        this.scene.tweens.add({
            targets: this.fade,
            alpha: 0, // Fade to fully transparent
            duration: FADE_TIME,
            onStart: () => {
                this.fade.setVisible(true).setActive(true)
            },
            onComplete: () => {
                this.fade.setVisible(false).setActive(false)
            }
        })
    }

    private fadeIn() {
        // Fade in over 1 second
        this.fade.setVisible(true).setActive(true)
        this.scene.tweens.add({
            targets: this.fade,
            alpha: 1, // Fade to fully opaque
            duration: FADE_TIME,
        })
    }
}
