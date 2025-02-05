import { SizerBaseConstructorParams } from "../../types"
import { UISizer } from "../UISizer"
import { ToolbarBackground } from "./ToolbarBackground"
import { ToolbarContent } from "./ToolbarContent"

export class Toolbar extends UISizer {
    private toolbarBackground: ToolbarBackground
    private toolbarContent: ToolbarContent
    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)

        const { height } = this.scene.game.scale
        // create the toolbar background
        this.toolbarBackground = new ToolbarBackground({
            scene: this.scene,
            x: this.x,
            y: this.y + height/2 - 80,
        })
        this.scene.add.existing(this.toolbarBackground)
        this.add(this.toolbarBackground)

        // create the toolbar content
        this.toolbarContent = new ToolbarContent(this.scene)
        this.add(this.toolbarContent.itemSizer)
    }
}
