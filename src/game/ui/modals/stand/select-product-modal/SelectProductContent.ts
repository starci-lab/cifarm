import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { CacheKey, BaseSizerBaseConstructorParams } from "../../../../types"
import { BaseAssetKey, inventoryTypeAssetMap } from "../../../../assets"
import { Label, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseGridTable, BaseGridTableCell, BaseGridTableFrame, CellInfo, getCellInfo, RibbonTitle } from "../../../elements"
import { InventorySchema, InventoryTypeSchema } from "@/modules/entities"
import { getProductInventories } from "../../../../queries"
import { EventBus, EventName, ModalName } from "../../../../event-bus"
import { onGameObjectPress } from "@/game/ui/utils"
import { MODAL_DEPTH_2 } from "../../ModalManager"

export class SelectProductContent extends BaseSizer {
    private background: Phaser.GameObjects.Image
    private ribbonTitle: Label
    private inventoryTypes: Array<InventoryTypeSchema> = []
    private gridTable: BaseGridTable<InventorySchema>|undefined
    private cellInfo: CellInfo

    constructor({ scene, x, y, width, height }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, width, height)

        this.background = this.scene.add.image(0, 0, BaseAssetKey.UIModalCommonBackground1)
        this.addLocal(this.background)

        this.inventoryTypes = this.scene.cache.obj.get(CacheKey.InventoryTypes)
        this.cellInfo = getCellInfo(this.scene)
        
        this.ribbonTitle = new RibbonTitle({
            baseParams: {
                scene,
                config: {
                    x: 0,
                    y: 100 - this.background.height / 2,
                    originY: 1,
                }
            },
            options: {
                text: "Select Product",
            }
        }).layout()
        this.scene.add.existing(this.ribbonTitle)
        this.addLocal(this.ribbonTitle)

        this.scene.events.on(EventName.UpdateSelectProductModal, () => {
            console.log("called")
            this.updateGridTable()
        })

        // default no need to update
        // this.updateGridTable()
    }

    public updateGridTable() {
        const items = getProductInventories({ scene: this.scene })
        if (this.gridTable) {
            this.gridTable.setItems(items)
            this.gridTable.layout()
            return
        }
        this.gridTable = new BaseGridTable<InventorySchema>({
            baseParams: {
                scene: this.scene,
                config: {
                    x: 0,
                    y: 150,
                }
            },
            options: {
                createCellContainerCallback: (cell, cellContainer) => {
                    const background = new BaseGridTableFrame({ scene: this.scene, x: 0, y: 0 })
                    this.scene.add.existing(background)
                    if (cellContainer === null) {
                        let gridTableCell: BaseGridTableCell | undefined
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
                                        MODAL_DEPTH_2 + 2
                                    )
                            )
                        }
                    }
                    return cellContainer
                },
                items,
            }
        }).setDepth(MODAL_DEPTH_2 + 1).layout()
        this.scene.add.existing(this.gridTable)
        this.addLocal(this.gridTable)
        return this.gridTable
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

        const cell = new BaseGridTableCell({
            baseParams: {
                scene: this.scene
            },
            options: {
                assetKey: key,
                quantity: inventory.quantity,
                showBadge: true,
            }
        })
        this.scene.add.existing(cell)
        cell.setInteractive().on("pointerdown", () => {
            onGameObjectPress({
                gameObject: cell,
                scene: this.scene,
                onPress: () => {
                    EventBus.emit(EventName.CloseModal, {
                        modalName: ModalName.SelectProduct,
                    })
                    EventBus.emit(EventName.OpenModal, {
                        modalName: ModalName.InputQuantity,
                    })
                    this.scene.events.emit(EventName.UpdateInputQuantityModal, {
                        inventory,
                    })
                },
            })
        })
        return cell
    }
}