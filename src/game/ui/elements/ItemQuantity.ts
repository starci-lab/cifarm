import { ConstructorParams, BadgeLabelBaseConstructorParams } from "@/game/types"
import { BadgeLabel } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseText } from "./BaseText"

export interface ItemQuantityOptions {
    assetKey: string
    //quantity of the item
    quantity?: number
    // show the badge
    showBadge?: boolean
    // scale the icon
    scale?: number
}

export class ItemQuantity extends BadgeLabel {
    constructor({ baseParams: { scene, config }, options}: ConstructorParams<BadgeLabelBaseConstructorParams, ItemQuantityOptions>) {
        if (!options) {
            throw new Error("ItemQuantity requires options")
        }
        const { assetKey, quantity = 1, showBadge = false, scale = 1 } = options
        // create the icon
        const iconContainer = scene.rexUI.add.container(0, 0)
        const iconImage = scene.add.image(0, 0, assetKey)
        const width = iconImage.width * scale
        const height = iconImage.height * scale
        const icon = scene.rexUI.add.label({
            background: iconImage,
            width,
            height,
        }).layout()
        iconContainer.addLocal(icon)

        let text: BaseText | undefined
        if (showBadge) {
            text = new BaseText({
                baseParams: {
                    scene,
                    text: quantity.toString(),
                    x: 0,
                    y: 0,
                    style: {
                        padding: {
                            right: 10,
                            bottom: 10,
                        },
                    },
                },
                options: {
                    enableStroke: true,
                },
            })
            scene.add.existing(text)
        }

        super(scene, {
            center: iconContainer,
            width,
            height,
            rightBottom: text,
            ...config,
        })
    }
}