import { EventBus, EventName } from "@/game/event-bus"
import { BLACK_COLOR } from "../../constants"

export class ModalManager extends Phaser.GameObjects.Container {
    private backdrop: Phaser.GameObjects.Rectangle | undefined
    private modals: Array<Phaser.GameObjects.Container> = []

    private isOn = false

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        // get the width and height of the game
        const { width, height } = this.scene.game.scale
        this.backdrop = scene.add
            .rectangle(0, 0, width, height, BLACK_COLOR, 0.5)
            .setDepth(1)
            .setInteractive()
            .setActive(false)
            .setVisible(false)
        this.add(this.backdrop)
        EventBus.on(EventName.OpenShop, () => {
            this.setOn()
        })
    }

    shutdown() {
        EventBus.off(EventName.OpenShop)
    }

    public setOn() {
        this.isOn = true
        this.backdrop?.setActive(true).setVisible(true)
    }
}
