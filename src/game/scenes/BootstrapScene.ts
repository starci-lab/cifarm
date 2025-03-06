import { Scene } from "phaser"
import { SceneName } from "../scene"
import { FONT_DINOSAUR } from "../constants"
import { loadBootstrapAssets } from "../assets"

export class BootstrapScene extends Scene {
    constructor() {
        super(SceneName.Bootstrap)
    }

    preload() {
        this.load.font(FONT_DINOSAUR, "fonts/dinosaur.ttf", "truetype")

        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        this.load.setPath("assets")
        // load all the assets
        loadBootstrapAssets(this)
    }

    create() {
        this.scene.launch(SceneName.Sound)
        //  Move to the next Scene
        this.scene.start(SceneName.Loading)
    }
}
