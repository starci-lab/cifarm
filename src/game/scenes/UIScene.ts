import { Scene } from "phaser"
import { SceneName } from "../scene"
import { LeftHorizontalButtons, ModalManager, RightHorizontalButtons } from "../ui"

export class UIScene extends Scene {
    private modalManager: ModalManager | undefined

    constructor() {
        super(SceneName.UI)
    }

    init() {
        this.events.on("shutdown", this.shutdown, this)
    }

    create() {
        const { width, height } = this.game.scale
        // Add the left horizontal buttons
        new LeftHorizontalButtons(this).setPosition(50).setOrigin(0, 0).layout()
        // Add the right horizontal buttons
        new RightHorizontalButtons(this).setPosition(width - 50, 50).setOrigin(1, 0).layout()
        this.modalManager = new ModalManager(this, width / 2, height / 2)
        this.add.existing(this.modalManager)
    }

    shutdown() {
        this.modalManager?.shutdown()
    }
}
