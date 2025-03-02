import { ShopContent } from "./ShopContent"
import { BaseSizerBaseConstructorParams } from "@/game/types"
import { getScreenBottomY, getScreenCenterX } from "../../utils"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"

// shop modal extends BaseSizer
export class ShopModal extends BaseSizer {
    private container: ContainerLite
    private shopContent: ShopContent

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
            getScreenBottomY(this.scene) - 100
        )
        this.add(this.container)

        //create the shop content
        this.shopContent = new ShopContent({
            scene: this.scene,
        })
        this.scene.add.existing(this.shopContent)
        this.container.addLocal(this.shopContent)
    }
}
