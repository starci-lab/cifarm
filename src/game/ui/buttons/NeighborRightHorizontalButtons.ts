import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey, baseAssetMap } from "../../assets"
import { ButtonsBaseConstructorParams, CacheKey } from "../../types"
import { HorizontalButtons } from "./HorizontalButtons"
import { SceneEventEmitter, SceneEventName, ModalName, OpenModalMessage } from "../../events"

export class NeighborRightHorizontalButtons extends HorizontalButtons {
    private nextButton: Sizer
    private inventoryButton: Sizer
    
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
            iconKey: baseAssetMap[BaseAssetKey.UIIconNext].base.textureConfig.key,
            text: "Next",
            onPress: () => {
                console.log("NFT")
            },
        })
        this.addButton(this.nextButton)

        // add inventory button
        this.inventoryButton = this.createButton({
            iconKey: baseAssetMap[BaseAssetKey.UIIconInventory].base.textureConfig.key,
            text: "Inventory",
            onPress: () => {
                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.Inventory
                }
                SceneEventEmitter.emit(SceneEventName.OpenModal, eventMessage)
            },
        })
        this.addButton(this.inventoryButton)


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
