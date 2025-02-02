import { SCALE_TIME } from "@/game/constants"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"

export interface OnLabelClick {
  label: Label;
  scene: Phaser.Scene;
  onClick: () => void;
}

const PEAK_VALUE = 1.1

export const onLabelClick = ({ label, onClick, scene }: OnLabelClick) => {
    // set interactive to false
    if (label.input) {
        label.input.enabled = false
    }
    // scale the button
    label.scaleYoyo(SCALE_TIME, PEAK_VALUE)
    // wait for the scale to finish
    scene.time.delayedCall(SCALE_TIME, () => {
    // set interactive to true
        if (label.input) {
            label.input.enabled = true
        }
    })
    // call the onClick function
    onClick()
}

export interface OnGameObjectClick {
  gameObject: Phaser.GameObjects.GameObject;
  onClick: () => void;
}

export const onGameObjectClick = ({
    gameObject,
    onClick,
}: OnGameObjectClick) => {
    // set interactive to false
    if (gameObject.input) {
        gameObject.input.enabled = false
    }
    // scale the button
    gameObject.scene.tweens.add({
        targets: gameObject,
        scaleX: PEAK_VALUE,
        scaleY: PEAK_VALUE,
        duration: SCALE_TIME,
        ease: "Back",
    })
    // wait for the scale to finish
    gameObject.scene.time.delayedCall(SCALE_TIME, () => {
    // set interactive to true
        if (gameObject.input) {
            gameObject.input.enabled = true
        }
    })
    // call the onClick function
    onClick()
}
