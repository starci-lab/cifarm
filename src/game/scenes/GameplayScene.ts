import { Scene } from "phaser"
import { SceneName } from "../scene"
import { Tilemap } from "../tilemap"
//import { EventName } from "../event-bus"

export class GameplayScene extends Scene
{
    private tileMap: Tilemap | undefined
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
        this.tileMap?.shutdown()
    }

    create ()
    {   
        // launch the UI scene parallel to the gameplay scene
        this.scene.launch(SceneName.UI)
        this.scene.launch(SceneName.Data)

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
