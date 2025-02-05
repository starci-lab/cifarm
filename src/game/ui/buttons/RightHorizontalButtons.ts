import { BaseAssetKey } from "../../assets"
import { EventName } from "@/game/event-bus"
import { HorizontalButtons } from "./HorizontalButtons"
import { ButtonsBaseConstructorParams } from "@/game/types"
import { ModalName } from "../modals"

export class RightHorizontalButtons extends HorizontalButtons {
    constructor(baseParams: ButtonsBaseConstructorParams) {
        super({
            baseParams,
            options: {
                orientation: "y",
                space: 36,
            }
        })

        // add inventory button
        this.addButton(this.createButton({
            iconKey: BaseAssetKey.IconInventory,
            text: "Inventory",
            onClick: () => {
                this.scene.events.emit(EventName.OpenModal, ModalName.Inventory)
            },
        }))

        // add daily button
        this.addButton(this.createButton({
            iconKey: BaseAssetKey.IconDaily,
            text: "Daily",
            onClick: () => {
                this.scene.events.emit(EventName.OpenModal, ModalName.Daily)
            },
        }))

        // add quest button
        this.addButton(this.createButton({
            iconKey: BaseAssetKey.IconQuest,
            text: "Quest",
            onClick: () => {
                this.scene.events.emit(EventName.OpenModal, ModalName.Quest)
            },
        }))
    }
}
