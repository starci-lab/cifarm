import { BaseAssetKey, baseAssetMap } from "../../assets"
import { ConstructorParams, LabelBaseConstructorParams } from "../../types"
import { onGameObjectPress } from "../utils"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import Button from "phaser3-rex-plugins/plugins/button.js"

export enum XButtonColor {
    Brown = "brown",
    White = "white",
}

export interface XButtonOptions {
    onPress: () => void
    disableInteraction?: boolean
    width?: number
    height?: number
    color?: XButtonColor
}
export class XButton extends Label {
    constructor({ baseParams: { scene, config }, options }: ConstructorParams<LabelBaseConstructorParams, XButtonOptions>) {
        if (!options) {
            throw new Error("Button requires options")
        }
        const { onPress, disableInteraction = true, height, width, color = XButtonColor.Brown } = options

        const map: Record<XButtonColor, number> = {
            [XButtonColor.Brown]: 0x522D28,
            [XButtonColor.White]: 0xffffff,
        }
        const icon = scene.add.image(0, 0, baseAssetMap[BaseAssetKey.UICommonX].base.textureConfig.key).setTint(map[color])
        super(scene, {
            width: width ?? icon.width,
            height: height ?? icon.height,
            icon,
            ...config,
        })
        const button = new Button(this)
        button.on("click", () => {
            onGameObjectPress({
                gameObject: this,
                onPress,
                scene: this.scene,
                disableInteraction,
                animate: false
            })
        })

        this.layout()
    }
}