import { SizerBaseConstructorParams } from "@/game/types"
import { ScreenUISizer } from "../../UISizer"
import { DailyBackground } from "./DailyBackground"
import { DailyContent } from "./DailyContent"

export class DailyModal extends ScreenUISizer {
    // daily background
    private dailyBackground: DailyBackground
    private dailyContent: DailyContent
    
    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)

        // create the daily background
        this.dailyBackground = new DailyBackground({
            scene: this.scene,
            x: this.screenCenterX,
            y: this.screenCenterY,
        })
        this.scene.add.existing(this.dailyBackground)
        this.add(this.dailyBackground)

        // create the daily content
        this.dailyContent = new DailyContent({
            scene: this.scene,
            x: this.screenCenterX,
            y: this.screenCenterY,
        })
        this.scene.add.existing(this.dailyContent)
        this.add(this.dailyContent)
    }
}