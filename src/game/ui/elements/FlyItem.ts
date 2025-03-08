import { ConstructorParams, SizerBaseConstructorParams } from "@/game/types"
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { Text } from "./Text"

export interface FlyItemOptions {
  scale?: number;
  assetKey: string;
  quantity: number;
  text?: string;
  duration?: number;
  depth?: number;
  x: number;
  y: number;
  flyHeight?: number;
  isShowIcon?: boolean;
}

export class FlyItem extends Sizer {
    constructor({
        baseParams: { scene, config },
        options
    }: ConstructorParams<SizerBaseConstructorParams, FlyItemOptions>) {
        if (!options) {
            throw new Error("FlyItem requires options")
        }
        super(scene, {
            originY: 1,
            ...config,
        })
        const {
            assetKey,
            quantity = 0,
            scale = 1,
            duration = 2000,
            depth = 1,
            x,
            y,
            text = "",
            flyHeight = 200,
            isShowIcon = true,
        } = options
        
        const flyItemText = new Text({
            baseParams: {
                scene,
                text: `${text.length > 0 ? `${text} ` : ""}${quantity != 0 ? `+${quantity}` : ""}`,
                x: 0,
                y: 0,
            },
            options: {
                enableStroke: true,
                fontSize: +`${text.length > 0 ? 32 : 48}`,
            },
        })

        scene.add.existing(flyItemText)
        this.add(flyItemText, {
            align: "center",
        })
        if(isShowIcon) {
            const productImage = scene.add.image(0, 0, assetKey)
            this.add(productImage, {
                align: "center",
            })
        }
        this.layout()
        this.setDepth(depth).setPosition(x, y)
        this.setScale(scale)
        this.scene.tweens.add({
            targets: this,
            y: this.y - flyHeight,
            alpha: 0,
            duration: duration,
            onComplete: () => {
                this.destroy()
            },
        })
    }
}
