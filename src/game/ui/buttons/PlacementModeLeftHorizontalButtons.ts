import { SceneEventEmitter, SceneEventName } from "../../events"
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey, baseAssetMap } from "../../assets"
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
            iconKey: baseAssetMap[BaseAssetKey.UIIconPrevious].key,
            text: "Return",
            onPress: () => {
                SceneEventEmitter.emit(SceneEventName.NormalModeOn)
            },
        })
        this.addButton(this.returnButton)

        SceneEventEmitter.on(SceneEventName.HidePlacementModeButtons, () => {
            this.setVisible(false).setActive(false)
        })
        
        SceneEventEmitter.on(SceneEventName.ShowPlacementModeButtons, () => {
            this.setVisible(true).setActive(true)
        })

    }
}
