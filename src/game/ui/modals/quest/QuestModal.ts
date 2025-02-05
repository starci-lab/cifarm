import { SizerBaseConstructorParams } from "@/game/types"
import { UISizer } from "../../UISizer"
import { QuestBackground } from "./QuestBackground"
import { QuestContent } from "./QuestContent"

export class QuestModal extends UISizer {
    private questBackground: QuestBackground
    private questContent: QuestContent
    private closeButton: Phaser.GameObjects.Sprite | undefined
    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)

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