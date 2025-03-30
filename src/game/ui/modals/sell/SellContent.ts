import {
    BaseSizerBaseConstructorParams,
    CacheKey,
    SellModalData,
} from "../../../types"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import {
    Background,
    getBackgroundContainerSize,
    ModalBackground,
    ResourceLabel,
    Size,
    SizeStyle,
} from "../../elements"
import { SceneEventEmitter, SceneEventName, ModalName, ExternalEventEmitter, ExternalEventName } from "../../../events"
import {
    baseAssetMap,
    BaseAssetKey,
} from "../../../assets"
import { getSellPriceFromPlacedItemType } from "../../../cache"
import { PlacedItemSchema } from "@/modules/entities"
import { PlacedItemTypeSchema } from "@/modules/entities"
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { createMainVisual } from "../../../tilemap"

export class SellContent extends BaseSizer {
    private background: ModalBackground
    private size: Size
    private resourceLabel: ResourceLabel | undefined
    private assetIcon: Phaser.GameObjects.Image | undefined
    private sizer: Sizer | undefined
    private placedItemTypes: Array<PlacedItemTypeSchema>
    private placedItem: PlacedItemSchema | undefined

    constructor({ scene, x, y, width, height }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, width, height)

        this.background = new ModalBackground({
            baseParams: {
                scene,
            },
            options: {
                align: "center",
                container: {
                    showWrapperContainer: false,
                    showContainer: true,
                },
                mainButton: {
                    text: "OK",
                    onPress: () => {
                        if (!this.placedItem) {
                            throw new Error("Placed item is undefined")
                        }
                        SceneEventEmitter.emit(SceneEventName.CloseModal, {
                            modalName: ModalName.Sell,
                        })
                        //SceneEventEmitter.emit(SceneEventName.NormalModeOn)
                        ExternalEventEmitter.emit(ExternalEventName.RequestSell, {
                            placedItemId: this.placedItem.id,
                        })
                    },
                },
                onXButtonPress: () => {
                    SceneEventEmitter.emit(SceneEventName.CloseModal, {
                        modalName: ModalName.Sell,
                    })
                    SceneEventEmitter.emit(SceneEventName.NormalModeOn)
                },
                title: "Sell",
                background: Background.Medium,
            },
        })
        this.scene.add.existing(this.background)
        this.addLocal(this.background)

        this.placedItemTypes = this.scene.cache.obj.get(
            CacheKey.PlacedItemTypes
        )

        this.size = getBackgroundContainerSize({
            style: SizeStyle.Container,
            background: Background.Medium,
        })
        if (!this.size.width) {
            throw new Error("Size width is undefined")
        }

        SceneEventEmitter.on(SceneEventName.UpdateSellModal, () => {
            const { mapAssetData, placedItem } = this.scene.cache.obj.get(
                CacheKey.SellModalData
            ) as SellModalData
            if (!placedItem) {
                throw new Error("Placed item is undefined")
            }
            this.placedItem = placedItem
            const mainVisual = createMainVisual({
                ...mapAssetData,
                scene: this.scene,
            })
            if (!mainVisual) {
                throw new Error("Main visual is undefined")
            }
            
            const placedItemType = this.placedItemTypes.find(
                (placedItemType) => placedItemType.id === placedItem.placedItemType
            )
            if (!placedItemType) {
                throw new Error("Placed item type not found")
            }

            const sellPrice = getSellPriceFromPlacedItemType({
                scene: this.scene,
                placedItemType,
            })
            if (!sellPrice) {
                throw new Error("Sell price is undefined")
            }

            if (this.sizer) {
                this.sizer.clear(true)
                this.background.container?.remove(this.sizer)
            }
            this.sizer = this.scene.rexUI.add.sizer({
                orientation: "vertical",
                originY: 0,
                space: {
                    item: 50,
                },
            })
            // re-create sell icon
            if (this.assetIcon) {
                this.background.container?.remove(this.assetIcon)
            }
            if (!placedItemType) {
                throw new Error("Placed item type not found")
            }
            this.sizer.add(mainVisual)

            // re-create resource label
            if (this.resourceLabel) {
                this.resourceLabel.clear(true)
                this.background.container?.remove(this.resourceLabel)
            }
            this.resourceLabel = new ResourceLabel({
                baseParams: {
                    scene,
                },
                options: {
                    text: sellPrice.toString(),
                    iconKey: baseAssetMap[BaseAssetKey.UICommonIconGold].base.textureConfig.key,
                },
            })
            this.scene.add.existing(this.resourceLabel)
            this.sizer.add(this.resourceLabel)
            this.sizer.layout().setDepth(this.depth + 1)
            this.background.container?.addLocal(this.sizer)
        })
    }
}
