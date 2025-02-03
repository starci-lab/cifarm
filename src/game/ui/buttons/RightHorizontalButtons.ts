import { BaseAssetKey } from "../../assets"
import { EventName } from "@/game/event-bus"
import { HorizontalButtons } from "./HorizontalButtons"
import { ButtonsBaseConstructorParams } from "@/game/types"

export class RightHorizontalButtons extends HorizontalButtons {
    constructor(baseParams: ButtonsBaseConstructorParams) {
        super({
            baseParams,
            options: {
                orientation: "y",
                space: {
                    item: 36,
                },
            }
        })

        // add inventory button
        this.addButton(this.createButton({
            iconKey: BaseAssetKey.IconInventory,
            text: "Inventory",
            onClick: () => {
                this.scene.events.emit(EventName.OpenInventory, this)
            },
        }))

        // add daily button
        this.addButton(this.createButton({
            iconKey: BaseAssetKey.IconDaily,
            text: "Daily",
            onClick: () => {
                console.log("Daily")
            },
        }))
    }
}
