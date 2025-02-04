import { SizerBaseConstructorParams } from "@/game/types"
import { UISizer } from "../../UISizer"
import { DailyBackground } from "./DailyBackground"
import { DailyContent } from "./DailyContent"

export class DailyModal extends UISizer {
    // daily background
    private dailyBackground: DailyBackground
    private dailyContent: DailyContent
    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)

        // create the daily background
        this.dailyBackground = new DailyBackground({
            scene: this.scene,
            x: this.x,
            y: this.y,
        })
        this.scene.add.existing(this.dailyBackground)
        this.add(this.dailyBackground)

        // create the daily content
        this.dailyContent = new DailyContent({
            scene: this.scene,
            x: this.x,
            y: this.y,
        })
        this.scene.add.existing(this.dailyContent)
        this.add(this.dailyContent)
    }
}