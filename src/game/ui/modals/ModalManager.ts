import { EventName } from "@/game/event-bus"
import { BLACK_COLOR } from "../../constants"
import { ShopModal } from "./shop"
import { ContainerBaseConstructorParams } from "../../types"
import { InventoryModal } from "./inventory"

// constants
const OPENED_SCALE = 1
const SCALE_TIME = 500

export class ModalManager extends Phaser.GameObjects.Container {
    private backdrop: Phaser.GameObjects.Rectangle | undefined
    private shopModal: ShopModal | undefined
    private inventoryModal: Phaser.GameObjects.Container | undefined

    constructor({ scene, x, y }: ContainerBaseConstructorParams) {
        super(scene, x, y)

        // get the width and height of the game
        const { width, height } = this.scene.game.scale
        this.backdrop = scene.add
            .rectangle(0, 0, width, height, BLACK_COLOR, 0.5)
            .setDepth(1)
            .setInteractive()
        this.add(this.backdrop)

        this.shopModal = new ShopModal({
            scene,
            x: 0,
            y: 0,
        }).setVisible(false).setActive(false)
        this.add(this.shopModal)
        
        // listen for the open shop event
        this.scene.events.on(EventName.OpenShop, () => {
            this.openShopModal()
        })

        // Inventory Modal
        this.inventoryModal = new InventoryModal({
            scene,
            x: 0,
            y: 0,
        }).setVisible(false).setActive(false)
        this.add(this.inventoryModal)

        // listen for the open inventory event
        this.scene.events.on(EventName.OpenInventory, () => {
            this.openInventoryModal()
        })

        // listen for the close inventory event
        this.scene.events.on(EventName.CloseInventory, () => {
            this.closeInventoryModal()
            this.setOff()
        })

        // close the modal manager by default
        this.setActive(false).setVisible(false)
    }

    shutdown() {
        //this.shopModal?.shutdown()
        //this.inventoryModal?.shutdown()
    }

    // set the modal manager to be active and visible
    private setOn() {
        this.setActive(true).setVisible(true)
    }

    // set the modal manager to be inactive and invisible
    private setOff() {
        this.setActive(false).setVisible(false)
    }

    private openShopModal() {
        // set the modal manager to be active and visible
        this.setOn()
        // set the shop modal to be active and visible
        this.shopModal?.setActive(true).setVisible(true)
        //play animation on the shop modal
        this.shopModal?.setScale(0) // Start with no scale (hidden)
        // prevent all interactions
        //this.shopModal?.disableInteractive()
        this.scene.tweens.add({
            targets: this.shopModal,
            scaleX: OPENED_SCALE,  // Final scale value (zoom in to normal size)
            scaleY: OPENED_SCALE,  // Final scale value (zoom in to normal size)
            duration: SCALE_TIME, // Duration of the zoom effect (milliseconds)
            ease: "Back", // Optional easing type, can be 'easeIn', 'easeOut', etc.
            onComplete: () => {
                // Enable interactions after the animation is complete
                // this.shopModal?.setInteractive()
            }
        })
    }

    private openInventoryModal() {
        // set the modal manager to be active and visible
        this.setOn()
        // set the shop modal to be active and visible
        this.inventoryModal?.setActive(true).setVisible(true)
        //play animation on the inventory modal
        this.inventoryModal?.setScale(0) // Start with no scale (hidden)
        // prevent all interactions
        // this.shopModal?.disableInteractive()
        // this.inventoryModal?.disableInteractive()
        this.scene.tweens.add({
            targets: this.inventoryModal,
            scaleX: OPENED_SCALE,  // Final scale value (zoom in to normal size)
            scaleY: OPENED_SCALE,  // Final scale value (zoom in to normal size)
            duration: SCALE_TIME, // Duration of the zoom effect (milliseconds)
            ease: "Back", // Optional easing type, can be 'easeIn', 'easeOut', etc.
            onComplete: () => {
                // Enable interactions after the animation is complete
                //this.inventoryModal?.setInteractive()
            }
        })
    }

    private closeInventoryModal() {
        this.inventoryModal?.setVisible(false).setActive(false)
    }
}
