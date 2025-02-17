import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey } from "../../assets"
import { EventBus, EventName, ModalName, OpenModalMessage, ShowPressHereArrowMessage } from "../../event-bus"
import { HorizontalButtons } from "./HorizontalButtons"
import { ButtonsBaseConstructorParams } from "@/game/types"
import { calculateUiDepth, UILayer } from "../../layers"

export class RightHorizontalButtons extends HorizontalButtons {
    private settingButton: Sizer
    private inventoryButton: Sizer
    private dailyButton: Sizer
    private questButton: Sizer

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

        // add setting button
        this.settingButton = this.createButton({
            iconKey: BaseAssetKey.IconSetting,
            text: "Settings",
            onPress: () => {
                console.log("Setting")
            },
        })
        this.addButton(this.settingButton)

        // add inventory button
        this.inventoryButton = this.createButton({
            iconKey: BaseAssetKey.IconInventory,
            text: "Inventory",
            onPress: () => {
                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.Inventory
                }
                EventBus.emit(EventName.OpenModal, eventMessage)
            },
        })
        this.addButton(this.inventoryButton)

        // add daily button
        this.dailyButton = this.createButton({
            iconKey: BaseAssetKey.IconDaily,
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
            iconKey: BaseAssetKey.IconQuest,
            text: "Quest",
            onPress: () => {
                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.Quest
                }
                EventBus.emit(EventName.OpenModal, eventMessage)
            },
        })
        this.addButton(this.questButton)

        // listen for the open event
        this.scene.events.once(EventName.TutorialOpenInventory, () => {
            this.inventoryButton.setDepth(calculateUiDepth({
                layer: UILayer.Tutorial,
                layerDepth: 2,
            }))
            const { x, y } = this.inventoryButton.getCenter()
            const eventMessage: ShowPressHereArrowMessage = {
                rotation: 45,
                originPosition: { x: x - 60, y: y + 60 },
                targetPosition: { x: x - 40, y: y + 40 },
            }
            this.scene.events.emit(EventName.ShowPressHereArrow, eventMessage)
            // if shop button is press, we will console go
            this.inventoryButton.once("pointerdown", () => {
                // return to normal depth
                this.inventoryButton.setDepth(calculateUiDepth({
                    layer: UILayer.Base,
                }))
                // emit the event
                this.scene.events.emit(EventName.TutorialInventoryButtonPressed)
                // hide the press here arrow
                this.scene.events.emit(EventName.HidePressHereArrow)
            })
        })
    }
}
