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
import {
    SceneEventEmitter,
    SceneEventName,
    ModalName,
    ExternalEventEmitter,
    ExternalEventName,
} from "../../../events"
import { baseAssetMap, BaseAssetKey } from "../../../assets"
import { getSellPriceFromPlacedItemType } from "../../../logic"
import { PlacedItemSchema } from "@/modules/entities"
import { PlacedItemTypeSchema } from "@/modules/entities"
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { createMainVisual } from "../../../tilemap"
import { SpineGameObject } from "@esotericsoftware/spine-phaser"

export class SellContent extends BaseSizer {
    private background: ModalBackground
    private size: Size
    private placedItemTypes: Array<PlacedItemTypeSchema>
    private placedItem: PlacedItemSchema | undefined

    // large frame and resource label will stay in the sizer
    private sizer: Sizer
    private frameSizer: Sizer
    private resourceLabel: ResourceLabel
    private mainVisual: Phaser.GameObjects.Sprite | SpineGameObject | undefined
        
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

        this.placedItemTypes = this.scene.cache.obj.get(CacheKey.PlacedItemTypes)

        this.size = getBackgroundContainerSize({
            style: SizeStyle.Container,
            background: Background.Medium,
        })
        if (!this.size.width) {
            throw new Error("Size width is undefined")
        }

        this.sizer = this.scene.rexUI.add.sizer({
            orientation: "vertical",
            originY: 0,
            space: {
                item: 40,
            },
            y: 60,
        })

        // add frame sizer
        const backgroundFrame = this.scene.add.image(
            0,
            0,
            baseAssetMap[BaseAssetKey.UICommonLargeFrame].base.textureConfig.key
        )
        this.frameSizer = this.scene.rexUI.add.sizer({
            width: backgroundFrame.width,
            height: backgroundFrame.height,
        })
        this.frameSizer.addBackground(backgroundFrame)
        this.frameSizer.layout()
        this.sizer.add(this.frameSizer)

        this.resourceLabel = new ResourceLabel({
            baseParams: {
                scene,
            },
            options: {
                text: "",
                iconKey:
                    baseAssetMap[BaseAssetKey.UICommonIconGold].base.textureConfig.key,
            },
        })
        this.scene.add.existing(this.resourceLabel)
        this.sizer.add(this.resourceLabel)
        this.sizer.layout()
        this.background.container?.addLocal(this.sizer)

        SceneEventEmitter.on(SceneEventName.UpdateSellModal, () => {
            const { mapAssetData, placedItem } = this.scene.cache.obj.get(
                CacheKey.SellModalData
            ) as SellModalData
            if (!placedItem) {
                throw new Error("Placed item is undefined")
            }
            this.placedItem = placedItem

            const { scaleX = 1, scaleY = 1 } = { ...mapAssetData.modalScale }
            if (this.mainVisual) {
                this.mainVisual.destroy()
            }
            this.mainVisual = createMainVisual({
                ...mapAssetData,
                scene: this.scene,
            }).setDepth(this.depth + 1).setScale(scaleX, scaleY)
            this.mainVisual.setY(backgroundFrame.width / 2 - 30)
            this.frameSizer.addLocal(this.mainVisual)

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
            this.resourceLabel.amountText.setText(sellPrice.toString())
        })
    }
}
