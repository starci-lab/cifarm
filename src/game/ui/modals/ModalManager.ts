import { calculateUiDepth, UILayer } from "@/game/layers"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { SCALE_TIME } from "../../constants"
import {
    CloseModalMessage,
    EventBus,
    EventName,
    ModalName,
    OpenModalMessage,
} from "../../event-bus"
import { CacheKey, ContainerLiteBaseConstructorParams } from "../../types"
import { getScreenCenterX, getScreenCenterY } from "../utils"
import { AnimalHousingModal } from "./animal-housing"
import { DailyModal } from "./daily"
import { InventoryModal } from "./inventory"
import { ShopModal } from "./shop"
import { InputQuantityModal, SelectProductModal, StandModal } from "./stand"
import { ClaimModal } from "./claim"
import { SettingsModal } from "./settings"
import { UpgradeBuildingModal } from "./upgrade-building"
import { ConfirmModal } from "./confirm"
import { SpinModal } from "./spin"

export const MODAL_BACKDROP_DEPTH_1 = calculateUiDepth({
    layer: UILayer.Modal,
})
export const MODAL_DEPTH_1 = calculateUiDepth({
    layer: UILayer.Modal,
    additionalDepth: 1,
})
export const MODAL_BACKDROP_DEPTH_2 = calculateUiDepth({
    layer: UILayer.Modal,
    additionalDepth: 10,
})
export const MODAL_DEPTH_2 = calculateUiDepth({
    layer: UILayer.Modal,
    additionalDepth: 11,
})
export const TUTORIAL_BACKDROP_DEPTH = calculateUiDepth({
    layer: UILayer.Tutorial,
})

