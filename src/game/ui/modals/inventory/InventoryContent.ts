import { BaseAssetKey, inventoryTypeAssetMap } from "@/game/assets"
import { CacheKey, SizerBaseConstructorParams } from "@/game/types"
import { DefaultInfo, InventorySchema, InventoryType, InventoryTypeSchema } from "@/modules/entities"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { BadgeLabel, GridSizer, GridTable } from "phaser3-rex-plugins/templates/ui/ui-components"
import { defaultInventoryTab, InventoryTab } from "./types"
import { calculateUiDepth, UILayer } from "@/game/layers"
import { getStorageInventories, getToolbarInventories } from "@/game/queries"
import { BaseText } from "../../elements"

export enum InventoryStorageTab {
    All = "all",
    Seeds = "seeds",
}

export const INVENTORY_GRID_TABLE_HEIGHT = 820
export const CELL_SPACING = 20
export const LEFT_MARGIN = 40
export const TOOLBAR_COLUMN_COUNT = 4
export const TOOLBAR_ROW_COUNT = 2
export const TOOLBAR_CELL_COUNT = TOOLBAR_COLUMN_COUNT * TOOLBAR_ROW_COUNT

// part of the inventory that holds the inventory items
export class InventoryContent extends BaseSizer {
    private background: Phaser.GameObjects.Image

    // grid storage & toolbar
    private storageGridTable: GridTable | undefined
    private toolbarGridSizer: GridSizer | undefined

    //
    private selectedInventoryTab: InventoryTab = defaultInventoryTab

    // data loaded from cache
    private storageInventories: Array<InventorySchema> = []
    private toolbarInventories: Array<InventorySchema> = []
    private inventoryTypes: Array<InventoryTypeSchema> = []

    private defaultInfo: DefaultInfo

    private gridWidth: number
    private cellWidth: number
    private cellHeight: number

    private selectedTab = InventoryStorageTab.All

    constructor({ scene, x, y, width, height }: SizerBaseConstructorParams) {
        super(scene, x, y, width, height)
        this.defaultInfo = this.scene.cache.obj.get(CacheKey.DefaultInfo)

        this.background = this.scene.add.image(0, -400, BaseAssetKey.ModalInventoryBackground).setOrigin(0.5, 1)
        this.addLocal(this.background)
        // Load inventories from cache
        const inventories = this.scene.cache.obj.get(CacheKey.Inventories) as Array<InventorySchema>
        this.storageInventories = getStorageInventories({ scene: this.scene, inventories })
        this.toolbarInventories = getToolbarInventories({ scene: this.scene, inventories })
        this.inventoryTypes = this.scene.cache.obj.get(CacheKey.InventoryTypes)
        
        // get cell width and height
        const frameSourceImage = this.scene.textures.get(BaseAssetKey.ModalCommonFrame).getSourceImage()
        this.cellWidth = frameSourceImage.width + CELL_SPACING
        this.cellHeight = frameSourceImage.height + CELL_SPACING
        this.gridWidth = this.cellWidth * 3 + LEFT_MARGIN

        this.updateStorageGridTable()
        this.updateToolbarGridSizer()

        //this.updateToolbar()
    }

    private updateStorageGridTable() {
        if (this.storageGridTable) {
            this.storageGridTable.setItems(this.getStorageItems())
            this.storageGridTable.layout()
            return
        }
        // create number of
        const storageGridTable = this.scene.rexUI.add.gridTable({
            y: -550,
            originY: 1,
            width: this.gridWidth,
            height: INVENTORY_GRID_TABLE_HEIGHT,
            table: {
                columns: 3, // Fixed 3 columns
                cellHeight: this.cellWidth, // Adjusted height per row
                cellWidth: this.cellHeight, // Adjusted width per column
                mask: { padding: 2 }, // Enable scrolling
                interactive: true, // Allow scrolling
            },
            slider: {
                track: this.scene.add.rectangle(0, 0, 10, INVENTORY_GRID_TABLE_HEIGHT, 0x888888),
                thumb: this.scene.add.rectangle(0, 0, 10, 40, 0xffffff),
            },
            mouseWheelScroller: { focus: false, speed: 2 },

            createCellContainerCallback: (cell, cellContainer) => {
                const background = this.scene.add.sprite(0, 0, BaseAssetKey.ModalCommonFrame)
                if (cellContainer === null) {
                    const badgeLabel = this.createBadgeLabel({
                        inventory: cell.item as InventorySchema | null,
                        width: background.width,
                        height: background.height,
                    })
                    if (!cellContainer) {
                        cellContainer = this.scene.rexUI.add.label({
                            width: background.width,
                            height: background.height,
                            background,
                            icon: badgeLabel,
                        }).setDepth(calculateUiDepth({
                            layer: UILayer.Modal,
                            layerDepth: 1,
                            additionalDepth: 1,
                        }))
                    }             
                }
                return cellContainer
            },
            items: this.getStorageItems(),
        }).layout()
        this.storageGridTable = storageGridTable
        this.addLocal(storageGridTable)
        return storageGridTable
    }

