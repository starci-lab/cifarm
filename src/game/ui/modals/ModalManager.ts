import { calculateUiDepth, UILayer } from "@/game/layers"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { SCALE_TIME } from "../../constants"
import { CloseModalMessage, EventBus, EventName, ModalName, OpenModalMessage } from "../../event-bus"
import { ContainerLiteBaseConstructorParams } from "../../types"
import { DailyModal } from "./daily"
import { InventoryModal } from "./inventory"
import { NeighborsModal } from "./neighbors"
import { QuestModal } from "./quest"
import { ShopModal } from "./shop"
import { InputQuantityModal, SelectProductModal, StandModal } from "./stand"
import { getScreenCenterX } from "../utils"


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
    // // select product modal
    private selectProductModal: SelectProductModal | undefined
    // // input quantity modal
    private inputQuantityModal: InputQuantityModal | undefined
    //private inputQuantityModal: StandModal | undefined
    // neighbors
    private neighborsModal: NeighborsModal | undefined

    constructor({ scene, x, y, width, height, children } : ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        const centerX = getScreenCenterX(this.scene)
        const centerY = getScreenCenterX(this.scene)
        // create the shop modal
        this.shopModal = new ShopModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        }).setDepth(calculateUiDepth({
            layer: UILayer.Modal,
            layerDepth: 1
        })).hide()
        this.scene.add.existing(this.shopModal)

        // this.add(this.shopModal)
        // create the inventory modal
        this.inventoryModal = new InventoryModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        }).setDepth(calculateUiDepth({
            layer: UILayer.Modal,
            layerDepth: 1
        })).hide()
        this.scene.add.existing(this.inventoryModal)

        // create the daily modal
        this.dailyModal = new DailyModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        }).setDepth(calculateUiDepth({
            layer: UILayer.Modal,
            layerDepth: 1
        })).hide()
        this.scene.add.existing(this.dailyModal)

        // create the quest modal
        this.questModal = new QuestModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        }).setDepth(calculateUiDepth({
            layer: UILayer.Modal,
            layerDepth: 1
        })).hide()
        this.scene.add.existing(this.questModal)

        // create the stand modal
        this.standModal = new StandModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        }).setDepth(calculateUiDepth({
            layer: UILayer.Modal,
            layerDepth: 1
        })).hide()
        this.scene.add.existing(this.standModal)

        this.neighborsModal = new NeighborsModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        }).setDepth(calculateUiDepth({
            layer: UILayer.Modal,
            layerDepth: 1
        })).hide()
        this.scene.add.existing(this.neighborsModal)
        
        //selected product is a chained modal, so that it stay in layer depth 2 + 9, default is for the modal
        this.selectProductModal = new SelectProductModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        }).setDepth(calculateUiDepth({
            layer: UILayer.Modal,
            layerDepth: 2,
            additionalDepth: 1
        })).hide()
        this.scene.add.existing(this.selectProductModal)
        // create the input quantity modal
        this.inputQuantityModal = new InputQuantityModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        }).setDepth(calculateUiDepth({
            layer: UILayer.Modal,
            layerDepth: 2,
            additionalDepth: 1
        })).hide()
        this.scene.add.existing(this.inputQuantityModal)

        EventBus.on(EventName.OpenModal, (message: OpenModalMessage) => {
            this.onOpen(message)
        })

        // listen for the close event
        EventBus.on(EventName.CloseModal, (message: CloseModalMessage) => {
            this.onClose(message)
        })

        // close the modal manager by default
        this.hideBackdrop()
    }
 
    // show method, to show the modal
    private showBackdrop({ showTutorialBackdrop = false, modalName }: ShowBackdropParams = {}) {
        // do not show the backdrop if the tutorial is active, since the backdrop is used for the tutorial
        if (this.checkTutorialActive()) {
            if (showTutorialBackdrop) {
                EventBus.emit(EventName.ShowUIBackdrop, {
                    depth: calculateUiDepth({
                        layer: UILayer.Tutorial,
                    })
                })
            }
            return
        }
        let depth = calculateUiDepth({
            layer: UILayer.Modal,
        })

        switch (modalName) {
        case ModalName.SelectProduct:
        case ModalName.InputQuantity:
            depth = calculateUiDepth({
                layer: UILayer.Modal,
                layerDepth: 2
            })
            break
        }
        EventBus.emit(EventName.ShowUIBackdrop, {
            depth
        })
    }

    private hideBackdrop(hideTutorialBackdrop?: boolean) {
        // do not hide the backdrop if the tutorial is active, since the backdrop is used for the tutorial
        // if (this.checkTutorialActive()) {
        //     if (hideTutorialBackdrop) {
        //         EventBus.emit(EventName.HideUIBackdrop)
        //     }
        //     return
        // }
        EventBus.emit(EventName.HideUIBackdrop)
    }

    private checkTutorialActive() {
        return false
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
        case ModalName.SelectProduct: {
            if (!this.selectProductModal) {
                throw new Error("Select product modal not found")
            }
            return this.selectProductModal
        }
        case ModalName.InputQuantity: {
            if (!this.inputQuantityModal) {
                throw new Error("Input quantity modal not found")
            }
            return this.inputQuantityModal
        }
        case ModalName.Neighbors: {
            if (!this.neighborsModal) {
                throw new Error("Neighbors modal not found")
            }
            return this.neighborsModal
        }
        }
    }
    
    // open the modal
    private onOpen({ modalName, showTutorialBackdrop }: OpenModalMessage) {
        this.showBackdrop({ modalName, showTutorialBackdrop })
        const modal = this.getModal(modalName)
        // disable modal input
        if (modal.input) {
            modal.input.enabled = false
        }
        // show the modal
        modal?.show()?.popUp(SCALE_TIME)
        // Wait for the animation to finish, then re-enable interaction
        this.scene.time.delayedCall(SCALE_TIME, () => {
            if (modal.input) {
                modal.input.enabled = true
            }
        })
    }

    // close the modal
    private onClose({ modalName, hideTutorialBackdrop }: CloseModalMessage) {
        const modal = this.getModal(modalName)
        // hide the modal
        modal.hide()
        this.hideBackdrop(hideTutorialBackdrop)
    }
}

interface ShowBackdropParams {
    showTutorialBackdrop?: boolean
    modalName?: ModalName
}
