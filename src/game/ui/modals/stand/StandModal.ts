import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { BaseSizerBaseConstructorParams } from "../../../types"
import { getScreenBottomY, getScreenCenterX, getScreenCenterY, getScreenTopY } from "../../utils"
import { StandContent } from "./StandContent"
import { StandHeader } from "./StandHeader"
import { StandNextDeliverTime } from "./StandNextDeliverTime"

export class StandModal extends BaseSizer {
    private standContent: StandContent
    private standHeader: StandHeader
    private standNextDeliverTime: StandNextDeliverTime

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

        this.standNextDeliverTime = new StandNextDeliverTime({
            scene,
            config: {
                ...config,
                originY: 1,
                x: getScreenCenterX(this.scene),
                y: getScreenBottomY(this.scene) - 200,
            }
        })
        this.add(this.standNextDeliverTime)
    }
}