    private updateToolbarGridSizer() {
        if (this.toolbarGridSizer) {
            this.remove(this.toolbarGridSizer, true)
        }
        const items = this.getToolbarItems()
        const gridSizer = this.scene.rexUI.add.gridSizer({
            x: 0,
            y: 0,
            originY: 1,
            space: {
                column: CELL_SPACING,
                row: CELL_SPACING,
            },
            column: TOOLBAR_COLUMN_COUNT,
            row: TOOLBAR_ROW_COUNT,
            columnProportions: 1,
            rowProportions: 1,
            createCellContainerCallback: (scene, x, y, config) => {
                config.expand = true
                const frame = this.scene.add.image(0, 0, BaseAssetKey.ModalCommonFrame)
                const badgeLabel = this.createBadgeLabel({      
                    inventory: items[y * TOOLBAR_COLUMN_COUNT + x],
                    width: frame.width,
                    height: frame.height
                })
                const label = scene.rexUI.add.label({
                    width: frame.width,
                    height: frame.height,
                    background: frame,
                    icon: badgeLabel,
                }).setDepth(calculateUiDepth({
                    layer: UILayer.Modal,
                    layerDepth: 1,
                    additionalDepth: 1,
                }))
                return label
            },
        }).layout()
        this.toolbarGridSizer = gridSizer
        this.addLocal(gridSizer)
        return gridSizer
    }

    private createBadgeLabel({ height, inventory, width }: CreateBadgeLabelParams) {
        let badgeLabel: BadgeLabel | undefined
        if (inventory) {
            const inventoryType = this.inventoryTypes.find((inventoryType) => inventoryType.id === inventory.inventoryType)
            if (!inventoryType) {
                throw new Error(`Inventory type not found for inventory id: ${inventory.inventoryType}`)
            }
            const { textureConfig: { key } } = inventoryTypeAssetMap[inventoryType.displayId]
            // create the icon
            const icon = this.scene.add.image(0, 0, key)
                        
            badgeLabel = this.scene.rexUI.add.badgeLabel({
                center: icon,
                width,
                height,
                rightBottom: inventoryType.stackable ? this.createBadge(inventory.quantity) : undefined,
            }).setInteractive()

            badgeLabel.on("pointerdown", () => {
                console.log("B")
            })
                        
            // allow the drag
            this.scene.rexUI.add.drag(badgeLabel)
            let original: Phaser.Geom.Point

            // set depth
            badgeLabel.on("dragstart", () => {
                console.log("A")
                if (!badgeLabel) {
                    throw new Error("Badge label not found")
                }
                original = badgeLabel.getCenter()
                badgeLabel.setDepth(calculateUiDepth({
                    layer: UILayer.Modal,
                    layerDepth: 1,
                    additionalDepth: 3,
                }))
            })
            badgeLabel.on("dragend", () => {
                if (!badgeLabel) {
                    throw new Error("Badge label not found")
                }
                badgeLabel.setDepth(calculateUiDepth({
                    layer: UILayer.Modal,
                    layerDepth: 1,
                    additionalDepth: 1,
                }))
                // return the badge label to the original position
                badgeLabel.setPosition(original.x, original.y)
            })
        }
        return badgeLabel
    }

    private createBadge(quantity: number) {
        const frame = this.scene.add.image(0, 0, BaseAssetKey.ModalCommonQuantityFrame)
        const text = new BaseText({
            baseParams: {
                scene: this.scene,
                text: quantity.toString(),
                x: 0, 
                y: 0,
            },
            options: {
                enableStroke: true
            }
        })
        this.scene.add.existing(text)
        return this.scene.rexUI.add.label({
            width: frame.width,
            height: frame.height,
            background: frame,
            text,
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            }
        })
    }
    
    private getStorageItems() {
        const result: Array<InventorySchema | null> = []
        // filter all inventories based on the selected tab
        const inventories = this.storageInventories.filter((inventory) => {
            switch (this.selectedTab) {
            case InventoryStorageTab.All:
                return true
            case InventoryStorageTab.Seeds:
            {
                const inventoryType = this.inventoryTypes.find((inventoryType) => inventoryType.id === inventory.inventoryType)
                if (!inventoryType) {
                    throw new Error(`Inventory type not found for inventory id: ${inventory.inventoryType}`)
                }
                return inventoryType.type === InventoryType.Seed
            }
            }      
        })
        // create the inventory cells
        for (let i = 0; i < this.defaultInfo.inventoryCapacity; i++) {
            const inventory = inventories.find((inventory) => inventory.index === i)
            result.push(inventory || null)
        }
        return result
    }

    private getToolbarItems() {
        const result: Array<InventorySchema | null> = []
        // filter all inventories based on the selected tab
        // create the inventory cells
        for (let i = 0; i < TOOLBAR_CELL_COUNT; i++) {
            const inventory = this.toolbarInventories.find((inventory) => inventory.index === i)
            result.push(inventory || null)
        }
        return result
    }
}

export interface CreateBadgeLabelParams {
    inventory: InventorySchema | null
    width: number
    height: number
}