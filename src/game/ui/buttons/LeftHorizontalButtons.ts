import { BaseAssetKey } from "../../assets"
import { EventName } from "../../event-bus"
import { ButtonsBaseConstructorParams } from "../../types"
import { ModalName } from "../modals"
import { HorizontalButtons } from "./HorizontalButtons"

export class LeftHorizontalButtons extends HorizontalButtons {
    constructor(baseParams: ButtonsBaseConstructorParams) {
        super({
            baseParams,
            options: {
                orientation: "y",
                space: 36,
            }
        })

        // add nft button
        this.addButton(this.createButton({
            iconKey: BaseAssetKey.IconNFTMarketplace,
            text: "NFT Marketplace",
            onClick: () => {
                console.log("NFT")
            },
        }))

        // add shop button
        this.addButton(this.createButton({
            iconKey: BaseAssetKey.IconShop,
            text: "Shop",
            onClick: () => {
                this.scene.events.emit(EventName.OpenModal, ModalName.Shop)
            },
        }))
        // add roadside stand button
        this.addButton(this.createButton({
            iconKey: BaseAssetKey.IconRoadsideStand,
            text: "Roadside Stand",
            onClick: () => {
                console.log("Roadside Stand")
            },
        }))

        // add neighbors button
        this.addButton(this.createButton({
            iconKey: BaseAssetKey.IconNeighbors,
            text: "Neighbors",
            onClick: () => {
                console.log("Neighbors")
            },
        }))
    }
}
