import { BaseAssetKey, baseAssetMap } from "@/game/assets"
import { ConstructorParams, LabelBaseConstructorParams } from "@/game/types"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import { TextColor, Text } from "./Text"

export interface ResourceLabelOptions {
    iconKey: string
    text: string
    //icon scale
    scale?: number      
}

export class ResourceLabel extends Label {
    constructor({
        baseParams: { scene, config },
        options,    
    }: ConstructorParams<LabelBaseConstructorParams, ResourceLabelOptions>) {
        if (!options) {
            throw new Error("ResourceLabelOptions is required")
        }
        const { iconKey, text, scale = 1 } = options
        // create background
        const background = scene.add.image(0, 0, baseAssetMap[BaseAssetKey.UITopbarResource].base.textureConfig.key)
        // create icon container
        const iconContainer = scene.add.container(0, 0)
        // create icon
        const icon = scene.add.image(0, 0, iconKey).setScale(scale)
        // add icon to container
        iconContainer.add(icon)
        // create amount text
        const amountText = new Text({
            baseParams: {
                scene,
                x: 0,
                y: 0,
                text,
            },
            options: {
                fontSize: 24,
                textColor: TextColor.White,
            },
        }) 
        scene.add.existing(amountText) 

        // create label
        super(scene, {
            background,
            icon: iconContainer,
            text: amountText,
            width: background.width,
            height: background.height,
            space: {
                icon: 40,
                top: -2
            },
            ...config,
        })

        this.layout()
    }
}
