import { BaseSizerBaseConstructorParams } from "@/game/types"
import { getScreenCenterX, getScreenCenterY } from "../../utils"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { ConfirmContent } from "./ConfirmSellContent"

// shop modal extends BaseSizer
export class ConfirmModal extends BaseSizer {
    private container: ContainerLite
    private confirmContent: ConfirmContent

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
        this.confirmContent = new ConfirmContent({
            scene: this.scene,
        })
        this.scene.add.existing(this.confirmContent)
        this.container.addLocal(this.confirmContent)
    }
}
