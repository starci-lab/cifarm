import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { SizerBaseConstructorParams } from "../types/constructor-params/rexui"

export class UISizer extends Sizer {
    constructor({
        scene,
        x,
        y,
        height,
        width,
        config,
    }: SizerBaseConstructorParams) {
    // get the width and height of the game
        const scale = scene.game.scale
        super(
            scene,
            x ?? scale.width / 2,
            y ?? scale.height / 2,
            width ?? scale.width,
            height ?? scale.height,
            config
        )
        this.setDirty(false)
    }
}
