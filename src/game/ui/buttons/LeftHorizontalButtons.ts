import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey } from "../../assets"
import { EventBus, EventName, ModalName, OpenModalMessage, ShowPressHereArrowMessage } from "../../event-bus"
import { ButtonsBaseConstructorParams, CacheKey } from "../../types"
import { HorizontalButtons } from "./HorizontalButtons"
import { calculateUiDepth, UILayer } from "../../layers"
import { restoreTutorialDepth } from "../tutorial"

export class LeftHorizontalButtons extends HorizontalButtons {
    private nftMarketplaceButton : Sizer
    private shopButton : Sizer
    private roadsideStandButton : Sizer
    private neighborsButton : Sizer

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
        this.nftMarketplaceButton = this.createButton({
            iconKey: BaseAssetKey.IconNFTMarketplace,
            text: "NFT Marketplace",
            onPress: () => {
                console.log("NFT")
            },
        })
        this.addButton(this.nftMarketplaceButton)

        // add shop button
        this.shopButton = this.createButton({
            iconKey: BaseAssetKey.IconShop,
            text: "Shop",
            onPress: () => {
                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.Shop
                }
                EventBus.emit(EventName.OpenModal, eventMessage)
                if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                    // return to normal depth
                    restoreTutorialDepth({
                        gameObject: this.shopButton,
                        scene: this.scene,
                    })
                    // emit the event
                    this.scene.events.emit(EventName.TutorialInventoryButtonPressed)
                    // hide the press here arrow
                    this.scene.events.emit(EventName.HidePressHereArrow)
                }
            },
        })
        this.addButton(this.shopButton)

        // add roadside stand button
        this.roadsideStandButton = this.createButton({
            iconKey: BaseAssetKey.IconRoadsideStand,
            text: "Roadside Stand",
            onPress: () => {
                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.Stand
                }
                EventBus.emit(EventName.OpenModal, eventMessage)
                if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                    // return to normal depth
                    restoreTutorialDepth({
                        gameObject: this.roadsideStandButton,
                        scene: this.scene,
                    })
                    // emit the event
                    this.scene.events.emit(EventName.TutorialRoadsideStandButtonPressed)
                    // hide the press here arrow
                    this.scene.events.emit(EventName.HidePressHereArrow)
                }
            },
        })
        this.addButton(this.roadsideStandButton)

        // add neighbors button
        this.neighborsButton = this.createButton({
            iconKey: BaseAssetKey.IconNeighbors,
            text: "Neighbors",
            onPress: () => {
                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.Neighbors
                }
                EventBus.emit(EventName.OpenModal, eventMessage)
            },
        })
        this.addButton(this.neighborsButton)

        // listen for the open event
        this.scene.events.once(EventName.TutorialOpenShop, () => {
            this.shopButton.setDepth(calculateUiDepth({
                layer: UILayer.Tutorial,
                layerDepth: 2,
            }))
            const { x, y } = this.shopButton.getCenter()
            const eventMessage: ShowPressHereArrowMessage = {
                originPosition: {
                    x: x + 60,
                    y: y + 60,
                },
                targetPosition: {
                    x: x + 40,
                    y: y + 45,
                },
            }
            this.scene.events.emit(EventName.ShowPressHereArrow, eventMessage)
        })

        // listen for the open event
        this.scene.events.once(EventName.TutorialOpenRoadsideStand, () => {
            this.roadsideStandButton.setDepth(calculateUiDepth({
                layer: UILayer.Tutorial,
                layerDepth: 2,
            }))
            const { x, y } = this.roadsideStandButton.getCenter()
            const eventMessage: ShowPressHereArrowMessage = {
                originPosition: {
                    x: x + 60,
                    y: y + 60,
                },
                targetPosition: {
                    x: x + 40,
                    y: y + 45,
                },
            }
            this.scene.events.emit(EventName.ShowPressHereArrow, eventMessage)
        })
    }
}
