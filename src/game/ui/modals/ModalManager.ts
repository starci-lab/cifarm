import { EventName } from "@/game/event-bus"
import { BLACK_COLOR, SCALE_TIME } from "../../constants"
import { ShopModal } from "./shop"
import { LayerBaseConstructorParams } from "../../types"
import { getScreenCenterX, getScreenCenterY } from "../utils"
// import { InventoryModal } from "./inventory"
// import { DailyModal } from "./daily"
// import { QuestModal } from "./quest"
// import { StandModal } from "./stand"
// import { NeighborsModal } from "./neighbors"

export enum ModalName {
  Shop = "shop",
  Inventory = "inventory",
  Daily = "daily",
  Quest = "quest",
  Stand = "stand",
  Neighbors = "neighbors",
}

export class ModalManager extends Phaser.GameObjects.Layer {
    private backdrop: Phaser.GameObjects.Rectangle | undefined

    // the shop modal
    private shopModal: ShopModal | undefined
    // inventory modal
    // private inventoryModal: InventoryModal | undefined
    // // daily modal
    // private dailyModal: DailyModal | undefined
    // // quest modal
    // private questModal: QuestModal | undefined
    // //stand modal
    // private standModal: StandModal | undefined
    // private neighborsModal: NeighborsModal | undefined

    constructor({ scene, children }: LayerBaseConstructorParams) {
        super(scene, children)
        // get the width and height of the game
        const { width, height } = this.scene.game.scale
        this.backdrop = this.scene.add
            .rectangle(
                getScreenCenterX(this.scene),
                getScreenCenterY(this.scene),
                width,
                height,
                BLACK_COLOR,
                0.5
            )
            .setInteractive()
        this.add(this.backdrop)

        // create the shop modal
        this.shopModal = new ShopModal({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        }).hide()
        this.scene.add.existing(this.shopModal)
        this.add(this.shopModal)
        // create the inventory modal
        // this.inventoryModal = new InventoryModal({
        //     scene: this.scene,
        //     x: this.x,
        //     y: this.y,
        // }).hide()

        // create the daily modal
        // this.dailyModal = new DailyModal({
        //     scene: this.scene,
        //     x: this.x,
        //     y: this.y,
        // }).hide()

        // create the quest modal
        // this.questModal = new QuestModal({
        //     scene: this.scene,
        //     x: this.x,
        //     y: this.y,
        // }).hide()

        // create the stand modal
        // this.standModal = new StandModal({
        //     scene: this.scene,
        //     x: this.x,
        //     y: this.y,
        // }).hide()

        // this.neighborsModal = new NeighborsModal({
        //     scene: this.scene,
        //     x: this.x,
        //     y: this.y,
        // }).hide()

        this.scene.events.on(EventName.OpenModal, (modalName: ModalName) => {
            this.onOpen(modalName)
        })

        // listen for the close event
        this.scene.events.on(EventName.CloseModal, (modalName: ModalName) => {
            this.onClose(modalName)
        })

        // close the modal manager by default
        this.setActive(false).setVisible(false)
    }

    private getModal(name: ModalName) {
        switch (name) {
        case ModalName.Shop: {
            if (!this.shopModal) {
                throw new Error("Shop modal not found")
            }
            return this.shopModal
        }
        // case ModalName.Inventory: {
        //     if (!this.inventoryModal) {
        //         throw new Error("Shop modal not found")
        //     }
        //     return this.inventoryModal
        // }
        // case ModalName.Daily: {
        //     if (!this.dailyModal) {
        //         throw new Error("Daily modal not found")
        //     }
        //     return this.dailyModal
        // }
        // case ModalName.Quest: {
        //     if (!this.questModal) {
        //         throw new Error("Quest modal not found")
        //     }
        //     return this.questModal
        // }
        // case ModalName.Stand: {
        //     if (!this.standModal) {
        //         throw new Error("Stand modal not found")
        //     }
        //     return this.standModal
        // }
        // case ModalName.Neighbors: {
        //     if (!this.neighborsModal) {
        //         throw new Error("Neighbors modal not found")
        //     }
        //     return this.neighborsModal
        // }
        default: {
            throw new Error("Modal not found")
        }
        }
    }

    private onOpen(name: ModalName) {
        this.setActive(true).setVisible(true)
        const modal = this.getModal(name)
        // disable modal input
        if (this.input) {
            this.input.enabled = false
        }
        // show the modal
        modal.show().setDepth(1).popUp(SCALE_TIME)
        // Wait for the animation to finish, then re-enable interaction
        this.scene.time.delayedCall(SCALE_TIME, () => {
            if (this.input) {
                this.input.enabled = true
            }
        })
    }

    private onClose(name: ModalName) {
        const modal = this.getModal(name)
        // hide the modal
        modal.hide()
        this.setActive(false).setVisible(false)
    }
}
