import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey } from "../../assets"
import { EventBus, EventName, ModalName, OpenModalMessage, TutorialOpenShopResponsedMessage } from "../../event-bus"
import { ButtonsBaseConstructorParams } from "../../types"
import { HorizontalButtons } from "./HorizontalButtons"
import { calculateUiDepth, UILayer } from "../../layers"

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
            const eventMessage: TutorialOpenShopResponsedMessage = {
                position: this.shopButton.getCenter()
            }
            this.scene.events.emit(EventName.TutorialOpenShopResponsed, eventMessage)
            // if shop button is press, we will console go
            this.shopButton.once("pointerdown", () => {
                // return to normal depth
                this.shopButton.setDepth(calculateUiDepth({
                    layer: UILayer.Base,
                }))
                // emit the event
                this.scene.events.emit(EventName.TutorialShopButtonPressed)
                // hide the press here arrow
                this.scene.events.emit(EventName.HidePressHereArrow)
            })
        })
    }
}
