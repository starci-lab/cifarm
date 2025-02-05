import { BaseAssetKey } from "@/game/assets"
import { SizerBaseConstructorParams } from "@/game/types"
import { DeliveringProductEntity } from "@/modules/entities"
import { GridTable } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseText, StrokeColor, TextColor } from "../../elements"
import { UISizer } from "../../UISizer"
import { adjustTextMinLength } from "../../utils"

export class StandContent extends UISizer {
    private gridTable: GridTable | undefined
    //data
    private deliveringProduct: Array<DeliveringProductEntity> = []

    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)
        this.createStandTable()

        // load delivering products
        // this.deliveringProduct = this.scene.cache.obj.get(CacheKey.Inventories)
        // this.deliveringProduct = this.deliveringProduct.filter((inventory) => inventory.inventoryType === this.selectedStandTab)
    }

    private createStandTable() {
        const { width, height } = this.scene.game.scale

        const itemList = [
            { 
                assetKey: BaseAssetKey.IconNeighbors, title: "Wheat Seed", onClick: () => console.log("Clicked on Wheat Seed"),
            },
            { 
                assetKey: BaseAssetKey.IconNeighbors, title: "Wheat Seed", onClick: () => console.log("Clicked on Wheat Seed"),
            },
            { 
                assetKey: BaseAssetKey.IconNeighbors, title: "Wheat Seed", onClick: () => console.log("Clicked on Wheat Seed"),
            },
            { 
                assetKey: BaseAssetKey.IconNeighbors, title: "Wheat Seed", onClick: () => console.log("Clicked on Wheat Seed"),
            },
            { 
                assetKey: BaseAssetKey.IconNeighbors, title: "Wheat Seed", onClick: () => console.log("Clicked on Wheat Seed"),
            },
            { 
                assetKey: BaseAssetKey.IconNeighbors, title: "Wheat Seed", onClick: () => console.log("Clicked on Wheat Seed"),
            },
        ]

        this.gridTable = this.scene.rexUI.add.gridTable({
            x: width / 2,
            y: height / 2,
            width,
            height,
            background: this.scene.add.rectangle(0, 0, 1000, 800, 0x222222, 0.1),
            table: {
                columns: 3,
                mask: { padding: 2 },
                interactive: true,
                cellHeight: 100,
                cellWidth: 150,
            },
            slider: {
                track: this.scene.add.rectangle(0, 0, 20, 200, 0x888888),
                thumb: this.scene.add.rectangle(0, 0, 20, 50, 0xffffff),
            },
            mouseWheelScroller: { focus: false, speed: 2 },
            space: { left: 40, right: 40, top: 20, bottom: 20, table: 40 },
            createCellContainerCallback: (cell) => {
                return this.createItemCard(itemList[cell.index])
            },
            items: itemList,
        }).layout().setOrigin(0.5, 0)

        this.add(this.gridTable)
    }

    private createItemCard({ assetKey, title, onClick }: CreateItemCardParams) {
        const cardBackground = this.scene.add.image(0, 0, BaseAssetKey.ModalInventoryCell).setScale(0.5)

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

        //Quantity
        const icon = this.scene.add.image(this.x, this.y, assetKey).setOrigin(1, 1)
        const button = this.scene.rexUI.add.label({
            background: this.scene.add.image(0, 0, BaseAssetKey.ModalInventoryCellQuantity).setScale(1),
            text: titleText,
        }).setInteractive()

        button.on("pointerdown", () => {
            console.log("Clicked on button")
            onClick()
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