import { BaseAssetKey } from "@/game/assets"
import { ContainerBaseConstructorParams } from "../../../types"

export class StandBackground extends Phaser.GameObjects.Container {
    private wall: Phaser.GameObjects.Image | undefined
    private stand: Phaser.GameObjects.Image | undefined

    constructor({ scene, x, y }: ContainerBaseConstructorParams) {
        super(scene, x, y)

        // Get the width and height of the game
        const { width, height } = this.scene.game.scale

        // add stand in middle
        this.stand = this.scene.add.image(0, 0, BaseAssetKey.ModalStand)
            .setY(-height / 2)
            .setOrigin(0.5, 0.5)

        this.add(this.stand)
    }
}
