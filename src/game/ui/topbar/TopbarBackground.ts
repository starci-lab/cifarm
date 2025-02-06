import { BaseAssetKey } from "../../assets"
import { ContainerBaseConstructorParams } from "../../types"

export class TopbarBackground extends Phaser.GameObjects.Container {
    private background: Phaser.GameObjects.Image

    constructor({ scene, x, y }: ContainerBaseConstructorParams) {
        super(scene, x, y)
        // create the background
        this.background = this.scene.add
            .image(0, 0, BaseAssetKey.TopbarBackground)
            .setOrigin(0.5, 1)
        this.add(this.background)

    }
}
