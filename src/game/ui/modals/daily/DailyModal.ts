import { SizerBaseConstructorParams } from "@/game/types"
import { DailyBackground } from "./DailyBackground"
import { DailyContent } from "./DailyContent"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { getScreenCenterX, getScreenCenterY } from "../../utils"

export class DailyModal extends BaseSizer {
    // daily background
    private dailyBackground: DailyBackground
    private dailyContent: DailyContent
    
    constructor({ scene, x, y, height, width, config }: SizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        // create the daily background
        this.dailyBackground = new DailyBackground({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        })
        this.scene.add.existing(this.dailyBackground)
        this.add(this.dailyBackground)

        // create the daily content
        this.dailyContent = new DailyContent({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        })
        this.scene.add.existing(this.dailyContent)
        this.add(this.dailyContent)
    }
}