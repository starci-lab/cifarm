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
    onPress: () => void
    background?: ButtonBackground
    disableInteraction?: boolean
    width?: number
    height?: number
}
export class Button extends Label {
    constructor({ baseParams: { scene, config }, options }: ConstructorParams<LabelBaseConstructorParams, ButtonOptions>) {
        if (!options) {
            throw new Error("Button requires options")
        }
        const { text, onPress, background = ButtonBackground.Primary, disableInteraction = true, height, width } = options

        const backgroundKeyMap: Record<ButtonBackground, BaseAssetKey> = {
            [ButtonBackground.Primary]: BaseAssetKey.UICommonButtonRed,
            [ButtonBackground.Secondary]: BaseAssetKey.UICommonButtonGreen,
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
                fontSize: 48,
            }
        })
        scene.add.existing(textObj)

        super(scene, {
            background: buttonBackground,
            width: width ?? buttonBackground.width,
            height: height ?? buttonBackground.height,
            text: textObj,
            align: "center",
            space: { top: 5, bottom: 25, left: 5, right: 5 },
            ...config
        })

        this.setInteractive().on("pointerdown", () => {
            onGameObjectPress({
                gameObject: this,
                onPress,
                scene: this.scene,
                disableInteraction
            })
        })
    }
}