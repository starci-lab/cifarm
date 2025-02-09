import { BaseAssetKey } from "@/game/assets"
import { EventName } from "@/game/event-bus"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ContainerLiteBaseConstructorParams } from "../../../types"
import { BaseText } from "../../elements"
import { getScreenLeftX, getScreenRightX, onGameObjectClick } from "../../utils"
import { ModalName } from "../ModalManager"

export class InventoryHeader extends ContainerLite {
    // close button
    private closeButton: Phaser.GameObjects.Sprite
    private titleInventory: Phaser.GameObjects.Container

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

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
        this.addLocal(this.titleInventory)


        this.closeButton = scene.add
            .sprite(getScreenRightX(this.scene)/2 - 160, this.y - 480, BaseAssetKey.ModalInventoryBtnClose)
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

        this.addLocal(this.closeButton)
    }
}
