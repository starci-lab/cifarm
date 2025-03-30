import { BaseAssetKey, baseAssetMap } from "../../assets"
import { ConstructorParams, OverlapSizerBaseConstructorParams } from "@/game/types"
import { OverlapSizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { TextColor, Text } from "../elements"

export interface ResourceLabelOptions {
  iconKey: string;
  text: string;
  //icon scale
  scale?: number;
}

export class ResourceLabel extends OverlapSizer {
    public amountText: Text
    constructor({
        baseParams: { scene, config },
        options,
    }: ConstructorParams<OverlapSizerBaseConstructorParams, ResourceLabelOptions>) {
        if (!options) {
            throw new Error("Options is required")
        }
        const { iconKey, text, scale = 1.2 } = options
        // create background
        const background = scene.add.image(
            0,
            0,
            baseAssetMap[BaseAssetKey.UICommonResourceLabelBackground].base
                .textureConfig.key
        )
        // create label
        super(scene, {
            width: background.width,
            height: background.height,
            ...config,
        })
        this.addBackground(background)
        // create icon container
        const iconContainer = this.scene.rexUI.add.container()
        const icon = scene.add.image(0, 0, iconKey).setScale(scale)
        iconContainer.addLocal(icon)
        // add icon to container
        this.add(iconContainer, {
            align: "left",
            expand: false,
        })
        // create amount text
        this.amountText = new Text({
            baseParams: {
                scene,
                x: 0,
                y: 0,
                text,
            },
            options: {
                fontSize: 32,
                textColor: TextColor.White,
            },
        })
        this.scene.add.existing(this.amountText)
        this.add(this.amountText, {
            align: "center",
            expand: false,
        })
        this.layout()
    }
}
