import { Scene } from "phaser"
import { SceneName } from "../scene"
import { Tilemap } from "../tilemap"

export class GameplayScene extends Scene
{
    private tileMap: Tilemap | undefined
    constructor ()
    {
        super(SceneName.Gameplay)
    }

    init () {
        // launch the UI scene parallel to the gameplay scene
        this.scene.launch(SceneName.UI)

        // Listen to the shutdown event
        this.events.on("shutdown", this.shutdown, this)
    }

    // shutdown method
    shutdown() {
        // call all shutdown methods of game objects
        this.tileMap?.shutdown()
    }

    create ()
    {   
        this.tileMap = new Tilemap({
            scene: this
        })
    }

    // update method
    update ()
    {
        this.tileMap?.update()
    }
}
