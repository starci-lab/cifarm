import { Scene } from "phaser"
import { SceneName } from "../scene"
import { HEIGHT, TILE_HEIGHT, TILE_WIDTH, Tilemap } from "../tilemap"

export class GameplayScene extends Scene
{
    private tilemap: Tilemap | undefined
    constructor ()
    {
        super(SceneName.Gameplay)
    }

    init () {
        // Listen to the shutdown event
        this.events.on("shutdown", this.shutdown, this)
    }

    // shutdown method
    shutdown() {
        // call all shutdown methods of game objects
        this.tilemap?.shutdown()
    }

    create ()
    {   
        // launch the UI scene parallel to the gameplay scene
        this.scene.launch(SceneName.UI)

        // set the camera to the center of the tilemap
        const x = TILE_WIDTH
        const y = (HEIGHT % 2 === 0 ? HEIGHT + 1 : HEIGHT) * TILE_HEIGHT
        this.cameras.main.centerOn(x, y)

        // create the tilemap
        this.tilemap = new Tilemap({
            scene: this
        })
    }

    // update method
    update ()
    {
        this.tilemap?.update()
    }
}
