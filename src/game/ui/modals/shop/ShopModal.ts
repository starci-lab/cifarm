import { BaseAssetKey } from "@/game/assets"
import { BLACK_COLOR, FONT_DINOSAUR, STROKE_COLOR_1 } from "@/game/constants"
import { ShopTabs } from "./ShopTabs"

export class ShopModal extends Phaser.GameObjects.Container {
    private wall: Phaser.GameObjects.Image | undefined
    private topDecorator: Phaser.GameObjects.Image | undefined
    private topBar: Phaser.GameObjects.Image | undefined
    private shadow: Phaser.GameObjects.Rectangle | undefined
    private titleShop: Phaser.GameObjects.Image | undefined
    private titleShopText: Phaser.GameObjects.Text | undefined
    private bottomBar: Phaser.GameObjects.Image | undefined
    private bottomDecorator: Phaser.GameObjects.Image | undefined
    private shopTabs: ShopTabs

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        // add the layouts
        const { width, height } = this.scene.game.scale

        this.wall = scene.add
            .image(0, 200, BaseAssetKey.ModalShopWall)
            .setScale(1.1)
        this.add(this.wall)

        // draw the shop tabs
        this.shopTabs = new ShopTabs(scene, 0, 0).setPosition(-width / 2 + 20, -580)
        this.add(this.shopTabs)

        this.topDecorator = scene.add
            .image(0, -580, BaseAssetKey.ModalShopTopDecorator)
            .setOrigin(0.5, 1)
        this.add(this.topDecorator)

        this.shadow = scene.add
            .rectangle(0, -500, width, 160, BLACK_COLOR, 0.5)
            .setOrigin(0.5, 0)
        this.add(this.shadow)

        //this.add(shopTabs)
        this.topBar = scene.add
            .image(0, -500, BaseAssetKey.ModalShopTopBar)
        this.add(this.topBar)

        this.titleShop = scene.add
            .image(0, -500, BaseAssetKey.ModalShopTitleShop)
        this.add(this.titleShop)

        this.titleShopText = scene.add
            .text(0, -500, "Shop", {
                fontSize: "80px",
                fontFamily: FONT_DINOSAUR,
                fontStyle: "bold",
            })
            .setStyle({
                stroke: STROKE_COLOR_1,
                strokeThickness: 12,
            })
            .setOrigin(0.5, 0.5)
        this.add(this.titleShopText)

        this.bottomBar = scene.add
            .image(0, height / 2, BaseAssetKey.ModalShopBottomBar)
            .setOrigin(0.5, 1)
        this.add(this.bottomBar)

        this.bottomDecorator = scene.add
            .image(0, height / 2, BaseAssetKey.ModalShopBottomDecorator)
            .setOrigin(0.5, 1)
        this.add(this.bottomDecorator)
    }
}
