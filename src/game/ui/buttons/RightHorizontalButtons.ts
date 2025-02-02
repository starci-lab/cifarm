import { Scene } from "phaser"
import { Buttons } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey } from "@/game/assets"
import { HorizontalButtons } from "./HorizontalButtons"
import { EventName } from "@/game/event-bus"

export class RightHorizontalButtons extends HorizontalButtons {
    constructor(scene: Scene, config?: Buttons.IConfig) {
        super(scene, config)

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
