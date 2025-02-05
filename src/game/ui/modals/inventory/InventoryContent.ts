import { BaseAssetKey } from "@/game/assets"
import { CacheKey, SizerBaseConstructorParams } from "@/game/types"
import { InventoryEntity } from "@/modules/entities"
import { GridTable } from "phaser3-rex-plugins/templates/ui/ui-components"
import { UISizer } from "../../UISizer"
import { defaultInventoryTab, InventoryTab } from "./types"

export class InventoryContent extends UISizer {
    private gridTable: GridTable | undefined
    private selectedInventoryTab: InventoryTab = defaultInventoryTab
    private inventories: Array<InventoryEntity> = []

    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)
        this.createInventoryTable()

        // Load inventories from cache
        this.inventories = this.scene.cache.obj.get(CacheKey.Inventories)
    }

    private createInventoryTable() {
        const { width, height } = this.scene.game.scale

        const gridWidth = 750
        const gridHeight = 1000

        const itemList = [
            { assetKey: BaseAssetKey.IconNeighbors, title: "Wheat Seed", onClick: () => console.log("Clicked on Wheat Seed") },
            { assetKey: BaseAssetKey.IconNeighbors, title: "Corn Seed", onClick: () => console.log("Clicked on Corn Seed") },
            { assetKey: BaseAssetKey.IconNeighbors, title: "Rice Seed", onClick: () => console.log("Clicked on Rice Seed") },
            { assetKey: BaseAssetKey.IconNeighbors, title: "Apple", onClick: () => console.log("Clicked on Apple") },
            { assetKey: BaseAssetKey.IconNeighbors, title: "Orange", onClick: () => console.log("Clicked on Orange") },
            { assetKey: BaseAssetKey.IconNeighbors, title: "Banana", onClick: () => console.log("Clicked on Banana") },
            { assetKey: BaseAssetKey.IconNeighbors, title: "Grapes", onClick: () => console.log("Clicked on Grapes") },
        ]

        this.gridTable = this.scene.rexUI.add.gridTable({
            x: width / 2,
            y: height / 2 + 200,
            width: gridWidth,
            height: gridHeight,
            background: this.scene.add.rectangle(0, 0, gridWidth, gridHeight, 0x222222, 0.1),
            table: {
                columns: 3, // Fixed 3 columns
                cellWidth: 250, // Adjusted to fit 3x width
                cellHeight: 250, // Adjusted height per row
                mask: { padding: 2 }, // Enable scrolling
                interactive: true // Allow scrolling
            },
            slider: {
                track: this.scene.add.rectangle(0, 0, 10, gridHeight, 0x888888),
                thumb: this.scene.add.rectangle(0, 0, 10, 40, 0xffffff),
            },
            mouseWheelScroller: { focus: false, speed: 2 },
            space: { left: 10, right: 10, top: 10, bottom: 10, table: 10 },
            createCellContainerCallback: (cell) => {
                return this.createItemCard(itemList[cell.index])
            },
            items: itemList,
        }).layout().setOrigin(0.5, 0.5)

        this.add(this.gridTable)
    }

    private createItemCard({ assetKey, title, onClick }: CreateItemCardParams) {

        const icon = this.scene.add.image(0, 0, assetKey)
            .setOrigin(0.5, 0.5)
            .setScale(1.5)


        // Make the entire item interactive
        const container = this.scene.rexUI.add.sizer({
            width: 250, // Same as cellWidth
            height: 250, // Same as cellHeight
            orientation: "vertical",
            space: { item: 5 }
        })
            .add(icon, { align: "center" }) // Icon in center
            .setInteractive() // Make the whole container clickable
            .on("pointerdown", () => {
                onClick()
            })

        return container
    }
}

export interface CreateItemCardParams {
    assetKey: string;
    title: string;
    onClick: () => void;
}
