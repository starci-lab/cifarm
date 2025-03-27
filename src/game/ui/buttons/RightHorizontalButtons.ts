import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey, baseAssetMap } from "../../assets"
import { EventBus, EventName, ModalName, OpenModalMessage } from "../../event-bus"
import { HorizontalButtons } from "./HorizontalButtons"
import { ButtonsBaseConstructorParams, CacheKey } from "@/game/types"

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
            iconKey: baseAssetMap[BaseAssetKey.UIIconSetting].key,
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
            iconKey: baseAssetMap[BaseAssetKey.UIIconInventory].key,
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
            iconKey: baseAssetMap[BaseAssetKey.UIIconDaily].key,
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
            iconKey: baseAssetMap[BaseAssetKey.UIIconQuests].key,
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
            iconKey: baseAssetMap[BaseAssetKey.UIIconMove].key,
            text: "Move",
            onPress: () => {
                EventBus.emit(EventName.MovingModeOn)
            },
        })
        this.addButton(this.moveButton)

        // add move button
        this.sellButton = this.createButton({
            iconKey: baseAssetMap[BaseAssetKey.UIIconSell].key,
            text: "Sell",
            onPress: () => {
                EventBus.emit(EventName.SellingModeOn)
            },
        })
        this.addButton(this.sellButton)

        EventBus.on(EventName.HideButtons, () => {
            this.setVisible(false).setActive(false)
        })
        
        EventBus.on(EventName.ShowButtons, () => {
            this.setVisible(true).setActive(true)
        })

        if (this.scene.cache.obj.get(CacheKey.WatchingUser)) {
            this.setVisible(false).setActive(false)
        }
    }
}