const EXTERNAL_MODAL_OPACITY_LEVEL = 0.67

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
    private animalHousingModal: AnimalHousingModal | undefined
    private confirmModal: ConfirmModal | undefined

    private externalModalNames = [ ModalName.Neighbors, ModalName.Quests, ModalName.Profile ]
    private upgradeBuildingModal: UpgradeBuildingModal | undefined
    private spinModal: SpinModal | undefined

    constructor({ scene, x, y, width, height, children } : ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        const centerX = getScreenCenterX(this.scene)
        const centerY = getScreenCenterY(this.scene)
        // create the shop modal
        this.shopModal = new ShopModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(MODAL_DEPTH_1)
            .hide()
        this.scene.add.existing(this.shopModal)

        // this.add(this.shopModal)
        // create the inventory modal
        this.inventoryModal = new InventoryModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(MODAL_DEPTH_1)
            .hide()
        this.scene.add.existing(this.inventoryModal)

        // create the daily modal
        this.dailyModal = new DailyModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(MODAL_DEPTH_1)
            .hide()
        this.scene.add.existing(this.dailyModal)

        // create the settings modal
        this.settingsModal = new SettingsModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(MODAL_DEPTH_1)
            .hide()
        this.scene.add.existing(this.settingsModal)

        // create the stand modal
        this.standModal = new StandModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(MODAL_DEPTH_1)
            .hide()
        this.scene.add.existing(this.standModal)

        this.upgradeBuildingModal = new UpgradeBuildingModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        }).setDepth(MODAL_DEPTH_1).hide()
        this.scene.add.existing(this.upgradeBuildingModal)
        
        //selected product is a chained modal, so that it stay in layer depth 2 + 9, default is for the modal
        this.selectProductModal = new SelectProductModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(MODAL_DEPTH_2)
            .hide()
        this.scene.add.existing(this.selectProductModal)
        // create the input quantity modal
        this.inputQuantityModal = new InputQuantityModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(MODAL_DEPTH_2)
            .hide()
        this.scene.add.existing(this.inputQuantityModal)
        // create the input quantity modal
        this.claimModal = new ClaimModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(MODAL_DEPTH_2)
            .hide()
        this.scene.add.existing(this.inputQuantityModal)

        this.animalHousingModal = new AnimalHousingModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(MODAL_DEPTH_1)
            .hide()
        this.scene.add.existing(this.animalHousingModal)

        // create the input quantity modal
        this.confirmModal = new ConfirmModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(MODAL_DEPTH_2)
            .hide()
        this.scene.add.existing(this.confirmModal)

        this.spinModal = new SpinModal({
            scene: this.scene,
            x: centerX,
            y: centerY,
        })
            .setDepth(MODAL_DEPTH_1)
            .hide()

        EventBus.on(EventName.OpenModal, (message: OpenModalMessage) => {
            this.onOpen(message)
        })

        // listen for the close event
        EventBus.on(EventName.CloseModal, (message: CloseModalMessage) => {
            this.onClose(message)
        })

        // test for warning modal
        this.scene.events.emit(EventName.UpdateConfirmModal, {
            message: "This is a test message",
            callback: () => {
                console.log("callback")
            }
        })
        EventBus.emit(EventName.OpenModal, {
            modalName: ModalName.Confirm,
        })

    }

    // show method, to show the modal
    private showBackdrop({
        showTutorialBackdrop = false,
        modalName,
        opacityLevel = 1,
    }: ShowBackdropParams = {}) {
    // do not show the backdrop if the tutorial is active, since the backdrop is used for the tutorial
        if (this.checkTutorialActive()) {
            if (showTutorialBackdrop) {
                EventBus.emit(EventName.ShowUIBackdrop, {
                    depth: TUTORIAL_BACKDROP_DEPTH,
                })
            }
            return
        }
        let depth = MODAL_BACKDROP_DEPTH_1

        switch (modalName) {
        case ModalName.SelectProduct:
        case ModalName.InputQuantity:
        case ModalName.Claim:
            depth = MODAL_BACKDROP_DEPTH_2
            break
        }
        EventBus.emit(EventName.ShowUIBackdrop, {
            depth,
            opacityLevel,
        })
    }

    private hideBackdrop({
        hideTutorialBackdrop = false,
        modalName,
    }: HideBackdropParams) {
    // do not hide the backdrop if the tutorial is active, since the backdrop is used for the tutorial
        if (this.checkTutorialActive()) {
            if (hideTutorialBackdrop) {
                EventBus.emit(EventName.HideUIBackdrop)
            }
            return
        }
        //check if modal is chained
        switch (modalName) {
        case ModalName.SelectProduct:
        case ModalName.InputQuantity:
        case ModalName.Claim:
            EventBus.emit(EventName.UpdateUIBackdrop, {
                depth: MODAL_BACKDROP_DEPTH_1,
            })
            return
        }
        EventBus.emit(EventName.HideUIBackdrop)
    }

    private checkTutorialActive() {
        return this.scene.cache.obj.get(CacheKey.TutorialActive)
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
        case ModalName.AnimalHousing: {
            if (!this.animalHousingModal) {
                throw new Error("Animal Housing modal not found")
            }
            return this.animalHousingModal
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
        case ModalName.Confirm: {
            if (!this.confirmModal) {
                throw new Error("Confirm modal not found")
            }
            return this.confirmModal
        }
        case ModalName.Spin: {
            if (!this.spinModal) {
                throw new Error("Spin modal not found")
            }
            return this.spinModal
        }
        case ModalName.Neighbors:
        case ModalName.Quests:
        case ModalName.Profile:
            throw new Error("External modals should not be opened directly")
        }
    }

    // open the modal
    private onOpen({ modalName, showTutorialBackdrop }: OpenModalMessage) {
        if (this.externalModalNames.includes(modalName)) {
            EventBus.emit(EventName.OpenExternalModal, {
                modalName
            })
            this.showBackdrop({
                modalName,
                showTutorialBackdrop,
                opacityLevel: EXTERNAL_MODAL_OPACITY_LEVEL,
            })
            return
        }
        const modal = this.getModal(modalName)
        this.showBackdrop({
            modalName,
            showTutorialBackdrop,
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
    private onClose({ modalName, hideTutorialBackdrop }: CloseModalMessage) {
        if (!this.externalModalNames.includes(modalName)) {
            const modal = this.getModal(modalName)
            // hide the modal
            modal.hide()
        }
        this.hideBackdrop({ modalName, hideTutorialBackdrop })
    }
}

interface ShowBackdropParams {
  showTutorialBackdrop?: boolean;
  modalName?: ModalName;
  opacityLevel?: number;
}

interface HideBackdropParams {
  hideTutorialBackdrop?: boolean;
  modalName?: ModalName;
}
