import { EventBus, EventName } from "@/game/event-bus"
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey } from "../../assets"
import { ButtonsBaseConstructorParams } from "../../types"
import { HorizontalButtons } from "./HorizontalButtons"

export class PlacementModeLeftHorizontalButtons extends HorizontalButtons {
    private returnButton: Sizer
    constructor(baseParams: ButtonsBaseConstructorParams) {
        super({
            baseParams: {
                scene: baseParams.scene,
                config: {
                    ...baseParams.config,
                    originX: 0,
                    originY: 0,
                }
            },
            options: {
                orientation: "y",
                space: 36,
            }
        })

        // add nft button
        this.returnButton = this.createButton({
            iconKey: BaseAssetKey.UIIconPrevious,
            text: "Return",
            onPress: () => {
                EventBus.emit(EventName.SellPlacementModeOff)
                EventBus.emit(EventName.MovePlacementModeOff)
            },
        })
        this.addButton(this.returnButton)

        EventBus.on(EventName.HidePlacementModeButtons, () => {
            this.setVisible(false).setActive(false)
        })
        
        EventBus.on(EventName.ShowPlacementModeButtons, () => {
            this.setVisible(true).setActive(true)
        })

    }
}
