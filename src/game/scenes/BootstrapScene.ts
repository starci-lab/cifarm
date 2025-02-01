import { Scene } from "phaser"
import { loadBaseAssets } from "../assets/base"
import { SceneName } from "../scene"
import { FONT_DINOSAUR } from "../constants"
import { loadCropAssets, loadPlacedItemAssets } from "../assets"

export class BootstrapScene extends Scene {
    constructor() {
        super(SceneName.Bootstrap)
    }

    preload() {
        this.load.font(FONT_DINOSAUR, "fonts/dinosaur.ttf", "truetype")

        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        this.load.setPath("assets")
        // load all the assets
        loadBaseAssets(this)
        loadPlacedItemAssets(this)
        loadCropAssets(this)
    }

    create() {
    //  Move to the next Scene
        this.scene.start(SceneName.LoadingScene)
    }
}
