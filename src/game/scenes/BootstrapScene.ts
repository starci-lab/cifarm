import { Scene } from "phaser"
import { SceneName } from "../scene"
import { FONT_DINOSAUR } from "../constants"
import { loadBootstrapAssets } from "../assets"
import { gameState } from "../config"
import { CacheKey } from "../types"

export class BootstrapScene extends Scene {
    constructor() {
        super(SceneName.Bootstrap)
    }

    preload() {
        this.load.font(FONT_DINOSAUR, "/fonts/Dinosaur.ttf", "truetype")
        this.load.setPath("assets")
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        // load all the assets
        loadBootstrapAssets(this)
    }

    create() {
        this.scene.launch(SceneName.Sound)
        this.scene.launch(SceneName.Data)
        //  Move to the next Scene
        this.scene.start(SceneName.Loading)

        this.cache.obj.add(CacheKey.WatchingUser, gameState?.data?.watchingUser)
    }
}
