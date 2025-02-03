
import { BaseAssetKey } from "@/game/assets"
import { EventName } from "@/game/event-bus"
import { ContainerBaseConstructorParams } from "../../../types"

export class InventoryModal extends Phaser.GameObjects.Container {
    private wall: Phaser.GameObjects.Image | undefined
    private titleRibbon: Phaser.GameObjects.Image | undefined
    private titleText: Phaser.GameObjects.Text | undefined
    private btnClose: Phaser.GameObjects.Image | undefined

    private inventoryTabs: InventoryTabs

    constructor({ scene, x, y }: ContainerBaseConstructorParams) {
        super(scene, x, y)

        // add the layouts
        const { width } = this.scene.game.scale

        this.wall = scene.add
            .image(0, 0, BaseAssetKey.ModalInventoryWall)
            .setScale(1.1)
        this.add(this.wall)

        // draw title
        this.titleRibbon = scene.add
            .image(0, -480, BaseAssetKey.ModalInventoryTopRibbon)
        this.add(this.titleRibbon)
        
        this.titleText = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: -500,
                text: "Shop",
            },
            options: {
                enableStroke: true,
                fontSize: 64,
            }
        }).setOrigin(0.5, 0.5)
        this.scene.add.existing(this.titleText)
        this.add(this.titleText)

        // draw btn close
        const margin = 150
        this.btnClose = scene.add
            .image(width / 2 - margin, - 400, BaseAssetKey.ModalInventoryBtnClose)
            .setOrigin(1, 0)
            .setDepth(1)
            .setInteractive()

        this.btnClose.on("pointerdown", () => {
            this.scene.events.emit(EventName.ModalClosed)
        })

        this.add(this.btnClose)

        // add inventory tabs
        this.inventoryTabs = new InventoryTabs({
            scene: this.scene,
            x: 200,
            y: 0,
        }).setPosition(-width / 2 + 130, -260)
        this.add(this.inventoryTabs)
    }
}
