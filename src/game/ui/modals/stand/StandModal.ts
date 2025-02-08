import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { SizerBaseConstructorParams } from "../../../types"
import { StandBackground } from "./StandBackground"
import { StandContent } from "./StandContent"
import { StandHeader } from "./StandHeader"
import { getScreenBottomY, getScreenTopY } from "../../utils"

export class StandModal extends BaseSizer {
    private standBackground: StandBackground
    private standContent: StandContent
    private standHeader: StandHeader

    constructor({ scene, x, y, height, width, config }: SizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        // create the stand background
        this.standBackground = new StandBackground({
            scene: this.scene,
            x: this.x,
            y: getScreenBottomY(this.scene),
        })
        this.scene.add.existing(this.standBackground)
        this.add(this.standBackground)

        // create the header
        this.standHeader = new StandHeader({
            scene: this.scene,
            x: this.x,
            y: getScreenTopY(this.scene),
        })
        this.scene.add.existing(this.standHeader)
        this.add(this.standHeader)

        // create the stand content
        this.standContent = new StandContent({
            scene: this.scene,
            x: this.x,
            y: this.y,
        }).setDepth(1)
        this.scene.add.existing(this.standContent)
        this.add(this.standContent)
    }
}
