import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey, baseAssetMap } from "../../assets"
import { ButtonsBaseConstructorParams, CacheKey } from "../../types"
import { HorizontalButtons } from "./HorizontalButtons"
import {
    SceneEventEmitter,
    SceneEventName,
    OpenModalMessage,
    ModalName,
    ExternalEventEmitter,
    ExternalEventName,
} from "../../events"

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
                },
            },
            options: {
                orientation: "y",
                space: 36,
            },
        })

        // add nft button
        this.returnButton = this.createButton({
            iconKey: baseAssetMap[BaseAssetKey.UIIconReturn].key,
            text: "Return",
            onPress: () => {
                this.scene.cache.obj.remove(CacheKey.WatchingUser)
                ExternalEventEmitter.emit(ExternalEventName.RequestReturn)
                ExternalEventEmitter.emit(ExternalEventName.Visit)
            },
        })
        this.addButton(this.returnButton)

        // add neighbors button
        this.neighborsButton = this.createButton({
            iconKey: baseAssetMap[BaseAssetKey.UIIconNeighbors].key,
            text: "Neighbors",
            onPress: () => {
                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.Neighbors,
                }
                SceneEventEmitter.emit(SceneEventName.OpenModal, eventMessage)
            },
        })
        this.addButton(this.neighborsButton)

        SceneEventEmitter.on(SceneEventName.HideNeighborButtons, () => {
            this.setVisible(false).setActive(false)
        })

        SceneEventEmitter.on(SceneEventName.ShowNeighborButtons, () => {
            this.setVisible(true).setActive(true)
        })

        if (!this.scene.cache.obj.get(CacheKey.WatchingUser)) {
            this.setVisible(false).setActive(false)
        }
    }
}
