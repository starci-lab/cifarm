import { Scene } from "phaser"
import { SceneName } from "../scene"
import { PinchInput, MouseInput, DragInput } from "../inputs"
import { Tilemap } from "../tilemap"

export class GameplayScene extends Scene
{
    private tileMap: Tilemap | undefined
    private pinch: PinchInput | undefined
    private mouseInput: MouseInput | undefined
    private dragInput: DragInput | undefined
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
        // this.camera = new BaseCamera(this)
        this.pinch = new PinchInput({
            scene: this
        })
        this.mouseInput = new MouseInput(this)
        this.dragInput = new DragInput({
            scene: this
        })
    }

    // update method
    update ()
    {
        this.tileMap?.update()
    }
}
