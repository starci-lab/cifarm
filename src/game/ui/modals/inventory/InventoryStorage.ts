import { inventoryTypeAssetMap } from "@/game/assets"
import { CacheKey, BaseSizerBaseConstructorParams } from "@/game/types"
import {
    DefaultInfo,
    InventorySchema,
    InventoryTypeSchema,
} from "@/modules/entities"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import {
    Label,
} from "phaser3-rex-plugins/templates/ui/ui-components"
import { getFirstSeedInventory, getStorageInventories } from "@/game/queries"
import {
    BaseGridTable,
    ItemQuantity,
    BaseGridTableFrame,
    ModalBackground,
    Background,
    XButton,
    CellSize,
    getCellSize,
} from "../../elements"
import {
    CloseModalMessage,
    EventBus,
    EventName,
    ModalName,
    RequestStorageInventoryIndexMessage,
    RequestToolbarInventoryIndexMessage,
    ShowPressHereArrowMessage,
} from "@/game/event-bus"
import { restoreTutorialDepth, setTutorialDepth } from "../../tutorial"
import { IPaginatedResponse } from "@/modules/apollo"
import { sleep } from "@/modules/common"
import { SCALE_TIME } from "@/game/constants"
import { MoveInventoryRequest } from "@/modules/axios"
import { CELL_STORAGE_DATA_KEY } from "./constants"
import { DragItemParams } from "./types"
import { getDepth } from "./utils"

// part of the inventory that holds the inventory items
export class InventoryStorage extends BaseSizer {
    private background: ModalBackground
    // grid storage & toolbar
    private gridTable: BaseGridTable<InventorySchema | null> | undefined
    private inventorySeedMoveToToolbar = false
    // items
    private items: Record<string, ItemQuantity> = {}

    // data loaded from cache
    private inventories: Array<InventorySchema> = []
    private inventoryTypes: Array<InventoryTypeSchema> = []
    private defaultInfo: DefaultInfo
    private tutorialEnabled = false
    private tutorialSeedInventoryId: string | undefined
    private cellSize: CellSize
    constructor({ scene, x, y, width, height }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, width, height)
        this.cellSize = getCellSize(this.scene)

