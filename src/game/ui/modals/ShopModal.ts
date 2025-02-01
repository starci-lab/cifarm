export class ShopModal extends Phaser.GameObjects.Container {
    private background: Phaser.GameObjects.Image | undefined

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.background = scene.add.image(0, 0, "shop-modal")
        this.add(this.background)
    }
}