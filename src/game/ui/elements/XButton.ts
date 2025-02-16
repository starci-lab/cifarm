import { BaseAssetKey } from "../../assets"
import { ConstructorParams, ImageBaseConstructorParams } from "../../types"
import { onGameObjectPress } from "../utils"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"

export enum XButtonColor {
    Red = 0xff0000,
    Camel = 0xa18150,
}
export interface XButtonOptions {
    onPress: () => void
    color?: XButtonColor
    disableInteraction?: boolean
    width?: number
    height?: number
}
export class XButton extends Label {
    constructor({ baseParams: { scene, x, y }, options }: ConstructorParams<ImageBaseConstructorParams, XButtonOptions>) {
        if (!options) {
            throw new Error("Button requires options")
        }
        const { onPress, color = XButtonColor.Red, disableInteraction = true, height, width } = options

        const icon = scene.add.image(0, 0, BaseAssetKey.UICommonX).setTint(color)
        super(scene, {
            x,
            y,
            width: width ?? icon.width,
            height: height ?? icon.height,
            icon
        })
        this.layout().setInteractive().on("pointerdown", () => {
            onGameObjectPress({
                gameObject: this,
                onPress,
                scene: this.scene,
                disableInteraction
            })
        })
    }
}