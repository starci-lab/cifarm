import { BaseAssetKey } from "../../assets"
import { ConstructorParams, LabelBaseConstructorParams } from "../../types"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseText } from "./BaseText"

export interface RibbonTitleOptions {
    text: string
}
export class RibbonTitle extends Label {
    constructor({ baseParams: { scene, config}, options }: ConstructorParams<LabelBaseConstructorParams, RibbonTitleOptions>) {
        if (!options) {
            throw new Error("RibbonTitle requires options")
        }

        const background = scene.add.image(0, 0, BaseAssetKey.UIModalCommonRibbon)

        const text = new BaseText({
            baseParams: {
                scene,
                text: options.text,
                x: 0,
                y: 0,
            },
            options: {
                enableStroke: true,
                fontSize: 48,
            }
        })
        scene.add.existing(text)
        
        super(scene, {
            background,
            text,
            width: background.width,
            height: background.height,
            align: "center",
            space: {
                bottom: 30
            },
            ...config,
        })
    }
}