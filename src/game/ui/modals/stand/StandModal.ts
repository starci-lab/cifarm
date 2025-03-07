import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { BaseSizerBaseConstructorParams } from "../../../types"
import { getScreenCenterX, getScreenCenterY, getScreenTopY } from "../../utils"
import { StandContent } from "./StandContent"
import { StandHeader } from "./StandHeader"

export class StandModal extends BaseSizer {
    private standContent: StandContent
    private standHeader: StandHeader

    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        // create the header
        this.standHeader = new StandHeader({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenTopY(this.scene),
        })
        this.scene.add.existing(this.standHeader)
        this.add(this.standHeader)

        // create the stand content
        this.standContent = new StandContent({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        })
        this.scene.add.existing(this.standContent)
        this.add(this.standContent)
    }
}
