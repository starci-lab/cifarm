import { BaseAssetKey, inventoryTypeAssetMap } from "../../../assets"
import { IPaginatedResponse } from "@/modules/apollo"
import { InventorySchema, InventoryTypeSchema } from "@/modules/entities"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { GridSizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { ItemQuantity } from "../../elements"
import { CacheKey } from "../../../types"
import { getToolInventories } from "../../../queries"
import { MODAL_DEPTH_1 } from "../ModalManager"
import { EventBus, EventName } from "@/game/event-bus"
import { CELL_SIZE } from "./InventoryModal"

const TOOLBAR_COLUMN_COUNT = 4
const TOOLBAR_ROW_COUNT = 2
const TOOLBAR_CELL_COUNT = TOOLBAR_COLUMN_COUNT * TOOLBAR_ROW_COUNT

export class InventoryToolbar extends ContainerLite {
    private inventories: Array<InventorySchema> = []
    private inventoryTypes: Array<InventoryTypeSchema> = []
    private toolbarGridSizer: GridSizer | undefined
    constructor(scene: Phaser.Scene, x: number, y: number) {
        // add toolbar
        const toolbarImage = scene.add.image(0,0, BaseAssetKey.UIModalInventoryToolbar).setOrigin(0.5, 1)
        // add chain
        const chainImage = scene.add.image(0, -(toolbarImage.height - 70), BaseAssetKey.UIModalInventoryChain).setOrigin(0.5, 1)
        // swap the chain and toolbar
        super(scene, x, y, toolbarImage.width, toolbarImage.height + chainImage.height - 70)
        this.addLocal(toolbarImage)
        this.addLocal(chainImage)
        this.bringChildToTop(toolbarImage)
        // add grass
        const grassImage = this.scene.add.image(0,0, BaseAssetKey.UIModalCommonGrass).setOrigin(0.5, 1)
        this.addLocal(grassImage)

        // fetch the inventories
        const { data } = this.scene.cache.obj.get(CacheKey.Inventories) as IPaginatedResponse<InventorySchema>
        this.inventories = data
        this.inventoryTypes = this.scene.cache.obj.get(CacheKey.InventoryTypes)

        this.updateToolbarGridSizer()

        EventBus.on(
            EventName.InventoriesRefreshed,
            ({ data }: IPaginatedResponse<InventorySchema>) => {
                this.inventories = data
                this.updateToolbarGridSizer()
            }
        ) 
    }

    private updateToolbarGridSizer() {
        if (this.toolbarGridSizer) {
            this.remove(this.toolbarGridSizer, true)
        }
        const items = this.getToolItems()
        const background = this.scene.add.image(0, 0, BaseAssetKey.UIModalInventoryToolbarContainer)
        const gridSizer = this.scene.rexUI.add
            .gridSizer({
                y: -150,
                originY: 1,
                space: {
                    column: 10,
                    row: 10,
                    top: 20, 
                    bottom: 20, 
                    left: 20, 
                    right: 20,
                },
                width: background.width,
                height: background.height,
                column: TOOLBAR_COLUMN_COUNT,
                row: TOOLBAR_ROW_COUNT,
                columnProportions: 1,
                rowProportions: 1,
                createCellContainerCallback: (scene, x, y, config) => {
                    config.expand = true
                    let gridTableCell: ItemQuantity | undefined
                    const inventory = items[y * TOOLBAR_COLUMN_COUNT + x]
                    if (inventory) {
                        const inventoryType = this.inventoryTypes.find(
                            (inventoryType) => inventoryType.id === inventory.inventoryType
                        )
                        if (!inventoryType) {
                            throw new Error(
                                `Inventory type not found for inventory id: ${inventory.inventoryType}`
                            )
                        }
                        const {
                            textureConfig: { key },
                        } = inventoryTypeAssetMap[inventoryType.displayId]
                                    
                        const cell = new ItemQuantity({
                            baseParams: {
                                scene: this.scene,
                                config: {
                                    width: CELL_SIZE,
                                    height: CELL_SIZE,
                                }
                            },
                            options: {
                                assetKey: key,
                                quantity: inventory.quantity,
                                showBadge: inventoryType.stackable,
                            },
                        }).layout()
                        this.scene.add.existing(cell)
                        gridTableCell = cell
                    }
                    const container = scene.rexUI.add
                        .container().setDepth(MODAL_DEPTH_1 + 1)
                        
                    if (gridTableCell) {
                        container.add(gridTableCell)
                    }
                    return container
                },
            }).addBackground(background)
            .layout()
        this.toolbarGridSizer = gridSizer
        this.addLocal(gridSizer)
        return gridSizer
    }

    private getToolItems() {
        const result: Array<InventorySchema | null> = []
        // filter all inventories based on the selected tab
        // create the inventory cells
        const toolbarInventories = getToolInventories({
            inventories: this.inventories,
            scene: this.scene,
        })
        console.log(toolbarInventories)
        for (let i = 0; i < TOOLBAR_CELL_COUNT; i++) {
            const inventory = toolbarInventories.find(
                (inventory) => inventory.index === i
            )
            result.push(inventory || null)
        }
        return result
    }
}