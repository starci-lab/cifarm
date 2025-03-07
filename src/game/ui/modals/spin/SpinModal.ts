import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { BaseSizerBaseConstructorParams } from "../../../types"
import { SpinContent } from "./SpinContent"
import { SpinHeader } from "./SpinHeader"
import { getScreenCenterX, getScreenTopY } from "../../utils"

export class SpinModal extends BaseSizer {
    private spinContent: SpinContent
    private spinHeader: SpinHeader

    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.spinContent = new SpinContent({
            scene: this.scene,
        })
        this.scene.add.existing(this.spinContent)
        this.addLocal(this.spinContent)

        this.spinHeader = new SpinHeader({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenTopY(this.scene),
        }).setOrigin(0.5, 0)
        this.scene.add.existing(this.spinHeader)
        this.add(this.spinHeader)
    }
}

