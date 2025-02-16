import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { BaseSizerBaseConstructorParams } from "../../../../types"
import { SelectProductContent } from "./SelectProductContent"
import { getScreenCenterX, getScreenCenterY } from "../../../utils"

export class SelectProductModal extends BaseSizer {
    private selectProductContent: SelectProductContent

    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.selectProductContent = new SelectProductContent({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
            width,
            height
        })
        this.scene.add.existing(this.selectProductContent)
        this.add(this.selectProductContent)
    }
}
