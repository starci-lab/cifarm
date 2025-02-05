import { Scene } from "phaser"
import { SceneName } from "../scene"
import { LeftHorizontalButtons, ModalManager, RightHorizontalButtons, Toolbar } from "../ui"

export class UIScene extends Scene {
    private modalManager: ModalManager | undefined
    private toolbar: Toolbar | undefined
    constructor() {
        super(SceneName.UI)
    }

    create() {
        const { width, height } = this.game.scale
        // Add the left horizontal buttons
        new LeftHorizontalButtons({
            scene: this,
        }).setPosition(50).setOrigin(0, 0).layout()
        // Add the right horizontal buttons
        new RightHorizontalButtons({
            scene: this,
        }).setPosition(width - 50, 50).setOrigin(1, 0).layout()
        this.modalManager = new ModalManager({
            scene: this,
            x: width / 2,
            y: height / 2,
        }) 
        this.add.existing(this.modalManager)

        this.toolbar = new Toolbar({
            scene: this,
            x: width / 2,
            y: height / 2,
        }) 
        this.add.existing(this.toolbar)
    }
}
