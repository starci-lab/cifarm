import { SizerBaseConstructorParams } from "../types/constructor-params/rexui"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"

export class UISizer extends BaseSizer {
    protected screenCenterX: number
    protected screenCenterY: number

    protected screenLeftX: number
    protected screenRightX: number

    protected screenTopY: number
    protected screenBottomY: number
    constructor({
        scene,
        x,
        y,
        height,
        width,
        config,
    }: SizerBaseConstructorParams) {
        super(
            scene,
            x,
            y,
            width,
            height,
            config
        )

        const scale = scene.game.scale
        this.screenCenterX = scale.width / 2
        this.screenCenterY = scale.height / 2

        this.screenLeftX = 0
        this.screenRightX = scale.width

        this.screenTopY = 0
        this.screenBottomY = scale.height
    }
}

export class ScreenUISizer extends UISizer {
    constructor(baseParams: SizerBaseConstructorParams) {
        const { scene, x, y, width, height } = baseParams
        const scale = scene.game.scale
        super({
            ...baseParams,
            x: x ?? scale.width / 2,
            y: y ?? scale.height / 2,
            width: width ?? scale.width,
            height: height ?? scale.height,
        })
        this.setDirty(false)
    }
}
