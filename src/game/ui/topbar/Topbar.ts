import { SceneAbstract } from "@/game/SceneAbstract"
// import { TopbarContent } from "./TopbarContent"
import { Scene } from "phaser"
import { TopbarBackground } from "./TopbarBackground"

export class Topbar extends SceneAbstract {
    private topbarBackground: TopbarBackground

    constructor(scene: Scene) {
        super(scene)

        // create the toolbar background
        this.topbarBackground = new TopbarBackground({
            scene: this.scene,
            x: this.centerX,
            y: this.topY + 120,
        })
        this.scene.add.existing(this.topbarBackground)

        // this.topbarContent = new TopbarContent(this.scene)
    }
}
