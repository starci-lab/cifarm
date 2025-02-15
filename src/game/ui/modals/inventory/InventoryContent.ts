import { BaseAssetKey, inventoryTypeAssetMap } from "@/game/assets"
import { CacheKey, SizerBaseConstructorParams } from "@/game/types"
import {
    DefaultInfo,
    InventorySchema,
    InventoryTypeSchema,
} from "@/modules/entities"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import {
    BadgeLabel,
    GridSizer,
    GridTable,
    Sizer,
} from "phaser3-rex-plugins/templates/ui/ui-components"
import { calculateUiDepth, UILayer } from "@/game/layers"
import { getStorageInventories, getToolbarInventories } from "@/game/queries"
import { BaseText } from "../../elements"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { UpdateInventoryIndexRequest } from "@/modules/axios"
import {
    CloseModalMessage,
    EventBus,
    EventName,
    ModalName,
} from "@/game/event-bus"
import { onGameObjectPress } from "../../utils"

export enum InventoryStorageTab {
  All = "all",
  Seeds = "seeds",
}

export const INVENTORY_GRID_TABLE_HEIGHT = 650
export const CELL_SPACING = 20
export const LEFT_MARGIN = 20
export const TOOLBAR_COLUMN_COUNT = 4
export const TOOLBAR_ROW_COUNT = 2
export const TOOLBAR_CELL_COUNT = TOOLBAR_COLUMN_COUNT * TOOLBAR_ROW_COUNT
export const CELL_BASE_SIZE = 180
export const TOOLBAR_CELL_SIZE = 100
export const STORAGE_CELL_SCALE = 0.8
export const STORAGE_COLUMN_COUNT = 4

// part of the inventory that holds the inventory items
export class InventoryContent extends BaseSizer {
    private background: Phaser.GameObjects.Image
    private closeButton: Phaser.GameObjects.Image
    // grid storage & toolbar
    private storageGridTable: GridTable | undefined
    private toolbarGridSizer: GridSizer | undefined

    // zones
    private toolbarZones: Array<Zone> = []

    // data loaded from cache
    private inventories: Array<InventorySchema> = []
    private inventoryTypes: Array<InventoryTypeSchema> = []

    private defaultInfo: DefaultInfo

    private gridWidth: number
    private cellWidth: number
    private cellHeight: number

    private selectedTab = InventoryStorageTab.All

    constructor({ scene, x, y, width, height }: SizerBaseConstructorParams) {
        super(scene, x, y, width, height)
        this.defaultInfo = this.scene.cache.obj.get(CacheKey.DefaultInfo)

        this.background = this.scene.add
            .image(0, 0, BaseAssetKey.ModalInventoryBackground)
            .setOrigin(0.5, 1)
        this.addLocal(this.background)
        // Load inventories from cache
        this.inventories = this.scene.cache.obj.get(
            CacheKey.Inventories
        ) as Array<InventorySchema>
        this.inventoryTypes = this.scene.cache.obj.get(CacheKey.InventoryTypes)

        // get cell width and height
        const frameSourceImage = this.scene.textures
            .get(BaseAssetKey.ModalCommonFrame)
            .getSourceImage()
        this.cellWidth = frameSourceImage.width * STORAGE_CELL_SCALE + CELL_SPACING
        this.cellHeight =
      frameSourceImage.height * STORAGE_CELL_SCALE + CELL_SPACING
        this.gridWidth = this.cellWidth * STORAGE_COLUMN_COUNT + LEFT_MARGIN

        this.closeButton = this.scene.add
            .image(
                this.background.width/2 - 50,
                -this.background.height + 50,
                BaseAssetKey.ModalInventoryBtnClose
            )
            .setOrigin(1, 0)
            .setInteractive()
            .on("pointerdown", () => {
                onGameObjectPress({
                    gameObject: this.closeButton,
                    onPress: () => {
                        const eventMessage: CloseModalMessage = {
                            modalName: ModalName.Inventory,
                        }
                        EventBus.emit(EventName.CloseModal, eventMessage)
                    },
                    scene: this.scene,
                })
            })

        this.addLocal(this.closeButton)

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
        const storageGridTable = this.scene.rexUI.add
            .gridTable({
                y: -800,
                originY: 1,
                width: this.gridWidth,
                height: INVENTORY_GRID_TABLE_HEIGHT,
                table: {
                    columns: STORAGE_COLUMN_COUNT, // Fixed 3 columns
                    cellHeight: this.cellWidth, // Adjusted height per row
                    cellWidth: this.cellHeight, // Adjusted width per column
                    mask: { padding: 2 }, // Enable scrolling
                    interactive: true, // Allow scrolling
                },
                slider: {
                    thumb: this.scene.add.image(0, 0, BaseAssetKey.ModalCommonThumb),
                },
                mouseWheelScroller: { focus: false, speed: 2 },

                createCellContainerCallback: (cell, cellContainer) => {
                    const background = this.scene.add.sprite(
                        0,
                        0,
                        BaseAssetKey.ModalCommonFrame
                    )
                    if (cellContainer === null) {
                        const badgeLabel = this.createBadgeLabel({
                            inventory: cell.item as InventorySchema | null,
                            width: background.width,
                            height: background.height,
                        })
                        if (!cellContainer) {
                            cellContainer = this.scene.rexUI.add.sizer({ orientation: "y" })
                            const _cellContainer = cellContainer as Sizer
                            _cellContainer.add(
                                this.scene.rexUI.add
                                    .label({
                                        width: background.width,
                                        height: background.height,
                                        background,
                                        icon: badgeLabel,
                                    })
                                    .setScale(STORAGE_CELL_SCALE)
                                    .setDepth(
                                        calculateUiDepth({
                                            layer: UILayer.Modal,
                                            layerDepth: 1,
                                            additionalDepth: 1,
                                        })
                                    ),
                                {
                                    key: "main",
                                }
                            )
                        }
                        //add separator
                        //const separator = cellContainer.getElement("separator")
                    }
                    return cellContainer
                },
                items: this.getStorageItems(),
            })
            .layout()
        this.storageGridTable = storageGridTable
        this.addLocal(storageGridTable)
        return storageGridTable
    }

