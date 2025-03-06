import { BaseAssetKey } from "@/game/assets"
import { ConstructorParams, LabelBaseConstructorParams } from "../../types"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import { Text } from "./Text"
import { onGameObjectPress } from "../utils"
import { NinePatch3x3 } from "./NinePatch3x3"
import { GRAY_TINT_COLOR } from "@/game/constants"
import RexButton from "phaser3-rex-plugins/plugins/button.js"

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
    private textObj: Text
    private background: NinePatch3x3
    private disabled = false
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

        const textObj = new Text({
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
        this.background = buttonBackground
        this.textObj = textObj

        if (onPress) {
            const button = new RexButton(this)
            button.on("click", (
                button: Button, 
                gameObject: Label, 
                pointer: Phaser.Input.Pointer
            ) => {
                if (this.disabled) {
                    console.log("Button is disabled, ignoring click.")
                    return
                }

                if (!this.input?.enabled) {
                    console.log("Button interaction is disabled.")
                    return
                }

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

    public disable() {
        if (this.disabled) {
            return
        }
        this.removeInteractive()
        this.background.setTint(GRAY_TINT_COLOR)
        this.textObj.setTint(GRAY_TINT_COLOR)
        this.disabled = true
    }

    public enable() {
        if (!this.disabled) {
            return
        }
        this.setInteractive()
        this.background.clearTint()
        this.textObj.clearTint()
        this.disabled = false
    }
}