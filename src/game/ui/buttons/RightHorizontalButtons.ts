import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey } from "../../assets"
import { EventBus, EventName, ModalName, OpenModalMessage, ShowPressHereArrowMessage } from "../../event-bus"
import { HorizontalButtons } from "./HorizontalButtons"
import { ButtonsBaseConstructorParams, CacheKey } from "@/game/types"
import { restoreTutorialDepth, setTutorialDepth } from "../tutorial"

export class RightHorizontalButtons extends HorizontalButtons {
    private settingButton: Sizer
    private inventoryButton: Sizer
    private dailyButton: Sizer
    private questButton: Sizer
    private moveButton: Sizer
    private sellButton: Sizer
    

    constructor(baseParams: ButtonsBaseConstructorParams) {
        super({
            baseParams: {
                scene: baseParams.scene,
                config: {
                    ...baseParams.config,
                    originX: 1,
                    originY: 0,
                }
            },
            options: {
                orientation: "y",
                space: 36,
            }
        })

        this.settingButton = this.createButton({
            iconKey: BaseAssetKey.UIIconSetting,
            text: "Settings",
            onPress: () => {
                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.Settings
                }
                EventBus.emit(EventName.OpenModal, eventMessage)
            },
        })
        this.addButton(this.settingButton)

        // add inventory button
        this.inventoryButton = this.createButton({
            iconKey: BaseAssetKey.UIIconInventory,
            text: "Inventory",
            onPress: () => {
                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.Inventory
                }
                EventBus.emit(EventName.OpenModal, eventMessage)
                if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                    // return to normal depth
                    restoreTutorialDepth({
                        gameObject: this.inventoryButton,
                    })
                    // emit the event
                    this.scene.events.emit(EventName.TutorialInventoryButtonPressed)
                    // hide the press here arrow
                    this.scene.events.emit(EventName.HidePressHereArrow)
                }
            },
        })
        this.addButton(this.inventoryButton)

        // add daily button
        this.dailyButton = this.createButton({
            iconKey: BaseAssetKey.UIIconDaily,
            text: "Daily",
            onPress: () => {
                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.Daily
                }
                EventBus.emit(EventName.OpenModal, eventMessage)
            },
        })
        this.addButton(this.dailyButton)

        // add quest button
        this.questButton = this.createButton({
            iconKey: BaseAssetKey.UIIconQuests,
            text: "Quest",
            onPress: () => {
                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.Quests
                }
                EventBus.emit(EventName.OpenModal, eventMessage)
            },
        })
        this.addButton(this.questButton)

        // add move button
        this.moveButton = this.createButton({
            iconKey: BaseAssetKey.UIIconMove,
            text: "Move",
            onPress: () => {
                EventBus.emit(EventName.MovingModeOn)
            },
        })
        this.addButton(this.moveButton)

        // add move button
        this.sellButton = this.createButton({
            iconKey: BaseAssetKey.UIIconSell,
            text: "Sell",
            onPress: () => {
                EventBus.emit(EventName.SellingModeOn)
            },
        })
        this.addButton(this.sellButton)

        // listen for the open event
        this.scene.events.once(EventName.TutorialOpenInventory, () => {
            setTutorialDepth({
                gameObject: this.inventoryButton,
            })
            const { x, y } = this.inventoryButton.getCenter()
            const eventMessage: ShowPressHereArrowMessage = {
                rotation: 45,
                originPosition: { x: x - 60, y: y + 60 },
                targetPosition: { x: x - 40, y: y + 40 },
            }
            this.scene.events.emit(EventName.ShowPressHereArrow, eventMessage)
        })

        EventBus.on(EventName.HideButtons, () => {
            this.setVisible(false).setActive(false)
        })
        
        EventBus.on(EventName.ShowButtons, () => {
            this.setVisible(true).setActive(true)
        })

        if (this.scene.cache.obj.get(CacheKey.VisitedNeighbor)) {
            this.setVisible(false).setActive(false)
        }
    }
}
