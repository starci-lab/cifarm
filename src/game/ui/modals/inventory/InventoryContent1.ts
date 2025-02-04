import { BaseAssetKey } from "@/game/assets"
import {
    GridTable
} from "phaser3-rex-plugins/templates/ui/ui-components"
import { SizerBaseConstructorParams } from "../../../types"
import { BaseText, StrokeColor, TextColor } from "../../elements"
import { UISizer } from "../../UISizer"
import { adjustTextMinLength, onAnimatedClick } from "../../utils"
import { InventoryTab } from "./types"

export class InventoryContent extends UISizer {
    private table: GridTable
    private currentInventoryTab: InventoryTab | undefined

    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)
        this.createInventoryTable()
    }

    private createInventoryTable() {
        const itemList = [
            { assetKey: BaseAssetKey.IconRoadsideStand, title: "Wheat Seed", onClick: () => console.log("Clicked on Wheat Seed") },
            { assetKey:  BaseAssetKey.IconRoadsideStand, title: "Corn Seed", onClick: () => console.log("Clicked on Corn Seed") },
            { assetKey:  BaseAssetKey.IconRoadsideStand, title: "Tomato Seed", onClick: () => console.log("Clicked on Tomato Seed") },
            { assetKey:  BaseAssetKey.IconRoadsideStand, title: "Carrot Seed", onClick: () => console.log("Clicked on Carrot Seed") },
            { assetKey:  BaseAssetKey.IconRoadsideStand, title: "Lettuce Seed", onClick: () => console.log("Clicked on Lettuce Seed") }
        ]

        this.table = this.scene.rexUI.add.gridTable({
            x: this.x + 200,
            y: this.y + 200,
            width: 1000,
            height: 1000,
            background: this.scene.add.rectangle(0, 0, 1000, 1000, 0x222222),
            table: {
                columns: 2,
                mask: { padding: 2 },
                interactive: true,
            },
            slider: {
                track: this.scene.add.rectangle(0, 0, 20, 200, 0x888888),
                thumb: this.scene.add.rectangle(0, 0, 20, 50, 0xffffff),
            },
            mouseWheelScroller: { focus: false, speed: 2 },
            space: { left: 20, right: 20, top: 20, bottom: 20, table: 10 },
            createCellContainerCallback: (cell) => {
                return this.createItemCard(itemList[cell.index])
            },
            items: itemList,
        })

        this.add(this.table)
    }

    private createItemCard({ assetKey, title, onClick }: CreateItemCardParams) {
        const cardBackground = this.scene.add.image(0, 0, BaseAssetKey.IconNeighbors)
        const titleText = new BaseText({
            baseParams: {
                scene: this.scene,
                text: adjustTextMinLength(title, 20),
                x: 0,
                y: 0,
            },
            options: {
                enableStroke: true,
                textColor: TextColor.White,
                strokeColor: StrokeColor.Black,
                fontSize: 24,
                strokeThickness: 3,
                enableWordWrap: true,
                wordWrapWidth: 400,
            },
        })
        this.scene.add.existing(titleText)

        const icon = this.scene.add.image(0, 0, assetKey)
        const button = this.scene.rexUI.add.label({
            background: this.scene.add.image(0, 0, BaseAssetKey.ModalShopButtonPrice),
            text: titleText,
        }).setInteractive()

        button.on("pointerdown", () => {
            onAnimatedClick({ gameObject: button, onClick, scene: this.scene })
        })

        return this.scene.rexUI.add.overlapSizer({
            width: cardBackground.width,
            height: cardBackground.height,
        })
            .addBackground(cardBackground)
            .add(icon, { align: "center" })
            .add(titleText, { align: "top" })
            .add(button, { align: "bottom" })
    }
}

export interface CreateItemCardParams {
    assetKey: string;
    title: string;
    iconOffset?: IconOffsets;
    price?: string;
    onClick: () => void;
}

export interface IconOffsets {
    x?: number;
    y?: number;
}
