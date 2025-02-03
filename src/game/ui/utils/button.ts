import { SCALE_PEAK_VALUE, SCALE_TIME } from "@/game/constants"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"

export interface OnGameObjectClickParams {
  gameObject: Phaser.GameObjects.GameObject | Label;
  onClick: () => void;
  animate?: boolean;
  scene: Phaser.Scene;
  peakValue?: number;
}

export const onGameObjectClick = ({
    gameObject,
    onClick,
    animate = true,
    scene,
    peakValue = SCALE_PEAK_VALUE,
}: OnGameObjectClickParams) => {
    // Disable interaction
    if (gameObject.input) {
        gameObject.input.enabled = false
    }

    // Apply scaling animation if animate is true
    if (animate) {
        if (gameObject instanceof Label) {
            // Special scaling for Label (scaleYoyo)
            gameObject.scaleYoyo(SCALE_TIME, peakValue)
        } else {
            // Tween animation for GameObjects
            scene.tweens.add({
                targets: gameObject,
                scaleX: peakValue,
                scaleY: peakValue,
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
