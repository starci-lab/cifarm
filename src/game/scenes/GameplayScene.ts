import { Scene } from "phaser"
import { EventBus, EventName } from "../event-bus"
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
        EventBus.on(EventName.CenterCamera, () => {
            this.setCameraCenter()
        })
    }

    // shutdown method
    shutdown() {
        // call all shutdown methods of game objects
        this.tilemap?.shutdown()
    }

    private setCameraCenter() {
        const x = TILE_WIDTH / 2
        const y = ((HEIGHT % 2 === 0 ? HEIGHT + 1 : HEIGHT) * TILE_HEIGHT) / 2
        this.cameras.main.centerOn(x, y)
    }

    create ()
    {   
        // launch the UI scene parallel to the gameplay scene
        this.scene.launch(SceneName.UI)

        // set the camera to the center of the tilemap
        this.setCameraCenter()

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
