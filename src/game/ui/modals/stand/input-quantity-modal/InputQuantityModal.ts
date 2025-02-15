import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { SizerBaseConstructorParams } from "../../../../types"
import { InputQuantityContent } from "./InputQuantityContent"
import { getScreenCenterX, getScreenCenterY } from "../../../utils"

export class InputQuantityModal extends BaseSizer {
    private inputQuantityContent: InputQuantityContent

    constructor({ scene, x, y, height, width, config }: SizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.inputQuantityContent = new InputQuantityContent({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
            width,
            height
        })
        this.scene.add.existing(this.inputQuantityContent)
        this.add(this.inputQuantityContent)
    }
    
}
