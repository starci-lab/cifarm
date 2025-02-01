import { Scene } from "phaser"
import { Buttons } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey } from "@/game/assets"
import { HorizontalButtons } from "./HorizontalButtons"
import { EventName } from "@/game/event-bus"

export class LeftHorizontalButtons extends HorizontalButtons {
    constructor(scene: Scene, config?: Buttons.IConfig) {
        super(scene, config)

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
                this.emit(EventName.OpenShop, this)
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
