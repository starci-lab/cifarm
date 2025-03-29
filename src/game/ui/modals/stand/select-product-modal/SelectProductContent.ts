import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import {
    CacheKey,
    BaseSizerBaseConstructorParams,
    DeliveryData,
} from "../../../../types"
import {
    GridTable,
    ItemQuantity,
    GridTableFrame,
    ModalBackground,
    Background,
    XButton,
    CellSize,
    getCellSize,
} from "../../../elements"
import {
    InventoryKind,
    InventorySchema,
    InventoryTypeSchema,
} from "@/modules/entities"
import {
    getDeliveryInventories,
    getProductInventories,
} from "../../../../cache"
import {
    SceneEventEmitter,
    SceneEventName,
    ModalName,
} from "../../../../events"
import { onGameObjectPress } from "../../../utils"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { inventoryTypeAssetMap } from "../../../../assets"
import { CELL_SELECT_PRODUCT_DATA_KEY } from "./constants"

export class SelectProductContent extends BaseSizer {
    private background: ModalBackground
    private inventoryTypes: Array<InventoryTypeSchema> = []
    private gridTable: GridTable<InventorySchema> | undefined
    private gridMap: Record<number, ItemQuantity> = {}
    private inventories: Array<InventorySchema> = []
    private cellSize: CellSize

    constructor({ scene, x, y, width, height }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, width, height)
        this.cellSize = getCellSize(this.scene)

        this.inventories = this.scene.cache.obj.get(CacheKey.Inventories)
        this.background = new ModalBackground({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                width,
                height,
            },
            options: {
                align: "center",
                container: {
                    showContainer: true,
                    showWrapperContainer: false,
                },
                background: Background.Small,
                onXButtonPress: (xButton: XButton) => {
                    onGameObjectPress({
                        gameObject: xButton,
                        scene: this.scene,
                        onPress: () => {
                            SceneEventEmitter.emit(SceneEventName.CloseModal, {
                                modalName: ModalName.SelectProduct,
                            })
                        },
                    })
                },
                title: "Select",
            },
        })
        this.scene.add.existing(this.background)
        this.addLocal(this.background)

        this.inventoryTypes = this.scene.cache.obj.get(CacheKey.InventoryTypes)
        SceneEventEmitter.on(SceneEventName.UpdateSelectProductModal, () => {
            const { index, isMore } = this.scene.cache.obj.get(
                CacheKey.DeliveryData
            ) as DeliveryData

            let inventoryTypeId: string | undefined
            if (isMore) {
                const inventories = getDeliveryInventories({
                    scene: this.scene,
                    inventories: this.inventories,
                })
                const inventory = inventories.find(
                    (inventory) => inventory.index === index
                )
                if (!inventory) {
                    throw new Error("Inventory not found")
                }
                inventoryTypeId = inventory.inventoryType
            }
            this.updateGridTable(inventoryTypeId)
        })
    }

    private updateGridTable(inventoryTypeId?: string) {
        this._updateGridTable(inventoryTypeId)
        if (!this.gridTable) {
            throw new Error("Grid table not found")
        }
        this.gridTable.setDepth(this.depth + 1)
    }

    private _updateGridTable(inventoryTypeId?: string) {
        const items = getProductInventories({
            scene: this.scene,
            inventories: this.inventories,
        })
        const productItems = items.filter(
            (item) =>
                (!inventoryTypeId || item.inventoryType === inventoryTypeId) &&
        item.kind === InventoryKind.Storage
        )
        if (this.gridTable) {
            this.gridTable.setItems(productItems)
            this.gridTable.layout()
            return
        }
        if (!this.background.containerImage) {
            throw new Error("Background container image not found")
        }
        this.gridTable = new GridTable<InventorySchema>({
            baseParams: {
                scene: this.scene,
                config: {
                    width: this.background.containerImage.width,
                    height: this.background.containerImage.height,
                    originY: 0,
                },
            },
            options: {
                columns: 3,
                createCellContainerCallback: (cell, cellContainer) => {
                    const background = new GridTableFrame({
                        scene: this.scene,
                        x: 0,
                        y: 0,
                    })
                    this.scene.add.existing(background)
                    if (cellContainer === null) {
                        const { quantity, inventoryType: inventoryTypeId } =
              cell.item as InventorySchema
                        const inventoryType = this.inventoryTypes.find(
                            ({ id }) => id === inventoryTypeId
                        )
                        if (!inventoryType) {
                            throw new Error("Inventory type not found")
                        }
                        const assetKey =
                            inventoryTypeAssetMap[inventoryType.displayId].base.textureConfig.key
                        const itemQuantity = new ItemQuantity({
                            baseParams: {
                                scene: this.scene,
                                config: {
                                    width: this.cellSize.width,
                                    height: this.cellSize.height,
                                },
                            },
                            options: {
                                quantity,
                                assetKey,
                                showBadge: inventoryType.stackable,
                            },
                        }).layout()
                        this.scene.add.existing(itemQuantity)
                        this.gridMap[cell.index] = itemQuantity
                        cellContainer = this.scene.rexUI.add
                            .label({
                                width: this.cellSize.width,
                                height: this.cellSize.height,
                                background,
                                icon: itemQuantity,
                            })
                            .setDepth(this.depth + 2)
                        cellContainer.setData(CELL_SELECT_PRODUCT_DATA_KEY, cell.item)
                    }
                    return cellContainer
                },
                items,
            },
        }).layout()

        this.gridTable.on("cell.click", (container: ContainerLite) => {
            if (!this.gridTable) {
                throw new Error("Grid table not found")
            }
            const inventory = container.getData(
                CELL_SELECT_PRODUCT_DATA_KEY
            ) as InventorySchema
            SceneEventEmitter.emit(SceneEventName.CloseModal, {
                modalName: ModalName.SelectProduct,
            })
            SceneEventEmitter.emit(SceneEventName.OpenModal, {
                modalName: ModalName.InputQuantity,
            })
            this.scene.cache.obj.add(CacheKey.InputQuantityModalData, inventory)
            SceneEventEmitter.emit(SceneEventName.UpdateInputQuantityModal)
        })
        this.scene.add.existing(this.gridTable)
        if (!this.background.container) {
            throw new Error("Background container not found")
        }
        this.background.container.addLocal(this.gridTable)
        return this.gridTable
    }
}
