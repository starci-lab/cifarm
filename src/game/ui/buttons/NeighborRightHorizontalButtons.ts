import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey, baseAssetMap } from "../../assets"
import { ButtonsBaseConstructorParams, CacheKey } from "../../types"
import { HorizontalButtons } from "./HorizontalButtons"
import { EventBus, EventName, ModalName, OpenModalMessage } from "../../event-bus"

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
            iconKey: baseAssetMap[BaseAssetKey.UIIconNext].key,
            text: "Next",
            onPress: () => {
                console.log("NFT")
            },
        })
        this.addButton(this.nextButton)

        // add inventory button
        this.inventoryButton = this.createButton({
            iconKey: baseAssetMap[BaseAssetKey.UIIconInventory].key,
            text: "Inventory",
            onPress: () => {
                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.Inventory
                }
                EventBus.emit(EventName.OpenModal, eventMessage)
            },
        })
        this.addButton(this.inventoryButton)


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
