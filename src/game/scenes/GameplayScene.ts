import { Scene } from "phaser"
import { SceneName } from "../scene"
import { HEIGHT, TILE_HEIGHT, TILE_WIDTH, Tilemap } from "../tilemap"
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

        // set the camera to the center of the tilemap
        const x = TILE_WIDTH
        const y = (HEIGHT % 2 === 0 ? HEIGHT + 1 : HEIGHT) * TILE_HEIGHT
        this.cameras.main.centerOn(x, y)

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
