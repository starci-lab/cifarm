import { BaseAssetKey } from "@/game/assets"
import { inventoryTypeAssetMap } from "@/game/assets/inventoryTypes"
import { CacheKey } from "@/game/types"
import { InventorySchema, InventoryTypeSchema } from "@/modules/entities"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { GridTable } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseText } from "../../elements"
import { defaultInventoryTab, InventoryTab } from "./types"

export class InventoryContent extends BaseSizer {
    private gridTable: GridTable | undefined
    private selectedInventoryTab: InventoryTab = defaultInventoryTab
    private inventories: Array<InventorySchema> = []

    constructor({ scene, x, y, width, height }: BaseSizer) {
        super(scene, x, y, width, height)
        // Load inventories from cache
        this.inventories = this.scene.cache.obj.get(CacheKey.Inventories)
        
        this.createInventoryTable()
    }

    private createInventoryTable() {
        const gridWidth = 750
        const gridHeight = 1000

        const itemList: Array<CreateItemCardParams> = this.inventories.map((inventory) => {
            const inventoryTypes = this.scene.cache.obj.get(CacheKey.InventoryTypes) as Array<InventoryTypeSchema>
            const inventoryType = inventoryTypes.find((inventoryType) => inventoryType.id === inventory.inventoryType)
            if (!inventoryType) {
                throw new Error(`Inventory type not found for inventory id: ${inventory.inventoryType}`)
            }
            return {
                assetKey: inventoryTypeAssetMap[inventoryType.displayId].textureConfig.key,
                quantity: inventory.quantity,
                onPress: () => {
                    console.log("Clicked")
                }
            }
        })

        this.gridTable = this.scene.rexUI.add.gridTable({
            x: 30,
            y: 0,
            width: gridWidth,
            height: gridHeight,
            background: this.scene.add.rectangle(0, 0, gridWidth, gridHeight, 0x222222, 0),
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

        this.addLocal(this.gridTable)
    }

    private createItemCard({ assetKey, quantity, onPress }: CreateItemCardParams) {
        const background = this.scene.add.sprite(0, 0, BaseAssetKey.ModalInventoryCell)
            .setOrigin(0.5, 0.5)
            .setDepth(1)
    
        const icon = this.scene.add.image(0, 0, assetKey)
            .setOrigin(0.5, 0.5)
            .setScale(1.2)
            .setDepth(2)

        
    
        // add quantity
        const quantityBackground = this.scene.add.sprite(0, 0, BaseAssetKey.ModalInventoryCellQuantity).setOrigin(1, 1)
        const quantityText = new BaseText({
            baseParams: {
                scene: this.scene,
                x: -10,
                y: 0,
                text: quantity ? quantity.toString() : "1",
            },
            options: {
                fontSize: 32,
            },
        }).setOrigin(1, 1)

        //add into quantity container
        const quantityContainer = this.scene.add.container(0, 0)
        quantityContainer.add(quantityBackground)
        quantityContainer.add(quantityText)
    
        const itemBadge = this.scene.rexUI.add.badgeLabel({
            width: 200, height: 200,
            background: background,
            main: this.scene.rexUI.add.label({
                icon: icon,
            }),
            rightBottom: quantityContainer,
        }).layout()
    
        itemBadge.setInteractive().on("pointerdown", () => {
            onPress()
        })
    
        return itemBadge
    }
    
}

export interface CreateItemCardParams {
    assetKey: string;
    quantity?: number;
    onPress: () => void;
}
