import { Scene } from "phaser"
import { SceneName } from "../scene"
import { loadBootstrapAssets, loadFont } from "../assets"
import { gameState } from "../react-ui/config"
import { CacheKey } from "../types"

export class BootstrapScene extends Scene {
    constructor() {
        super(SceneName.Bootstrap)
    }

    async create() {
        await Promise.all([
            loadBootstrapAssets(this),
            loadFont(this),
        ])
        this.load.on("complete", () => {
            this.scene.launch(SceneName.Sound)
            this.scene.launch(SceneName.Data)
            //  Move to the next Scene
            this.scene.start(SceneName.Loading)

            if (gameState?.data?.watchingUser) {
                this.cache.obj.add(CacheKey.WatchingUser, gameState.data.watchingUser)
            }
        })
        this.load.start()
    }
}
