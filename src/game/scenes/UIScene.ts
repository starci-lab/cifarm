
import { Scene } from "phaser"
import { SceneName } from "../scene"
import {
    Fade,
} from "../ui"

export class UIScene extends Scene {
    constructor() {
        super(SceneName.UI)
    }

    create() {
        const fade =  new Fade({
            scene: this,
        })
        this.add.existing(fade)
    }
}
