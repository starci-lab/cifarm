import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey } from "../../assets"
import { ButtonsBaseConstructorParams, CacheKey } from "../../types"
import { HorizontalButtons } from "./HorizontalButtons"
import { EventBus, EventName } from "@/game/event-bus"

export class NeighborRightHorizontalButtons extends HorizontalButtons {
    private nextButton: Sizer
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

        // add nft button
        this.nextButton = this.createButton({
            iconKey: BaseAssetKey.UIIconNext,
            text: "Next",
            onPress: () => {
                console.log("NFT")
            },
        })
        this.addButton(this.nextButton)

        EventBus.on(EventName.HideNeighborButtons, () => {
            this.setVisible(false).setActive(false)
        })
                
        EventBus.on(EventName.ShowNeighborButtons, () => {
            this.setVisible(true).setActive(true)
        })
                
        if (!this.scene.cache.obj.get(CacheKey.VisitedNeighbor)) {
            this.setVisible(false).setActive(false)
        }
    }
}
