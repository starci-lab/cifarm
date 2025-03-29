import { SpineGameObject } from "@esotericsoftware/spine-phaser"
import { MainVisualType, SpineConfig, TextureConfig } from "../assets"

export const setTintForSpriteOrSpine = (
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

export const clearTintForSpriteOrSpine = (
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

export interface CreateMainVisualParams {
  mainVisualType?: MainVisualType;
  textureConfig?: TextureConfig;
  spineConfig?: SpineConfig;
  scene: Phaser.Scene;
}

export const createMainVisual = ({
    mainVisualType = MainVisualType.Sprite,
    textureConfig,
    spineConfig,
    scene,
}: CreateMainVisualParams) => {
    let mainVisual: Phaser.GameObjects.Sprite | SpineGameObject | undefined
    switch (mainVisualType) {
    case MainVisualType.Spine: {
        if (!spineConfig) {
            throw new Error("Spine config is undefined")
        }
        const { x = 0, y = 0 } = { ...spineConfig.extraOffsets }
        //render spine animation
        mainVisual = scene.add
            .spine(x, y, spineConfig.json.key, spineConfig.atlas.key)
            .setOrigin(0.5, 1)
        mainVisual.animationState.setAnimation(0, "idle", true)
        return mainVisual
    }
    default: {
        if (!textureConfig) {
            throw new Error("Texture config is undefined")
        }
        const { x = 0, y = 0 } = { ...textureConfig.extraOffsets }
        //render sprite
        return scene.add.sprite(x, y, textureConfig.key).setOrigin(0.5, 1)
    }
    }
}
