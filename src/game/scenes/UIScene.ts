import { Scene } from "phaser"
import { SceneName } from "../scene"
import {
    Fade,
    getScreenBottomY,
    getScreenCenterX,
    getScreenTopY,
    LeftHorizontalButtons,
    ModalManager,
    NeighborLeftHorizontalButtons,
    NeighborRightHorizontalButtons,
    PlacementModeLeftHorizontalButtons,
    RightHorizontalButtons,
    Toolbar,
    Topbar,
    TutorialManager,
    UIBackdrop,
} from "../ui"

export class UIScene extends Scene {
    constructor() {
        super(SceneName.UI)
    }

    create() {
        //console.log(this.add.spine)
        const spineboy = this.add.spine(540, 960, "a", "b")
        spineboy.setScale(1)
        spineboy.animationState.setAnimation(0, "idle", true)
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

        const neighborLeftHorizontalButtons = new NeighborLeftHorizontalButtons({
            scene: this,
        })
            .layout()
            .setPosition(50, 200)
        this.add.existing(neighborLeftHorizontalButtons)

        // Add the right horizontal buttons
        const rightHorizontalButtons = new RightHorizontalButtons({
            scene: this,
        }).layout()
            .setPosition(width - 50, 200)
        this.add.existing(rightHorizontalButtons)

        const neighborRightHorizontalButtons = new NeighborRightHorizontalButtons({
            scene: this,
        }).layout()
            .setPosition(width - 50, 200)
        this.add.existing(neighborRightHorizontalButtons)

        // selling mode left horizontal buttons
        const sellingModeLeftHorizontalButtons = new PlacementModeLeftHorizontalButtons({
            scene: this,
        })
            .layout()
            .setPosition(50, 200)
            .hide()
        this.add.existing(sellingModeLeftHorizontalButtons)

        const topbar = new Topbar({
            scene: this,
            x: getScreenCenterX(this),
            y: getScreenTopY(this)
        })
        this.add.existing(topbar)

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

        //add the tutorial manager
        const tutorialManager = new TutorialManager({
            scene: this
        })
        this.add.existing(tutorialManager)

        const fade =  new Fade({
            scene: this,
        })
        this.add.existing(fade)
    }
}