        this.defaultInfo = this.scene.cache.obj.get(CacheKey.DefaultInfo)
        this.background = new ModalBackground({
            baseParams: {
                scene: this.scene,
            },
            options: {
                background: Background.Large,
                container: {
                    showWrapperContainer: true,
                    showContainer: true
                },
                onXButtonPress: (xButton: XButton) => {
                    const eventMessage: CloseModalMessage = {
                        modalName: ModalName.Inventory,
                    }
                    if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                        this.scene.events.emit(EventName.TutorialCloseInventoryButtonPressed)
                        this.scene.events.emit(EventName.HidePressHereArrow)
                        restoreTutorialDepth({
                            gameObject: xButton,
                            scene: this.scene,
                        })
                    }
                    EventBus.emit(EventName.CloseModal, eventMessage)
                },
                title: "Inventory",
            },
        })
        this.addLocal(this.background)
        // Load inventories from cache
        const { data } = this.scene.cache.obj.get(
            CacheKey.Inventories
        ) as IPaginatedResponse<InventorySchema>
        this.inventories = data

        this.inventoryTypes = this.scene.cache.obj.get(CacheKey.InventoryTypes)
        this.updateGridTable()

        EventBus.on(
            EventName.InventoriesRefreshed,
            ({ data }: IPaginatedResponse<InventorySchema>) => {
                this.inventories = data
                this.updateGridTable()
            }
        )

        this.scene.events.once(
            EventName.TutorialInventoryButtonPressed,
            async () => {
                await sleep(SCALE_TIME)
                this.tutorialEnabled = true
                this.highlight()
            }
        )

        this.scene.events.on(EventName.RequestStorageInventoryIndex, ({ pointer }: RequestStorageInventoryIndexMessage) => {
            this.scene.events.emit(EventName.StorageInventoryIndexResponsed,  this.getPositionIndex(pointer))
        })

        // set the tutorial depth
        scene.events.once(EventName.TutorialPrepareCloseInventory, () => {
            this.tutorialEnabled = false
            // re-render the grid table
            this.updateGridTable()
            setTutorialDepth({
                gameObject: this.background.xButton,
                scene,
            })
            const { x, y } = this.background.xButton.getCenter()
            const eventMessage: ShowPressHereArrowMessage = {
                rotation: 45,
                originPosition: { x: x - 60, y: y + 60 },
                targetPosition: { x: x - 40, y: y + 40 },
            }
            scene.events.emit(EventName.ShowPressHereArrow, eventMessage)
        })
    }

    private highlight() {
        // get the label that
        const inventory = getFirstSeedInventory({
            inventories: this.inventories,
            scene: this.scene,
            cropId: this.defaultInfo.defaultCropId,
        })
        if (!inventory) {
            throw new Error("Inventory was not found")
        }
        this.tutorialSeedInventoryId = inventory.id
        // this.setDepth(HIGHLIGH_DEPTH)
        const cell = this.items[this.tutorialSeedInventoryId]
        if (!cell) {
            throw new Error("Cell not found")
        }
        if (!this.gridTable) {
            throw new Error("Grid table not found")
        }
        setTutorialDepth({
            gameObject: this.gridTable,
            scene: this.scene,
            storeDepth: false,
        })
        const { x, y } = cell.getCenter()
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
    }

    private disableScroller() {
        this.gridTable?.setScrollerEnable(false)
        this.gridTable?.setMouseWheelScrollerEnable(false)
    }

    private enableScroller() {
        this.gridTable?.setScrollerEnable(true)
        this.gridTable?.setMouseWheelScrollerEnable(true)
    }

    private _updateGridTable() {
        const items = this.getStorageItems()
        if (this.gridTable) {
            this.gridTable.setItems(items)
            this.gridTable.layout()
            return this.gridTable
        }
        // create number of
        if (!this.background.containerImage) {
            throw new Error("Background container image not found")
        }
        this.gridTable = new BaseGridTable<InventorySchema | null>({
            baseParams: {
                scene: this.scene,
                config: {
                    width: this.background.containerImage.width, 
                    height: this.background.containerImage.height,
                    originY: 1,
                    y: this.background.wrapperContainerOffsetY
                },
            },
            options: {
                createCellContainerCallback: (cell, cellContainer) => {
                    const background = new BaseGridTableFrame({
                        scene: this.scene,
                        x: 0,
                        y: 0,
                    })
                    this.scene.add.existing(background)
                    if (cellContainer === null) {
                        let itemQuantity: ItemQuantity | undefined
                        if (cell.item) {
                            const {
                                quantity,
                                inventoryType: inventoryTypeId,
                                id,
                            } = cell.item as InventorySchema
                            const inventoryType = this.inventoryTypes.find(
                                (inventoryType) => inventoryType.id === inventoryTypeId
                            )
                            if (!inventoryType) {
                                throw new Error(
                                    `Inventory type not found for inventory id: ${inventoryTypeId}`
                                )
                            }
                            itemQuantity = new ItemQuantity({
                                baseParams: {
                                    scene: this.scene,
                                    config: {
                                        width: this.cellSize.width,
                                        height: this.cellSize.height,
                                    },
                                },
                                options: {
                                    assetKey:
                    inventoryTypeAssetMap[inventoryType?.displayId]
                        .textureConfig.key,
                                    quantity,
                                    showBadge: inventoryType.stackable,
                                },
                            })
                            this.items[id] = itemQuantity
                        }
                        if (!cellContainer) {
                            cellContainer = this.scene.rexUI.add
                                .label({
                                    width: this.cellSize.width,
                                    height: this.cellSize.height,
                                    background,
                                    icon: itemQuantity,
                                })
                                .setDepth(getDepth({
                                    scene: this.scene,
                                    tutorialEnabled: this.tutorialEnabled,
                                    plus: 2
                                }))
                                .layout()
                        }
                    }
                    cellContainer.setData(CELL_STORAGE_DATA_KEY, cell.item)
                    return cellContainer
                },
                items,
            },
        }).layout()
        this.gridTable.on(
            "cell.pressstart",
            (
                cellContainer: Label,
            ) => {
                const itemQuantity = cellContainer.getElement("icon") as ItemQuantity
                if (!itemQuantity) {
                    throw new Error("Item quantity not found")
                }
                // disable the scroller
                this.disableScroller()
                if (this.scene.rexUI.isInTouching(itemQuantity)) {
                    // detach from the parent
                    const dragItem = itemQuantity.duplicate()
                    const parent = itemQuantity.getParent()
                    if (!parent) {
                        throw new Error("Parent not found")
                    }
                    parent.remove(itemQuantity, true)
                    dragItem.setDepth(getDepth({
                        scene: this.scene,
                        tutorialEnabled: this.tutorialEnabled,
                        plus: 3
                    }))
                    this.scene.rexUI.add.drag(dragItem).drag()
                    dragItem.on("dragend", (pointer: Phaser.Input.Pointer) => {
                        if (!itemQuantity) {
                            throw new Error("Badge label not found")
                        }
                        dragItem.setDepth(getDepth({
                            scene: this.scene,
                            tutorialEnabled: this.tutorialEnabled,
                            plus: 2
                        }))
                        if (!this.gridTable) {
                            throw new Error("Storage grid table not found")
                        }
                        this.dragItem({
                            item: dragItem,
                            pointer,
                            data: cellContainer.getData(CELL_STORAGE_DATA_KEY) as InventorySchema,
                        })
                    })
                }
            }
        )
        this.scene.add.existing(this.gridTable)
        if (!this.background.container) {
            throw new Error("Background container not found")
        }
        this.background.container.addLocal(this.gridTable)
        return this.gridTable
    }

    private updateGridTable() {
        const gridTable = this._updateGridTable()
        if (this.tutorialEnabled) {
            this.highlight()
        }
        gridTable.setDepth(getDepth({
            scene: this.scene,
            tutorialEnabled: this.tutorialEnabled,
            plus: 1
        }))
    }

    // -1 indicate not found
    private getPositionIndex(pointer: Phaser.Input.Pointer) {
        if (!this.gridTable) {
            throw new Error("Storage grid table not found")
        }
        for (let index = 0; index < this.gridTable.items.length; index++) {
            const indexedCellContainer = this.gridTable.getCellContainer(
                index
            ) as Label
            if (
                indexedCellContainer &&
        (indexedCellContainer as Label)
            .getBounds()
            .contains(pointer.x, pointer.y)
            ) {
                return index
            }
        }
        return -1
    }

    private async dragItem({ item, pointer, data }: DragItemParams) {
        let isTool = false
        let index = this.getPositionIndex(pointer)
        if (index === -1) {
            // Wrap the event in a Promise to use async/await
            index = await new Promise<number>((resolve) => {
                this.scene.events.once(EventName.ToolbarInventoryIndexResponsed, (result: number) => {
                    if (result !== -1) {
                        isTool = true
                    }
                    resolve(result) // Resolve the promise with the result
                })
                
                const eventMessage: RequestToolbarInventoryIndexMessage = {
                    pointer
                }
                // Emit the event to request the toolbar inventory index
                this.scene.events.emit(EventName.RequestToolbarInventoryIndex, eventMessage)
            })
        }
        if (index !== -1) {
            EventBus.once(EventName.MoveInventoryCompleted, () => {
                if (!item) {
                    throw new Error("Badge label not found")
                }
                if (this.tutorialEnabled) {
                    if (isTool && data.id === this.tutorialSeedInventoryId) {
                        this.scene.events.emit(EventName.TutorialPrepareCloseInventory)
                    }
                }
                //  destroy the badge label
                item.destroy()
                EventBus.emit(EventName.RefreshInventories)
            })
            const eventMessage: MoveInventoryRequest = {
                index,
                isTool,
                inventoryId: data.id,
            }
            EventBus.emit(EventName.RequestMoveInventory, eventMessage)
        } else {
            //  destroy the badge label
            item.destroy()
            this.updateGridTable()
        }
        this.enableScroller()
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
}