import { SizerBaseConstructorParams } from "../../../types"
import { UISizer } from "../../UISizer"
import { StandBackground } from "./StandBackground"
import { StandContent } from "./StandContent"

export class StandModal extends UISizer {
    private standBackground: StandBackground
    private standContent: StandContent

    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)

        const { width, height } = this.scene.game.scale
        // create the stand background
        this.standBackground = new StandBackground({
            scene: this.scene,
            x: this.x,
            y: height,
        })
        this.scene.add.existing(this.standBackground)
        this.add(this.standBackground)

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
