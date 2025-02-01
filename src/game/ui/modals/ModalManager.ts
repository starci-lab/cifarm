import { EventName } from "@/game/event-bus"
import { BLACK_COLOR } from "../../constants"
import { ShopModal } from "./shop"

export class ModalManager extends Phaser.GameObjects.Container {
    private backdrop: Phaser.GameObjects.Rectangle | undefined
    private shopModal: Phaser.GameObjects.Container | undefined

    private isOn = false

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        // get the width and height of the game
        const { width, height } = this.scene.game.scale
        this.backdrop = scene.add
            .rectangle(0, 0, width, height, BLACK_COLOR, 0.5)
            .setDepth(1)
            .setInteractive()
        this.add(this.backdrop)

        this.shopModal = new ShopModal(scene, 0, 0)
        this.add(this.shopModal)
        
        this.scene.events.on(EventName.OpenShop, () => {
            this.setOn()
            //play animation on the shop modal
            this.shopModal?.setScale(0) // Start with no scale (hidden)
            // prevent all interactions
            //this.shopModal?.disableInteractive()
            this.scene.tweens.add({
                targets: this.shopModal,
                scaleX: 1,  // Final scale value (zoom in to normal size)
                scaleY: 1,  // Final scale value (zoom in to normal size)
                duration: 500, // Duration of the zoom effect (milliseconds)
                ease: "Back", // Optional easing type, can be 'easeIn', 'easeOut', etc.
                onComplete: () => {
                    // Enable interactions after the animation is complete
                    // this.shopModal?.setInteractive()
                }
            })
            
        })

        this.setActive(false).setVisible(false)
    }

    shutdown() {
        //this.shopModal?.shutdown()
    }

    public setOn() {
        this.isOn = true
        this.setActive(true).setVisible(true)
    }
}
