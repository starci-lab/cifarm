import { ContainerBaseConstructorParams } from "../../../types"
import { BaseText } from "../../elements"
import { BaseAssetKey } from "@/game/assets"
import { onGameObjectClick } from "../../utils"
import { EventName } from "@/game/event-bus"
import { ModalName } from "../ModalManager"

export class InventoryHeader extends Phaser.GameObjects.Container {
    // close button
    private closeButton: Phaser.GameObjects.Sprite
    private titleInventory: Phaser.GameObjects.Container

    constructor({ scene, x, y }: ContainerBaseConstructorParams) {
        const { width } = scene.game.scale
        super(
            scene,
            x ?? 0,
            y ?? 0,
        )

        const frame = this.scene.add.image(
            0,
            0,
            BaseAssetKey.ModalInventoryTopRibbon
        )
        
        // create the text
        const text = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: -20,
                text: "Inventory"
            },
            options: {
                fontSize: 48,
            },
        })
        this.scene.add.existing(text)

        // add the text to the label
        this.titleInventory = this.scene.add.container(0, 0)
        this.titleInventory.add(frame)
        this.titleInventory.add(text)
        this.add(this.titleInventory)

        // draw btn close
        const margin = 150
        this.closeButton = scene.add
            .sprite(width / 2 - margin, this.y - 480, BaseAssetKey.ModalInventoryBtnClose)
            .setOrigin(1, 0)
            .setDepth(1)
            .setInteractive()

        this.closeButton.setInteractive().on("pointerdown", () => {
            onGameObjectClick({
                gameObject: this.closeButton,
                scene: this.scene,
                onClick: () => {
                    this.scene.events.emit(EventName.CloseModal, ModalName.Inventory)
                },
            })
        })

        this.add(this.closeButton)
    }
}
