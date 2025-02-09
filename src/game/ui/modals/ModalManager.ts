import { EventName } from "@/game/event-bus"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { BLACK_COLOR, SCALE_TIME } from "../../constants"
import { ContainerLiteBaseConstructorParams } from "../../types"
import { getScreenCenterX, getScreenCenterY } from "../utils"
import { DailyModal } from "./daily"
import { InventoryModal } from "./inventory"
import { NeighborsModal } from "./neighbors"
import { QuestModal } from "./quest"
import { ShopModal } from "./shop"
import { StandModal } from "./stand"
import { calculateDepth, SceneLayer } from "@/game/layers"

export enum ModalName {
  Shop = "shop",
  Inventory = "inventory",
  Daily = "daily",
  Quest = "quest",
  Stand = "stand",
  Neighbors = "neighbors",
}

export class ModalManager extends ContainerLite {
    // the backdrop
    private backdrop: Phaser.GameObjects.Rectangle | undefined
    // the shop modal
    private shopModal: ShopModal | undefined
    // inventory modal
    private inventoryModal: InventoryModal | undefined
    // // daily modal
    private dailyModal: DailyModal | undefined
    // // quest modal
    private questModal: QuestModal | undefined
    // //stand modal
    private standModal: StandModal | undefined
    // neighbors
    private neighborsModal: NeighborsModal | undefined

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)
        // get the width and height of the game
        this.backdrop = this.scene.add
            .rectangle(
                getScreenCenterX(this.scene),
                getScreenCenterY(this.scene),
                width,
                height,
                BLACK_COLOR,
                0.5
            )
            .setInteractive().setDepth(calculateDepth({
                layer: SceneLayer.Modal,
            }))
        this.add(this.backdrop)

        // create the shop modal
        this.shopModal = new ShopModal({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        }).setDepth(calculateDepth({
            layer: SceneLayer.Modal,
            layerDepth: 1
        })).hide()
        this.scene.add.existing(this.shopModal)

        // this.add(this.shopModal)
        // create the inventory modal
        this.inventoryModal = new InventoryModal({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
            width,
            height
        }).setDepth(calculateDepth({
            layer: SceneLayer.Modal,
            layerDepth: 1
        })).hide()
        this.scene.add.existing(this.inventoryModal)

        // create the daily modal
        this.dailyModal = new DailyModal({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        }).setDepth(calculateDepth({
            layer: SceneLayer.Modal,
            layerDepth: 1
        })).hide()
        this.scene.add.existing(this.dailyModal)

        // create the quest modal
        this.questModal = new QuestModal({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        }).setDepth(calculateDepth({
            layer: SceneLayer.Modal,
            layerDepth: 1
        })).hide()
        this.scene.add.existing(this.questModal)

        // create the stand modal
        this.standModal = new StandModal({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
            width,
            height,
        }).setDepth(calculateDepth({
            layer: SceneLayer.Modal,
            layerDepth: 1
        })).hide()
        this.scene.add.existing(this.standModal)

        this.neighborsModal = new NeighborsModal({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        }).setDepth(calculateDepth({
            layer: SceneLayer.Modal,
            layerDepth: 1
        })).hide()
        this.scene.add.existing(this.neighborsModal)

        this.scene.events.on(EventName.OpenModal, (modalName: ModalName) => {
            this.onOpen(modalName)
        })

        // listen for the close event
        this.scene.events.on(EventName.CloseModal, (modalName: ModalName) => {
            this.onClose(modalName)
        })

        // close the modal manager by default
        this.setActive(false).setVisible(false)

        // set the depth
        this.setDepth(calculateDepth({
            layer: SceneLayer.Modal
        }))
    }

    private getModal(name: ModalName) {
        switch (name) {
        case ModalName.Shop: {
            if (!this.shopModal) {
                throw new Error("Shop modal not found")
            }
            return this.shopModal
        }
        case ModalName.Inventory: {
            if (!this.inventoryModal) {
                throw new Error("Shop modal not found")
            }
            return this.inventoryModal
        }
        case ModalName.Daily: {
            if (!this.dailyModal) {
                throw new Error("Daily modal not found")
            }
            return this.dailyModal
        }
        case ModalName.Quest: {
            if (!this.questModal) {
                throw new Error("Quest modal not found")
            }
            return this.questModal
        }
        case ModalName.Stand: {
            if (!this.standModal) {
                throw new Error("Stand modal not found")
            }
            return this.standModal
        }
        case ModalName.Neighbors: {
            if (!this.neighborsModal) {
                throw new Error("Neighbors modal not found")
            }
            return this.neighborsModal
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
        modal.show()
        // scale the modal to 1
        modal.setScale(0)
        // animate the modal
        this.scene.tweens.add({
            targets: modal,
            scaleX: 1,
            scaleY: 1,
            duration: SCALE_TIME,
            ease: "Back",
        })
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
