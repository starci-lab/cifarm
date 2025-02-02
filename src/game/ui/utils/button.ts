import { SCALE_TIME } from "@/game/constants"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"

const PEAK_VALUE = 1.1

export interface OnAnimatedClickParams {
  gameObject: Phaser.GameObjects.GameObject | Label;
  onClick: () => void;
  animate?: boolean;
  scene: Phaser.Scene;
}

export const onAnimatedClick = ({
    gameObject,
    onClick,
    animate = true,
    scene,
}: OnAnimatedClickParams) => {
    // Disable interaction
    if (gameObject.input) {
        gameObject.input.enabled = false
    }

    // Apply scaling animation if animate is true
    if (animate) {
        if (gameObject instanceof Label) {
            // Special scaling for Label (scaleYoyo)
            gameObject.scaleYoyo(SCALE_TIME, PEAK_VALUE)
        } else {
            // Tween animation for GameObjects
            scene.tweens.add({
                targets: gameObject,
                scaleX: PEAK_VALUE,
                scaleY: PEAK_VALUE,
                duration: SCALE_TIME,
                ease: "Back",
            })
        }
    }

    // Wait for the animation to finish, then re-enable interaction
    scene.time.delayedCall(SCALE_TIME, () => {
        if (gameObject.input) {
            gameObject.input.enabled = true
        }
    })

    // Call the onClick function
    onClick()
}
