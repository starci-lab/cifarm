import { SceneAbstract } from "@/game/SceneAbstract"
import { ToolbarBackground } from "./ToolbarBackground"
import { ToolbarContent } from "./ToolbarContent"
import { Scene } from "phaser"

export class Toolbar extends SceneAbstract {
    private toolbarBackground: ToolbarBackground
    private toolbarContent: ToolbarContent
    constructor(scene: Scene) {
        super(scene)

        // create the toolbar background
        this.toolbarBackground = new ToolbarBackground({
            scene: this.scene,
            x: this.centerX,
            y: this.bottomY - 80,
        })
        this.scene.add.existing(this.toolbarBackground)

        // create the toolbar content
        this.toolbarContent = new ToolbarContent(this.scene)
    }
}
