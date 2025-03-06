import { BaseAssetKey } from "@/game/assets"
import { ConstructorParams, SliderBaseConstructorParams } from "@/game/types"
import { Slider as RexSlider } from "phaser3-rex-plugins/templates/ui/ui-components"

export interface SliderOptions {
    defaultValue?: number
    scale?: number
}
export class Slider extends RexSlider {
    constructor({
        baseParams: { scene, config },
        options,
    }: ConstructorParams<SliderBaseConstructorParams, SliderOptions>) {
        const { defaultValue = 0.5, scale = 1.5 } = { ...options }
        const valuechangeCallback = config?.valuechangeCallback
        if (!valuechangeCallback) {
            throw new Error("Slider requires valuechangeCallback")
        }
        const background = scene.add.image(0, 0, BaseAssetKey.UICommonSliderBackground)
        const indicator = getIndicator(scene).setScale(scale)
        const thumb = scene.add.image(0, 0, BaseAssetKey.UICommonSliderThumb)
        super(scene, {
            width: background.width * scale,
            height: background.height * scale,
            track: background,
            valuechangeCallback,
            indicator,
            thumb,
            background,
            value: defaultValue,
            ...config,
        })

        this.layout()
    }
}

const getIndicator = (scene: Phaser.Scene) => {
    const indicator = scene.add.image(
        0,
        0,
        BaseAssetKey.UICommonSliderIndicator
    ) as Phaser.GameObjects.Image & {
    resize: (width: number, height: number) => Phaser.GameObjects.Image;
  }
  // ignore the type error
    indicator.resize = (width: number, height: number) => {
        indicator.setCrop(0, 0, width, height)
        return indicator
    }
    return indicator
}
