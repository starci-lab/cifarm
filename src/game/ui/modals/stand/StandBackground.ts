import { BaseAssetKey } from "@/game/assets"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ContainerLiteBaseConstructorParams } from "../../../types"

export class StandBackground extends ContainerLite {
    private stand: Phaser.GameObjects.Image | undefined

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        // add stand in middle
        this.stand = this.scene.add.image(0, 0, BaseAssetKey.ModalStand)
            .setOrigin(0.5, 0.5)

        this.addLocal(this.stand)
    }
}
