import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { BaseAssetKey } from "../../../assets"
import { ContainerLiteBaseConstructorParams } from "../../../types"

export class ShopBackground extends ContainerLite {
    private wall: Phaser.GameObjects.Image | undefined
    private bottomBar: Phaser.GameObjects.Image | undefined
    private bottomDecorator: Phaser.GameObjects.Image | undefined

    constructor({ scene, x, y, height, width, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        this.wall = this.scene.add
            .image(0, -170, BaseAssetKey.ModalShopWall)
            .setOrigin(0.5, 1)
        this.pinLocal(this.wall, {
            syncPosition: true,
        })

        this.bottomBar = this.scene.add
            .image(0, 0, BaseAssetKey.ModalShopBottomBar)
            .setOrigin(0.5, 1)
        this.pinLocal(this.bottomBar, {
            syncPosition: true,
        })

        this.bottomDecorator = this.scene.add
            .image(0, 0, BaseAssetKey.ModalShopBottomDecorator)
            .setOrigin(0.5, 1)
        this.pinLocal(this.bottomDecorator, {
            syncPosition: true,
        })
    }
}
