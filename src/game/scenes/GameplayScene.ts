import { Scene } from "phaser"
import { SceneName } from "../scene"
import { FieldTilemap } from "../tilemap/FieldTileMap"
import { PinchInput, MouseInput } from "../inputs"

export class GameplayScene extends Scene
{
    private fieldTileMap: FieldTilemap | undefined
    private pinch: PinchInput | undefined
    private mouseInput: MouseInput | undefined
    constructor ()
    {
        super(SceneName.Gameplay)
    }

    init () {
        this.scene.launch(SceneName.UI)
    }

    create ()
    {   
        this.fieldTileMap = new FieldTilemap(this)
        // this.camera = new BaseCamera(this)
        this.pinch = new PinchInput(this)
        this.mouseInput = new MouseInput(this)
    }
}
