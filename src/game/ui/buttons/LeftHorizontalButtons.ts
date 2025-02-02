import { BaseAssetKey } from "../../assets"
import { EventName } from "../../event-bus"
import { HorizontalButtonBaseConstructorParams } from "../../types"
import { HorizontalButtons } from "./HorizontalButtons"

export class LeftHorizontalButtons extends HorizontalButtons {
    constructor({
        scene,
        config,
    }: HorizontalButtonBaseConstructorParams) {
        super({
            baseParams: { scene, config },
            options: {
                orientation: "y",
                space: {
                    item: 36,
                },
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
                this.scene.events.emit(EventName.OpenShop, this)
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
