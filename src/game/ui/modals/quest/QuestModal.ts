import { BaseSizerBaseConstructorParams } from "@/game/types"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { QuestContent } from "./QuestContent"
import { getScreenCenterX, getScreenCenterY } from "../../utils"

export class QuestModal extends BaseSizer {
    private questContent: QuestContent
    
    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        // create the quest content
        this.questContent = new QuestContent({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        })
        this.scene.add.existing(this.questContent)
        this.add(this.questContent)
    }
}