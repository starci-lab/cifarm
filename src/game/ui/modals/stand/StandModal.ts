import { SizerBaseConstructorParams } from "../../../types"
import { ScreenUISizer } from "../../UISizer"
import { StandBackground } from "./StandBackground"
import { StandContent } from "./StandContent"
import { StandHeader } from "./StandHeader"

export class StandModal extends ScreenUISizer {
    private standBackground: StandBackground
    private standContent: StandContent
    private standHeader: StandHeader

    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)

        const { width, height } = this.scene.game.scale
        // create the stand background
        this.standBackground = new StandBackground({
            scene: this.scene,
            x: this.x,
            y: this.screenBottomY
        })
        this.scene.add.existing(this.standBackground)
        this.add(this.standBackground)

        // create the header
        this.standHeader = new StandHeader({
            scene: this.scene,
            x: this.x,
            y: this.screenTopY
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
