import { BaseSizerBaseConstructorParams } from "@/game/types"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { QuestContent } from "./QuestContent"

export class QuestModal extends BaseSizer {
    private questContent: QuestContent
    
    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        // create the quest content
        this.questContent = new QuestContent({
            scene: this.scene,
            x: this.x,
            y: this.y,
        })
        this.scene.add.existing(this.questContent)
        this.add(this.questContent)
    }
}