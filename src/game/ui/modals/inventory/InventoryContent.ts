import { BaseAssetKey, inventoryTypeAssetMap } from "@/game/assets"
import { CacheKey, BaseSizerBaseConstructorParams } from "@/game/types"
import {
    DefaultInfo,
    InventorySchema,
    InventoryTypeSchema,
} from "@/modules/entities"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import {
    GridSizer,
    Sizer,
} from "phaser3-rex-plugins/templates/ui/ui-components"
import { getFirstSeedInventory, getStorageInventories, getToolInventories } from "@/game/queries"
import { BaseGridTable, ItemQuantity, BaseGridTableFrame, getCellInfo, CellInfo, XButton } from "../../elements"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { MoveInventoryRequest } from "@/modules/axios"
import {
    CloseModalMessage,
    EventBus,
    EventName,
    ModalName,
    ShowPressHereArrowMessage,
} from "@/game/event-bus"
import { onGameObjectPress } from "../../utils"
import { HIGHLIGH_DEPTH, restoreTutorialDepth, setTutorialDepth } from "../../tutorial"
import { IPaginatedResponse } from "@/modules/apollo"
import { MODAL_BACKDROP_DEPTH_1, MODAL_DEPTH_1 } from "../ModalManager"
import { sleep } from "@/modules/common"
import { SCALE_TIME } from "@/game/constants"

const TOOLBAR_COLUMN_COUNT = 4
const TOOLBAR_ROW_COUNT = 2
const TOOLBAR_CELL_COUNT = TOOLBAR_COLUMN_COUNT * TOOLBAR_ROW_COUNT
const TOOLBAR_CELL_SIZE = 100

// part of the inventory that holds the inventory items
export class InventoryContent extends BaseSizer {
    private background: Phaser.GameObjects.Image
    private closeButton: XButton
    // grid storage & toolbar
    private storageGridTable: BaseGridTable<InventorySchema | null> | undefined
    private toolbarGridSizer: GridSizer | undefined
    private cellInfo: CellInfo
    private inventorySeedMoveToToolbar = false
    // zones
    private toolbarZones: Array<Zone> = []

    // items
    private items: Record<string, ItemQuantity> = {}

    // data loaded from cache
    private inventories: Array<InventorySchema> = []
    private inventoryTypes: Array<InventoryTypeSchema> = []
    private defaultInfo: DefaultInfo
    private enableTutorial = false

    constructor({ scene, x, y, width, height }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, width, height)
        this.defaultInfo = this.scene.cache.obj.get(CacheKey.DefaultInfo)
        this.background = this.scene.add
            .image(0, 0, BaseAssetKey.UIModalInventoryBackground)
            .setOrigin(0.5, 1)
        this.addLocal(this.background)
        // Load inventories from cache
        const { data } = this.scene.cache.obj.get(
            CacheKey.Inventories
        ) as IPaginatedResponse<InventorySchema>
        this.inventories = data

        this.cellInfo = getCellInfo(this.scene)

        this.inventoryTypes = this.scene.cache.obj.get(CacheKey.InventoryTypes)


        this.closeButton = new XButton({
            baseParams: {
                scene: this.scene,
                config: {
                    x: this.background.width / 2 - 50,
                    y: -this.background.height + 50,
                }
            },
            options: { 
                onPress: () => {
                    onGameObjectPress({
                        gameObject: this.closeButton,
                        onPress: () => {
                            const eventMessage: CloseModalMessage = {
                                modalName: ModalName.Inventory,
                            }
                            if (this.inventorySeedMoveToToolbar) {
                                this.scene.events.emit(EventName.TutorialCloseInventoryButtonPressed)
                                this.scene.events.emit(EventName.HidePressHereArrow)
                                restoreTutorialDepth({
                                    gameObject: this.closeButton,
                                    scene: this.scene,
                                })
                                this.enableScroller()
                            }
                            EventBus.emit(EventName.CloseModal, eventMessage)
                        },
                        scene: this.scene,
                    })
                }
            }
        })
        this.scene.add.existing(this.closeButton)
        this.addLocal(this.closeButton)

        this.updateStorageGridTable()
        this.updateToolbarGridSizer()

        EventBus.on(
            EventName.InventoriesRefreshed,
            ({ data }: IPaginatedResponse<InventorySchema>) => {
                this.inventories = data
                this.updateStorageGridTable()
                this.updateToolbarGridSizer()
            }
        )

