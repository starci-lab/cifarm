
import { BaseAssetKey } from "@/game/assets"
import { InventoryTabs } from "./InventoryTabs"
import { FONT_DINOSAUR, STROKE_COLOR_1 } from "@/game/constants"
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

        this.titleText = scene.add
            .text(20, -500, "Inventory", {
                fontSize: "40px",
                fontFamily: FONT_DINOSAUR,
                fontStyle: "bold",
            })
            .setStyle({
                stroke: STROKE_COLOR_1,
                strokeThickness: 12,
            })
            .setOrigin(0.5, 0.5)
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
        this.inventoryTabs = new InventoryTabs(scene, 0, 0).setPosition(-width / 2 + 20, -580)
        this.add(this.inventoryTabs)
    }
}
