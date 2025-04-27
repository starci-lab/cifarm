import { Scene } from "phaser"
import { SceneEventEmitter, SceneEventName } from "@/modules/event-emitter"
import { SceneName } from "../scene"
import { HEIGHT, TILE_HEIGHT, TILE_WIDTH, Tilemap } from "../tilemap"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export class GameplayScene extends Scene
{
    private tilemap: Tilemap | undefined
    constructor ()
    {
        super(SceneName.Gameplay)
    }

    init () {
        SceneEventEmitter.on(SceneEventName.CenterCamera, () => {
            this.setCameraCenter()
        })
        this.scene.launch(SceneName.UI)
    }

    private setCameraCenter() {
        const x = TILE_WIDTH / 2
        const y = ((HEIGHT % 2 === 0 ? HEIGHT + 1 : HEIGHT) * TILE_HEIGHT) / 2
        this.cameras.main.centerOn(x, y)
    }

    create ()
    {   
        ExternalEventEmitter.emit(ExternalEventName.ShowGameUI, true)
        // launch the UI scene parallel to the gameplay scene
        // this.scene.launch(SceneName.UI)

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
