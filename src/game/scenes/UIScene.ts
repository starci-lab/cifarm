import { Scene } from "phaser"
import { SceneName } from "../scene"
import {
    LeftHorizontalButtons,
    ModalManager,
    RightHorizontalButtons,
    Toolbar,
    Topbar,
} from "../ui"
import { TutorialManager } from "../ui/tutorial"

export class UIScene extends Scene {
    constructor() {
        super(SceneName.UI)
    }

    create() {
        const { width } = this.game.scale
        // Add the left horizontal buttons
        const leftHorizontalButtons = new LeftHorizontalButtons({
            scene: this,
        })
            .setPosition(50, 200)
            .setOrigin(0, 0)
            .layout()
        this.add.existing(leftHorizontalButtons)

        // Add the right horizontal buttons
        const rightHorizontalButtons = new RightHorizontalButtons({
            scene: this,
        })
            .setPosition(width - 50, 200)
            .setOrigin(1, 0)
            .layout()
        this.add.existing(rightHorizontalButtons)

        new Topbar(this)
        new Toolbar(this)

        // add the modal manager
        const modalManager = new ModalManager({
            scene: this
        })
        this.add.existing(modalManager)

        //add the tutorial manager
        const tutorialManager = new TutorialManager({
            scene: this
        })
        this.add.existing(tutorialManager)
    }
}