    private updateToolbarGridSizer() {
        if (this.toolbarGridSizer) {
            this.remove(this.toolbarGridSizer, true)
        }
        const items = this.getToolbarItems()
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
                    const badgeLabel = this.createBadgeLabel({
                        inventory: items[y * TOOLBAR_COLUMN_COUNT + x],
                        width: CELL_BASE_SIZE,
                        height: CELL_BASE_SIZE,
                    })
                    const label = scene.rexUI.add
                        .label({
                            width: CELL_BASE_SIZE,
                            height: CELL_BASE_SIZE,
                            icon: badgeLabel,
                        })
                        .setDepth(
                            calculateUiDepth({
                                layer: UILayer.Modal,
                                layerDepth: 1,
                                additionalDepth: 1,
                            })
                        )
                    this.toolbarZones.push({
                        index: y * TOOLBAR_COLUMN_COUNT + x,
                        object: label,
                    })
                    label.setScale(TOOLBAR_CELL_SIZE / CELL_BASE_SIZE)
                    return label
                },
            })
            .layout()
        this.toolbarGridSizer = gridSizer
        this.addLocal(gridSizer)
        return gridSizer
    }

    private createBadgeLabel({
        height,
        inventory,
        width,
        scale = 1.2,
    }: CreateBadgeLabelParams) {
        let badgeLabel: BadgeLabel | undefined
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
            // create the icon
            const icon = this.scene.add.image(0, 0, key)
            icon.setDisplaySize(icon.width * scale, icon.height * scale)
            badgeLabel = this.scene.rexUI.add
                .badgeLabel({
                    center: icon,
                    width,
                    height,
                    rightBottom: inventoryType.stackable
                        ? this.createBadge(inventory.quantity)
                        : undefined,
                })

            // allow the drag
            this.scene.rexUI.add.drag(badgeLabel)
            let original: Phaser.Geom.Point

            // set depth
            badgeLabel.on("dragstart", () => {
                if (!badgeLabel) {
                    throw new Error("Badge label not found")
                }
                original = badgeLabel.getCenter()
                badgeLabel.setDepth(
                    calculateUiDepth({
                        layer: UILayer.Modal,
                        layerDepth: 1,
                        additionalDepth: 3,
                    })
                )
            })
            badgeLabel.on("dragend", (pointer: Phaser.Input.Pointer) => {
                if (!badgeLabel) {
                    throw new Error("Badge label not found")
                }
                badgeLabel.setDepth(
                    calculateUiDepth({
                        layer: UILayer.Modal,
                        layerDepth: 1,
                        additionalDepth: 1,
                    })
                )

                // index of the inventory
                let index = -1
                let inToolbar = true

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
                            inToolbar = false
                            break
                        }
                    }
                }

                if (index === -1) {
                    //console.log(zone)
                    // return the badge label to the original position
                    badgeLabel.setPosition(original.x, original.y)
                    return
                }

                // call api to move the inventory
                const eventMessage: UpdateInventoryIndexRequest = {
                    index,
                    inToolbar,
                    inventoryId: inventory.id,
                }
                EventBus.once(EventName.UpdateInventoryIndexCompleted, () => {
                    EventBus.once(
                        EventName.InventoriesRefreshed,
                        (inventories: Array<InventorySchema>) => {
                            console.log("called")
                            this.inventories = inventories
                            if (!badgeLabel) {
                                throw new Error("Badge label not found")
                            }
                            // distroy the badge label
                            const parent = badgeLabel.getParent()
                            parent.remove(badgeLabel, true)
                            this.updateStorageGridTable()
                            this.updateToolbarGridSizer()
                        }
                    )
                    EventBus.emit(EventName.RefreshInventories)
                })
                EventBus.emit(EventName.RequestUpdateInventoryIndex, eventMessage)
            })
        }
        return badgeLabel
    }

    private createBadge(quantity: number) {
        const text = new BaseText({
            baseParams: {
                scene: this.scene,
                text: quantity.toString(),
                x: 0,
                y: 0,
                style: {
                    padding: {
                        right: 20,
                        bottom: 20,
                    },
                },
            },
            options: {
                enableStroke: true,
            },
        })
        return this.scene.add.existing(text)
    }

    private getStorageItems() {
        const result: Array<InventorySchema | null> = []
        // filter all inventories based on the selected tab
        const storageInventories = getStorageInventories({
            inventories: this.inventories,
            scene: this.scene,
        })
        // create the inventory cells
        for (let i = 0; i < this.defaultInfo.inventoryCapacity; i++) {
            const inventory = storageInventories.find(
                (inventory) => inventory.index === i
            )
            result.push(inventory || null)
        }
        return result
    }

    private getToolbarItems() {
        const result: Array<InventorySchema | null> = []
        // filter all inventories based on the selected tab
        // create the inventory cells
        const toolbarInventories = getToolbarInventories({
            inventories: this.inventories,
            scene: this.scene,
        })
        for (let i = 0; i < TOOLBAR_CELL_COUNT; i++) {
            const inventory = toolbarInventories.find(
                (inventory) => inventory.index === i
            )
            result.push(inventory || null)
        }
        return result
    }
}

export interface CreateBadgeLabelParams {
  inventory: InventorySchema | null;
  width: number;
  height: number;
  scale?: number;
}

interface Zone {
  index: number;
  object: Phaser.GameObjects.GameObject;
}
