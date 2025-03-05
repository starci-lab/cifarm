import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey } from "../../assets"
import { EventBus, EventName, ModalName, OpenModalMessage, ShowPressHereArrowMessage } from "../../event-bus"
import { ButtonsBaseConstructorParams, CacheKey } from "../../types"
import { HorizontalButtons } from "./HorizontalButtons"
import { restoreTutorialDepth, setTutorialDepth } from "../tutorial"

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
            iconKey: BaseAssetKey.UIIconNFTMarketplace,
            text: "NFT Marketplace",
            onPress: () => {
                console.log("NFT")
            },
        })
        this.addButton(this.nftMarketplaceButton)

        // add shop button
        this.shopButton = this.createButton({
            iconKey: BaseAssetKey.UIIconShop,
            text: "Shop",
            onPress: () => {
                EventBus.emit(EventName.RefreshPlaceItemsCacheKey)
                
                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.Shop
                }
                EventBus.emit(EventName.OpenModal, eventMessage)
                if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                    // return to normal depth
                    restoreTutorialDepth({
                        gameObject: this.shopButton,
                    })
                    // emit the event
                    this.scene.events.emit(EventName.TutorialShopButtonPressed)
                    // hide the press here arrow
                    this.scene.events.emit(EventName.HidePressHereArrow)
                }
            },
        })
        this.addButton(this.shopButton)

        // add roadside stand button
        this.roadsideStandButton = this.createButton({
            iconKey: BaseAssetKey.UIIconRoadsideStand,
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

        // listen for the open event
        this.scene.events.once(EventName.TutorialOpenShop, () => {
            setTutorialDepth({
                gameObject: this.shopButton,
            })
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
            setTutorialDepth({
                gameObject: this.roadsideStandButton,
            })
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

        EventBus.on(EventName.HideButtons, () => {
            this.setVisible(false).setActive(false)
        })
        
        EventBus.on(EventName.ShowButtons, () => {
            this.setVisible(true).setActive(true)
        })

        if (this.scene.cache.obj.get(CacheKey.VisitedNeighbor)) {
            this.setVisible(false).setActive(false)
        }
    }
}
