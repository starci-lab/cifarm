import { Scene } from "phaser"
import { SceneName } from "../scene"
import { LeftHorizontalButtons, ModalManager } from "../ui"

export class UIScene extends Scene {
    private modalManager: ModalManager | undefined

    constructor() {
        super(SceneName.UI)
    }

    init() {
        this.events.on("shutdown", this.shutdown, this)
    }

    create() {
        new LeftHorizontalButtons(this).setPosition(50).setOrigin(0, 0).layout()
        const { width, height } = this.game.scale
        this.modalManager = new ModalManager(this, width / 2, height / 2)
        this.add.existing(this.modalManager)
    }

    shutdown() {
        this.modalManager?.shutdown()
    }
}
