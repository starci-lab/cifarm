import { BaseAssetKey } from "@/game/assets"
import { EventName } from "@/game/event-bus"
import { HorizontalButtonBaseConstructorParams } from "@/game/types"
import { HorizontalButtons } from "./HorizontalButtons"

export class RightHorizontalButtons extends HorizontalButtons {
    constructor({
        scene,
        config,
    }: HorizontalButtonBaseConstructorParams) {
        super({
            baseParams: { scene, config },
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
