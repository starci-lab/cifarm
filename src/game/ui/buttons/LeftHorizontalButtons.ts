import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey } from "../../assets"
import { EventName, TutorialOpenShopResponsedMessage } from "../../event-bus"
import { ButtonsBaseConstructorParams } from "../../types"
import { ModalName } from "../modals"
import { HorizontalButtons } from "./HorizontalButtons"

export const HIGHLIGHT_DEPTH = 2
export const BASE_DEPTH = 0

export class LeftHorizontalButtons extends HorizontalButtons {
    private nftMarketplaceButton : Sizer
    private shopButton : Sizer
    private roadsideStandButton : Sizer
    private neighborsButton : Sizer

    constructor(baseParams: ButtonsBaseConstructorParams) {
        super({
            baseParams,
            options: {
                orientation: "y",
                space: 36,
            }
        })

        // add nft button
        this.nftMarketplaceButton = this.createButton({
            iconKey: BaseAssetKey.IconNFTMarketplace,
            text: "NFT Marketplace",
            onClick: () => {
                console.log("NFT")
            },
        })
        this.addButton(this.nftMarketplaceButton)

        // add shop button
        this.shopButton = this.createButton({
            iconKey: BaseAssetKey.IconShop,
            text: "Shop",
            onClick: () => {
                this.scene.events.emit(EventName.OpenModal, ModalName.Shop)
            },
        })
        this.addButton(this.shopButton)

        // add roadside stand button
        this.roadsideStandButton = this.createButton({
            iconKey: BaseAssetKey.IconRoadsideStand,
            text: "Roadside Stand",
            onClick: () => {
                this.scene.events.emit(EventName.OpenModal, ModalName.Stand)
            },
        })
        this.addButton(this.roadsideStandButton)

        // add neighbors button
        this.neighborsButton = this.createButton({
            iconKey: BaseAssetKey.IconNeighbors,
            text: "Neighbors",
            onClick: () => {
                this.scene.events.emit(EventName.OpenModal, ModalName.Neighbors)
            },
        })
        this.addButton(this.neighborsButton)

        // listen for the open event
        this.scene.events.once(EventName.TutorialOpenShop, () => {
            this.shopButton.setDepth(HIGHLIGHT_DEPTH)
            console.log(this.shopButton.getCenter())
            
            const eventMessage: TutorialOpenShopResponsedMessage = {
                position: this.shopButton.getCenter()
            }
            this.scene.events.emit(EventName.TutorialOpenShopResponsed, eventMessage)
            // if shop button is press, we will console go
            this.shopButton.once("pointerdown", () => {
                // return to normal depth
                this.shopButton.setDepth(BASE_DEPTH)
                // emit the event
                this.scene.events.emit(EventName.TutorialShopButtonPressed)
            })
        })
    }
}
