import { Scene } from "phaser"
import { SceneName } from "../scene"
import {
    LeftHorizontalButtons,
    ModalManager,
    RightHorizontalButtons,
    Toolbar,
    Topbar,
    UIBackdrop,
} from "../ui"
import { TutorialManager } from "../ui"
import { getScreenBottomY, getScreenCenterX } from "../ui/utils"

export class UIScene extends Scene {
    constructor() {
        super(SceneName.UI)
    }

    create() {
        const { width } = this.game.scale
        // Add the backdrop
        const backdrop = new UIBackdrop({
            scene: this,
        })
        this.add.existing(backdrop)

        // Add the left horizontal buttons
        const leftHorizontalButtons = new LeftHorizontalButtons({
            scene: this,
        })
            .layout()
            .setPosition(50, 200)
        this.add.existing(leftHorizontalButtons)

        // Add the right horizontal buttons
        const rightHorizontalButtons = new RightHorizontalButtons({
            scene: this,
        }).layout()
            .setPosition(width - 50, 200)
        this.add.existing(rightHorizontalButtons)

        new Topbar(this)

        const toolbar = new Toolbar({
            scene: this,
            x: getScreenCenterX(this),
            y: getScreenBottomY(this) - 100
        })
        this.add.existing(toolbar)

        // add the modal manager
        const modalManager = new ModalManager({
            scene: this,
        })
        this.add.existing(modalManager)

        // add the tutorial manager
        // const tutorialManager = new TutorialManager({
        //     scene: this
        // })
        // this.add.existing(tutorialManager)
    }
}