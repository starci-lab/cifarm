import { SizerBaseConstructorParams } from "@/game/types"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { QuestBackground } from "./QuestBackground"
import { QuestContent } from "./QuestContent"

export class QuestModal extends BaseSizer {
    private questBackground: QuestBackground
    private questContent: QuestContent
    private closeButton: Phaser.GameObjects.Sprite | undefined
    
    constructor({ scene, x, y, height, width, config }: SizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        // create the quest background
        this.questBackground = new QuestBackground({
            scene: this.scene,
            x: this.x,
            y: this.y,
        })
        this.scene.add.existing(this.questBackground)
        this.add(this.questBackground)

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