import { EventBus, EventName } from "@/game/event-bus"
import { SCALE_TIME } from "../../constants"
import { getScreenCenterX, getScreenCenterY } from "../utils"
import { DailyModal } from "./daily"
import { InventoryModal } from "./inventory"
import { NeighborsModal } from "./neighbors"
import { QuestModal } from "./quest"
import { ShopModal } from "./shop"
import { StandModal } from "./stand"
import { calculateUiDepth, UILayer } from "@/game/layers"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ContainerLiteBaseConstructorParams } from "@/game/types"
import { TutorialContext } from "@/game/contexts"

export enum ModalName {
  Shop = "shop",
  Inventory = "inventory",
  Daily = "daily",
  Quest = "quest",
  Stand = "stand",
  Neighbors = "neighbors",
}

export class ModalManager extends ContainerLite {
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

    constructor({ scene, x, y, width, height, children } : ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        // create the shop modal
        this.shopModal = new ShopModal({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        }).setDepth(calculateUiDepth({
            layer: UILayer.Modal,
            layerDepth: 1
        })).hide()
        this.scene.add.existing(this.shopModal)

        // this.add(this.shopModal)
        // create the inventory modal
        this.inventoryModal = new InventoryModal({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        }).setDepth(calculateUiDepth({
            layer: UILayer.Modal,
            layerDepth: 1
        })).hide()
        this.scene.add.existing(this.inventoryModal)

        // create the daily modal
        this.dailyModal = new DailyModal({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        }).setDepth(calculateUiDepth({
            layer: UILayer.Modal,
            layerDepth: 1
        })).hide()
        this.scene.add.existing(this.dailyModal)

        // create the quest modal
        this.questModal = new QuestModal({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        }).setDepth(calculateUiDepth({
            layer: UILayer.Modal,
            layerDepth: 1
        })).hide()
        this.scene.add.existing(this.questModal)

        // create the stand modal
        this.standModal = new StandModal({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        }).setDepth(calculateUiDepth({
            layer: UILayer.Modal,
            layerDepth: 1
        })).hide()
        this.scene.add.existing(this.standModal)

        this.neighborsModal = new NeighborsModal({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        }).setDepth(calculateUiDepth({
            layer: UILayer.Modal,
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
        this.hideBackdrop()
    }

    // show method, to show the modal
    private showBackdrop() {
        // do not show the backdrop if the tutorial is active, since the backdrop is used for the tutorial
        if (TutorialContext.isTutorialActive) {
            return
        }
        EventBus.emit(EventName.ShowUIBackdrop, {
            depth: calculateUiDepth({
                layer: UILayer.Modal,
            })
        })
    }

    private hideBackdrop() {
        // do not hide the backdrop if the tutorial is active, since the backdrop is used for the tutorial
        if (TutorialContext.isTutorialActive) {
            return
        }
        EventBus.emit(EventName.HideUIBackdrop)
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
        this.showBackdrop()
        const modal = this.getModal(name)
        // disable modal input
        if (modal.input) {
            modal.input.enabled = false
        }
        // show the modal
        modal.show().popUp(SCALE_TIME)
        // Wait for the animation to finish, then re-enable interaction
        this.scene.time.delayedCall(SCALE_TIME, () => {
            if (modal.input) {
                modal.input.enabled = true
            }
        })
    }

    private onClose(name: ModalName) {
        const modal = this.getModal(name)
        // hide the modal
        modal.hide()
        this.hideBackdrop()
    }
}
