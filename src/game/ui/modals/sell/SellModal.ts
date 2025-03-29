
import { BaseSizerBaseConstructorParams } from "@/game/types"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { getScreenCenterX, getScreenCenterY } from "../../utils"
import { SellContent } from "./SellContent"

export class SellModal extends BaseSizer {
    private sellContent: SellContent 
    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        // create the daily content
        this.sellContent = new SellContent({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        })
        this.scene.add.existing(this.sellContent)
        this.add(this.sellContent)
    }
}