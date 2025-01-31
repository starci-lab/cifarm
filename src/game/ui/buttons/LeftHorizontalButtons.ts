import { Scene } from "phaser"
import { Buttons } from "phaser3-rex-plugins/templates/ui/ui-components"
import { AssetKey } from "@/game/assets"
import { HorizontalButtons } from "./HorizontalButtons"

export class LeftHorizontalButtons extends HorizontalButtons {
    constructor(scene: Scene, config?: Buttons.IConfig) {
        super(scene, config)

        // add nft button
        this.addButton(this.createButton({
            iconKey: AssetKey.IconNFTMarketplace,
            text: "NFT Marketplace",
            onClick: () => {
                console.log("NFT")
            },
        }))

        // add shop button
        this.addButton(this.createButton({
            iconKey: AssetKey.IconShop,
            text: "Shop",
            onClick: () => {
                console.log("Shop")
            },
        }))
        // add roadside stand button
        this.addButton(this.createButton({
            iconKey: AssetKey.IconRoadsideStand,
            text: "Roadside Stand",
            onClick: () => {
                console.log("Roadside Stand")
            },
        }))

        // add neighbors button
        this.addButton(this.createButton({
            iconKey: AssetKey.IconNeighbors,
            text: "Neighbors",
            onClick: () => {
                console.log("Neighbors")
            },
        }))
    }
}
