import { BaseAssetKey } from "@/game/assets"
import {
    ConstructorParams,
    OverlapSizerBaseConstructorParams,
} from "@/game/types"
import {
    Slider as RexSlider,
    OverlapSizer,
} from "phaser3-rex-plugins/templates/ui/ui-components"

export interface SliderOptions {
  defaultValue?: number;
  scale?: number;
  valuechangeCallback: (
    newValue: number,
    oldValue: number,
    slider: RexSlider
  ) => void;
}
export class Slider extends OverlapSizer {
    private slider: RexSlider
    private thumb: Phaser.GameObjects.Image
    constructor({
        baseParams: { scene, config },
        options,
    }: ConstructorParams<OverlapSizerBaseConstructorParams, SliderOptions>) {
        if (!options) {
            throw new Error("Slider requires config")
        }
        const { defaultValue = 0.5, scale = 1.5, valuechangeCallback } = options
        const background = scene.add.image(
            0,
            0,
            BaseAssetKey.UICommonSliderBackground
        )
        super(scene, {
            width: background.width * scale,
            height: background.height * scale,
            ...config,
        })

        const indicator = scene.add.image(
            0,
            0,
            BaseAssetKey.UICommonSliderIndicator
        ) as Phaser.GameObjects.Image & {
      resize: (width: number, height: number) => Phaser.GameObjects.Image;
    }
        this.thumb = scene.add.image(0, 0, BaseAssetKey.UICommonSliderThumb)
        indicator.resize = (width: number, height: number) => {
            indicator.setCrop(0, 0, width - this.thumb.width / 2, height)
            return indicator
        }
        indicator.setScale(scale)   
        this.slider = scene.rexUI.add
            .slider({
                width: indicator.width * scale,
                height: indicator.height * scale,
                orientation: "x",
                input: "drag",
                valuechangeCallback,
                indicator,
                thumbOffsetX: this.thumb.width / 2,
                space: {
                    left: -this.thumb.width / 2,
                },
                thumb: this.thumb,
                value: defaultValue,
                ...config,
            })
            .layout()

        this.addBackground(background)
        this.addLocal(this.slider)

        this.layout()
    }
}