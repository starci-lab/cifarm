import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey } from "../../assets"
import { ButtonsBaseConstructorParams, CacheKey } from "../../types"
import { HorizontalButtons } from "./HorizontalButtons"
import { OpenModalMessage, ModalName, EventBus, EventName } from "@/game/event-bus"

export class NeighborLeftHorizontalButtons extends HorizontalButtons {
    private returnButton: Sizer
    private neighborsButton: Sizer
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
            iconKey: BaseAssetKey.UIIconReturn,
            text: "Return",
            onPress: () => {
                this.scene.cache.obj.remove(CacheKey.WatchingUser)
                EventBus.emit(EventName.EmitReturn)
                EventBus.emit(EventName.ProcessVisiting)
            },
        })
        this.addButton(this.returnButton)

        // add neighbors button
        this.neighborsButton = this.createButton({
            iconKey: BaseAssetKey.UIIconNeighbors,
            text: "Neighbors",
            onPress: () => {
                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.Neighbors
                }
                EventBus.emit(EventName.OpenModal, eventMessage)
            },
        })
        this.addButton(this.neighborsButton)

        EventBus.on(EventName.HideNeighborButtons, () => {
            this.setVisible(false).setActive(false)
        })
        
        EventBus.on(EventName.ShowNeighborButtons, () => {
            this.setVisible(true).setActive(true)
        })

        if (!this.scene.cache.obj.get(CacheKey.WatchingUser)) {
            this.setVisible(false).setActive(false)
        }
    }
}
