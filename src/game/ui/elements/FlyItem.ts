import { ConstructorParams, SizerBaseConstructorParams } from "@/game/types"
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseText } from "./BaseText"

export interface FlyItemOptions {
  scale?: number;
  assetKey: string;
  quantity: number;
  duration?: number;
  depth?: number;
  x: number;
  y: number;
  flyHeight?: number;
}
export class FlyItem extends Sizer {
    constructor({
        baseParams: { scene, config },
        options,
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
            quantity,
            scale = 1,
            duration = 2000,
            depth = 1,
            x,
            y,
            flyHeight = 200,
        } = options
        const text = new BaseText({
            baseParams: {
                scene,
                text: `+${quantity}`,
                x: 0,
                y: 0,
            },
            options: {
                enableStroke: true,
                fontSize: 48,
            },
        })
        scene.add.existing(text)
        this.add(text, {
            align: "center",
        })
        const productImage = scene.add.image(0, 0, assetKey)
        this.add(productImage, {
            align: "center",
        })
        this.layout()
        this.setDepth(depth).setPosition(x, y)
        this.setScale(scale)
        this.scene.tweens.add({
            targets: this,
            y: this.y - flyHeight,
            alpha: 0, // Set alpha to 0 for fading effect
            duration: duration,
            onComplete: () => {
                this.destroy()
            },
        })
    }
}
