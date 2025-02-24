import { BaseSizerBaseConstructorParams } from "@/game/types"
import { DailyContent } from "./DailyContent"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { getScreenCenterX, getScreenCenterY } from "../../utils"

export class DailyModal extends BaseSizer {
    private dailyContent: DailyContent
    
    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

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