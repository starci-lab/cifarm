import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { SCALE_TIME } from "../../constants"
import { ContainerLiteBaseConstructorParams } from "../../types"
import { getScreenCenterX, getScreenCenterY } from "../utils"
import { DailyModal } from "./daily"
import { InventoryModal } from "./inventory"
import { ShopModal } from "./shop"
import { InputQuantityModal, SelectProductModal, StandModal } from "./stand"
import { ClaimModal } from "./claim"
import { SettingsModal } from "./settings"
import { UpgradeBuildingModal } from "./upgrade-building"
import {
    CloseExternalModalMessage,
    CloseModalMessage,
    ExternalEventEmitter,
    ExternalEventName,
    ModalName,
    OpenModalMessage,
    SceneEventEmitter,
    SceneEventName,
    ShowBackdropMessage
} from "../../events"
import { uiDepth } from "../../depth"

export class ModalManager extends ContainerLite {
    // the shop modal
    private shopModal: ShopModal | undefined
    // inventory modal
    private inventoryModal: InventoryModal | undefined
    // // daily modal
    private dailyModal: DailyModal | undefined
    // //stand modal
    private standModal: StandModal | undefined
    // // select product modal
    private selectProductModal: SelectProductModal | undefined
    // // input quantity modal
    private inputQuantityModal: InputQuantityModal | undefined
    // claim modal
    private claimModal: ClaimModal | undefined
    // animal housing modal
    private settingsModal: SettingsModal | undefined

    private externalModalNames = [
        ModalName.Neighbors,
        ModalName.Quests,
        ModalName.Profile,
    ]
    private upgradeBuildingModal: UpgradeBuildingModal | undefined

    constructor({
        scene,
        x,
        y,
        width,
        height,
        children,
    }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        const centerX = getScreenCenterX(this.scene)
        const centerY = getScreenCenterY(this.scene)
        // create the shop modal
        this.shopModal = new ShopModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(uiDepth.modal.modal1)
            .hide()
        this.scene.add.existing(this.shopModal)

        // this.add(this.shopModal)
        // create the inventory modal
        this.inventoryModal = new InventoryModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(uiDepth.modal.modal1)
            .hide()
        this.scene.add.existing(this.inventoryModal)

        // create the daily modal
        this.dailyModal = new DailyModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(uiDepth.modal.modal1)
            .hide()
        this.scene.add.existing(this.dailyModal)

        // create the settings modal
        this.settingsModal = new SettingsModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(uiDepth.modal.modal1)
            .hide()
        this.scene.add.existing(this.settingsModal)

        // create the stand modal
        this.standModal = new StandModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(uiDepth.modal.modal1)
            .hide()
        this.scene.add.existing(this.standModal)

        this.upgradeBuildingModal = new UpgradeBuildingModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(uiDepth.modal.modal1)
            .hide()
        this.scene.add.existing(this.upgradeBuildingModal)

        //selected product is a chained modal, so that it stay in layer depth 2 + 9, default is for the modal
        this.selectProductModal = new SelectProductModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(uiDepth.modal.modal2)
            .hide()
        this.scene.add.existing(this.selectProductModal)
        // create the input quantity modal
        this.inputQuantityModal = new InputQuantityModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(uiDepth.modal.modal2)
            .hide()
        this.scene.add.existing(this.inputQuantityModal)
        // create the input quantity modal
        this.claimModal = new ClaimModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(uiDepth.modal.modal2)
            .hide()
        this.scene.add.existing(this.inputQuantityModal)

        SceneEventEmitter.on(
            SceneEventName.OpenModal,
            (message: OpenModalMessage) => {
                // check if modal is external
                this.onOpen(message)
            }
        )

        // listen for the close event
        SceneEventEmitter.on(
            SceneEventName.CloseModal,
            (message: CloseModalMessage) => {
                this.onClose(message)
            }
        )

        ExternalEventEmitter.on(
            ExternalEventName.CloseExternalModal,
            (message: CloseExternalModalMessage) => {
                this.onClose(message)
            }
        )       
    }

    // show method, to show the modal
    private showBackdrop({
        modalName,
        transparency = false,
    }: ShowBackdropParams = {}) {
        let depth = uiDepth.modal.modalBackdrop1

        switch (modalName) {
        case ModalName.SelectProduct:
        case ModalName.InputQuantity:
        case ModalName.Claim:
            depth = uiDepth.modal.modalBackdrop2
            break
        }
        const showBackdropMessage: ShowBackdropMessage = {
            depth,
            transparency,
        }
        SceneEventEmitter.emit(SceneEventName.ShowBackdrop, showBackdropMessage)
    }

    private hideBackdrop({ modalName }: HideBackdropParams) {
    //check if modal is chained
        switch (modalName) {
        case ModalName.SelectProduct:
        case ModalName.InputQuantity:
        case ModalName.Claim:
            SceneEventEmitter.emit(SceneEventName.UpdateBackdrop, {
                depth: uiDepth.modal.modalBackdrop1,
            })
            return
        }
        SceneEventEmitter.emit(SceneEventName.HideBackdrop)
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
        case ModalName.Claim: {
            if (!this.claimModal) {
                throw new Error("Claim modal not found")
            }
            return this.claimModal
        }
        case ModalName.Settings: {
            if (!this.settingsModal) {
                throw new Error("Settings modal not found")
            }
            return this.settingsModal
        }
        case ModalName.UpgradeBuilding: {
            if (!this.upgradeBuildingModal) {
                throw new Error("Upgrade Building modal not found")
            }
            return this.upgradeBuildingModal
        }
        case ModalName.Neighbors:
        case ModalName.Quests:
        case ModalName.Profile:
            throw new Error("External modals should not be opened directly")
        }
    }

    // open the modal
    private onOpen({ modalName }: OpenModalMessage) {
        if (this.externalModalNames.includes(modalName)) {
            ExternalEventEmitter.emit(ExternalEventName.OpenExternalModal, {
                modalName,
            })
            this.showBackdrop({
                modalName,
                transparency: true,
            })
            return
        }
        const modal = this.getModal(modalName)
        this.showBackdrop({
            modalName,
        })
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

    // close the modal
    private onClose({ modalName }: CloseModalMessage) {
        if (!this.externalModalNames.includes(modalName)) {
            const modal = this.getModal(modalName)
            // hide the modal
            modal.hide()
        }
        this.hideBackdrop({ modalName })
    }
}

interface ShowBackdropParams {
  modalName?: ModalName;
  transparency?: boolean;
}

interface HideBackdropParams {
  modalName?: ModalName;
}
