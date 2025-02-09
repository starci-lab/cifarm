import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { BaseAssetKey } from "../../assets"
import { ContainerLiteBaseConstructorParams } from "../../types"

export class TopbarBackground extends ContainerLite {
    private background: Phaser.GameObjects.Image

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)
        // create the background
        this.background = this.scene.add
            .image(0, 0, BaseAssetKey.TopbarHeader)
            .setOrigin(0.5, 1)
        
        this.addLocal(this.background)
    }
}