        this.scene.events.once(EventName.TutorialInventoryButtonPressed, async () => {
            await sleep(SCALE_TIME)
            this.enableTutorial = true
            this.highlightCell()
        })
    //this.updateToolbar()
    }

    private highlightCell() {
        // get the label that 
        const inventory = getFirstSeedInventory({
            inventories: this.inventories,
            scene: this.scene,
            cropId: this.defaultInfo.defaultCropId,
        })
        if (!inventory) {
            throw new Error("Inventory was not found")
        }
        //this.setDepth(HIGHLIGH_DEPTH)
        const cell = this.items[inventory.id]
        if (!cell) {
            throw new Error("Cell not found")
        }
        setTutorialDepth({
            gameObject: cell,
            scene: this.scene,
            storeDepth: false
        })

        const { x,y } = cell.getCenter()
        
        const eventMessage: ShowPressHereArrowMessage = {
            rotation: 45,
            originPosition: {
                x: x - 60,
                y: y + 60,
            },
            targetPosition: {
                x: x - 40,
                y: y + 40,
            },
        }
        this.scene.events.emit(EventName.ShowPressHereArrow, eventMessage)

        this.disableScroller()
    }

    private disableScroller() {
        this.storageGridTable?.setScrollerEnable(false)
        this.storageGridTable?.setMouseWheelScrollerEnable(false)
    }

    private enableScroller() {
        this.storageGridTable?.setScrollerEnable(true)
        this.storageGridTable?.setMouseWheelScrollerEnable(true)
    }

    private handleUpdateStorageGridTable() {
        const items = this.getStorageItems()
        if (this.storageGridTable) {
            this.storageGridTable.setItems(items)
            this.storageGridTable.layout()
            return this.storageGridTable
        }
        // create number of
        this.storageGridTable = new BaseGridTable<InventorySchema | null>({
            baseParams: {
                scene: this.scene,
                config: {
                    x: 0,
                    y: -800,
                    originY: 1,
                }
            },
            options: {
                createCellContainerCallback: (cell, cellContainer) => {
                    const background = new BaseGridTableFrame({ scene: this.scene, x: 0, y: 0 })
                    this.scene.add.existing(background)
                    if (cellContainer === null) {
                        let gridTableCell: ItemQuantity | undefined
                        if (cell.item) {
                            gridTableCell = this.createCell(cell.item as InventorySchema)
                        }
                        if (!cellContainer) {
                            cellContainer = this.scene.rexUI.add.sizer({ orientation: "y" })
                            const _cellContainer = cellContainer as Sizer
                            _cellContainer.add(
                                this.scene.rexUI.add
                                    .label({
                                        width: background.width,
                                        height: background.height,
                                        background,
                                        icon: gridTableCell,
                                    })
                                    .setScale(this.cellInfo.scale)
                                    .setDepth(
                                        MODAL_DEPTH_1 + 1
                                    )
                            )
                        }
                    //add separator
                    //const separator = cellContainer.getElement("separator")
                    }
                    return cellContainer
                },
                items,
            }
        }).layout()

        this.scene.add.existing(this.storageGridTable)
        this.addLocal(this.storageGridTable)
        return this.storageGridTable
    }
    private updateStorageGridTable() {
        const result = this.handleUpdateStorageGridTable()
        // if finalized
        if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
            if (this.inventorySeedMoveToToolbar) {
                this.scene.events.emit(EventName.TutorialInventorySeedMoveToToolbar)
                const { x, y } = this.closeButton.getCenter()
                const eventMessage: ShowPressHereArrowMessage = {
                    rotation: 45,
                    originPosition: { x: x - 60, y: y + 60 },
                    targetPosition: { x: x - 40, y: y + 40 },
                }
                this.scene.events.emit(EventName.ShowPressHereArrow, eventMessage)
                this.disableScroller()
                setTutorialDepth({
                    gameObject: this.closeButton,
                    scene: this.scene,
                })
                return result
            }
            if (this.enableTutorial) {
                this.highlightCell()
            }
        }
        return result
    }

    private updateToolbarGridSizer() {
        if (this.toolbarGridSizer) {
            this.remove(this.toolbarGridSizer, true)
        }
        const items = this.getToolItems()
        const gridSizer = this.scene.rexUI.add
            .gridSizer({
                x: 20,
                y: -195,
                originY: 1,
                space: {
                    column: 5,
                    row: 5,
                },
                column: TOOLBAR_COLUMN_COUNT,
                row: TOOLBAR_ROW_COUNT,
                columnProportions: 1,
                rowProportions: 1,
                createCellContainerCallback: (scene, x, y, config) => {
                    config.expand = true
                    let gridTableCell: ItemQuantity | undefined
                    const inventory = items[y * TOOLBAR_COLUMN_COUNT + x]
                    if (inventory) {
                        gridTableCell = this.createCell(inventory)
                    }
                    const label = scene.rexUI.add
                        .label({
                            width: this.cellInfo.cellWidth,
                            height: this.cellInfo.cellHeight,
                            icon: gridTableCell,
                        })
                        .setDepth(
                            MODAL_DEPTH_1 + 2
                        )
                    this.toolbarZones.push({
                        index: y * TOOLBAR_COLUMN_COUNT + x,
                        object: label,
                    })
                    label.setScale(TOOLBAR_CELL_SIZE / this.cellInfo.cellWidth)
                    return label
                },
            })
            .layout()
        this.toolbarGridSizer = gridSizer
        this.addLocal(gridSizer)
        return gridSizer
    }

    private createCell(inventory: InventorySchema) {
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
            },
            options: {
                assetKey: key,
                quantity: inventory.quantity,
                showBadge: inventoryType.stackable,
            },
        })
        this.items[inventory.id] = cell
        this.scene.add.existing(cell)
        cell.setInteractive()

        // allow the drag
        this.scene.rexUI.add.drag(cell)
        let original: Phaser.Geom.Point

        // set depth
        cell.on("dragstart", () => {
            if (!cell) {
                throw new Error("Badge label not found")
            }
            original = cell.getCenter()
            const depth = this.scene.cache.obj.get(CacheKey.TutorialActive) ? HIGHLIGH_DEPTH : MODAL_BACKDROP_DEPTH_1 + 4
            cell.setDepth(
                depth
            )
        })
        cell.on("dragend", (pointer: Phaser.Input.Pointer) => {
            if (!cell) {
                throw new Error("Badge label not found")
            }
            const depth = this.scene.cache.obj.get(CacheKey.TutorialActive) ? HIGHLIGH_DEPTH : MODAL_BACKDROP_DEPTH_1 + 2
            cell.setDepth(
                depth
            )

            // index of the inventory
            let index = -1
            let isTool = true

            // check if the badge label is inside the toolbar
            const zone = this.toolbarZones.find((zone) =>
                (zone.object as ContainerLite)
                    .getBounds()
                    .contains(pointer.x, pointer.y)
            )
            if (zone) {
                //console.log(zone)
                // return the badge label to the original position
                index = zone.index
            } else {
                if (!this.storageGridTable) {
                    throw new Error("Storage grid table not found")
                }
                for (let i = 0; i < this.storageGridTable.items.length; i++) {
                    const cellContainer = this.storageGridTable.getCellContainer(i)
                    if (
                        cellContainer &&
              (cellContainer as ContainerLite)
                  .getBounds()
                  .contains(pointer.x, pointer.y)
                    ) {
                        index = i
                        isTool = false
                        break
                    }
                }
            }

            if (index === -1) {
                //console.log(zone)
                // return the badge label to the original position
                cell.setPosition(original.x, original.y)
                return
            }

            // call api to move the inventory
            const eventMessage: MoveInventoryRequest = {
                index,
                isTool,
                inventoryId: inventory.id,
            }
            EventBus.once(EventName.MoveInventoryCompleted, () => {
                if (!cell) {
                    throw new Error("Badge label not found")
                }
                if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                    if (isTool) {
                        this.inventorySeedMoveToToolbar = true
                        this.enableTutorial = false
                    }
                }
                //  dtroy the badge label
                const parent = cell.getParent()
                parent.remove(cell, true)
                EventBus.emit(EventName.RefreshInventories)
            })
            EventBus.emit(EventName.RequestMoveInventory, eventMessage)
        })
        return cell
    }

    private getStorageItems() {
        const result: Array<InventorySchema | null> = []
        // filter all inventories based on the selected tab
        const storageInventories = getStorageInventories({
            inventories: this.inventories,
            scene: this.scene,
        })
        // create the inventory cells
        for (let i = 0; i < this.defaultInfo.storageCapacity; i++) {
            const inventory = storageInventories.find(
                (inventory) => inventory.index === i
            )
            result.push(inventory || null)
        }
        return result
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

interface Zone {
  index: number;
  object: Phaser.GameObjects.GameObject;
}
