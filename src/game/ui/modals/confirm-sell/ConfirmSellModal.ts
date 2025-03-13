import { BaseSizerBaseConstructorParams } from "@/game/types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { getScreenCenterX, getScreenCenterY } from "../../utils"
import { ConfirmSellContent } from "./ConfirmSellContent"

// shop modal extends BaseSizer
export class ConfirmSellModal extends BaseSizer {
    private container: ContainerLite
    private confirmSellContent: ConfirmSellContent

    constructor({
        scene,
        x,
        y,
        height,
        width,
        config,
    }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.container = this.scene.rexUI.add.container(
            getScreenCenterX(this.scene),
            getScreenCenterY(this.scene)
        )
        this.add(this.container)

        //create the shop content
        this.confirmSellContent = new ConfirmSellContent({
            scene: this.scene,
        })
        this.scene.add.existing(this.confirmSellContent)
        this.container.addLocal(this.confirmSellContent)
    }
}
