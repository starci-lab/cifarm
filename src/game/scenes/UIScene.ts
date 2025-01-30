import { Scene } from "phaser"
import { SceneName } from "../scene"
import { LeftHorizontalButtons } from "../ui"

export class UIScene extends Scene {
    constructor() {
        super(SceneName.UI)
    }

    create() {
        new LeftHorizontalButtons(this)
            .setPosition(50)
            .setOrigin(0, 0)
            .layout()
    }
}
