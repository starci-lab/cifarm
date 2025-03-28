import { SpineGameObject } from "@esotericsoftware/spine-phaser"

export const setTintColorForSpriteOrSpine = (
    mainVisual: Phaser.GameObjects.Sprite | SpineGameObject,
    tintColor: number
) => {
    if (mainVisual) {
        if (mainVisual instanceof Phaser.GameObjects.Sprite) {
            mainVisual.setTint(tintColor)
        } else if (mainVisual instanceof SpineGameObject) {
            const r = ((tintColor >> 16) & 0xff) / 255
            const g = ((tintColor >> 8) & 0xff) / 255
            const b = (tintColor & 0xff) / 255

            mainVisual.skeleton.slots.forEach((slot) => {
                slot.color.set(r, g, b, 1)
            })
        }
    }
}

export const clearTintColorForSpriteOrSpine = (
    mainVisual: Phaser.GameObjects.Sprite | SpineGameObject
) => {
    if (mainVisual) {
        if (mainVisual instanceof Phaser.GameObjects.Sprite) {
            mainVisual.clearTint()
        } else if (mainVisual instanceof SpineGameObject) {
            mainVisual.skeleton.slots.forEach((slot) => {
                slot.color.set(1, 1, 1, 1)
            })
        }
    }
}
