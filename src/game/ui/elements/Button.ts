import { BaseAssetKey } from "@/game/assets"
import { ConstructorParams, LabelBaseConstructorParams } from "../../types"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseText } from "./BaseText"
import { onGameObjectPress } from "../utils"
import { NinePatch3x3 } from "./NinePatch3x3"

export enum ButtonBackground {
    Primary = "button-primary",
    Secondary = "button-secondary",
}

export interface ButtonOptions {
    text: string
    onPress?: (pointer: Phaser.Input.Pointer) => void
    background?: ButtonBackground
    disableInteraction?: boolean
    width?: number
    height?: number
    fontSize?: number
    scale?: number
    syncTextScale?: boolean
}
export class Button extends Label {
    constructor({ baseParams: { scene, config }, options }: ConstructorParams<LabelBaseConstructorParams, ButtonOptions>) {
        if (!options) {
            throw new Error("Button requires options")
        }
        const { text, onPress, background = ButtonBackground.Primary, disableInteraction = true, syncTextScale, height, width, fontSize = 48, scale = 1 } = options

        const backgroundKeyMap: Record<ButtonBackground, BaseAssetKey> = {
            [ButtonBackground.Primary]: BaseAssetKey.UICommonButtonGreen,
            [ButtonBackground.Secondary]: BaseAssetKey.UICommonButtonRed,
        }
        const buttonBackground = new NinePatch3x3({
            baseParams: {
                scene,
            },
            options: {
                assetKey: backgroundKeyMap[background],
                leftWidth: 30,
                rightWidth: 30,
            }
        })
        scene.add.existing(buttonBackground)

        const textObj = new BaseText({
            baseParams: {
                scene,
                text,
                x: 0,
                y: 0,
            },
            options: {
                enableStroke: true,
                fontSize: syncTextScale ? fontSize * scale : fontSize,
            }
        })
        scene.add.existing(textObj)

        super(scene, {
            background: buttonBackground,
            width: (width ?? buttonBackground.width) * scale,
            height: (height ?? buttonBackground.height) * scale,
            text: textObj,
            align: "center",
            space: { top: 5, bottom: 25, left: 5, right: 5 },
            ...config
        })
        if (onPress) {
            this.setInteractive().on("pointerdown", (pointer: Phaser.Input.Pointer) => {
                onGameObjectPress({
                    gameObject: this,
                    onPress: () => onPress(pointer),
                    scene: this.scene,
                    disableInteraction
                })
            })
        }
        this.layout()
    }
}