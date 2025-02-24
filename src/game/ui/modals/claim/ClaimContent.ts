import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { Background, BaseGridTable, BaseGridTableFrame, CellSize, getCellSize, ItemQuantity, ModalBackground } from "../../elements"
import { BaseSizerBaseConstructorParams } from "../../../types"
import { ClaimData, ClaimItem, EventBus, EventName, ModalName, UpdateClaimModalMessage } from "../../../event-bus"
import { MODAL_DEPTH_2 } from "../ModalManager"
import { CELL_SELECT_PRODUCT_DATA_KEY } from "../stand/select-product-modal/constants"

export class ClaimContent extends BaseSizer {
    private background: ModalBackground
    private gridTable: BaseGridTable<ClaimItem> | undefined
    private cellSize: CellSize
    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)
        this.cellSize = getCellSize(this.scene)
        this.background = new ModalBackground({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                width,
                height,
            },
            options: {
                container: {
                    showContainer: true,
                    showWrapperContainer: false,
                },
                align: "center",
                background: Background.Small,
                title: "Claim",
                onXButtonPress: () => {
                    EventBus.emit(EventName.CloseModal, {
                        modalName: ModalName.Claim,
                    })
                },
                mainButton: {
                    text: "OK",
                    onPress: () => {
                        EventBus.emit(EventName.CloseModal, {
                            modalName: ModalName.Claim,
                        })
                    }
                }
            }
        })
        this.scene.add.existing(this.background)
        this.addLocal(this.background)

        this.scene.events.on(EventName.UpdateClaimModal, ({ data }: UpdateClaimModalMessage) => {
            this.render(data)
        })
    }

    private render(data: ClaimData) {
        this._render(data)
        // reverse the order of the main container so that the button is at the bottom
    }
    private _render({ items }: ClaimData) {
        if (this.gridTable) {
            this.gridTable.setItems(items)
            this.gridTable.layout()
            return
        }
        if (!this.background.containerImage) {
            throw new Error("Background container image not found")
        }
        this.gridTable = new BaseGridTable<ClaimItem>({
            baseParams: {
                scene: this.scene,
                config: {
                    width: this.background.containerImage.width,
                    height: this.background.containerImage.height - 80,
                    y: -this.background.containerImage.height,
                    originY: 0,
                }
            },
            options: {
                columns: 3,
                createCellContainerCallback: (cell, cellContainer) => {
                    const background = new BaseGridTableFrame({
                        scene: this.scene,
                        x: 0,
                        y: 0,
                    })
                    this.scene.add.existing(background)
                    if (cellContainer === null) {
                        const { assetKey, quantity, stackable, scale } = cell.item as ClaimItem
                        const itemQuantity = new ItemQuantity({
                            baseParams: {
                                scene: this.scene,
                                config: {
                                    x: 0,
                                    y: 0,
                                },
                            },
                            options: {
                                scale,
                                quantity,
                                assetKey,
                                showBadge: stackable, 
                            }
                        }).layout()
                        this.scene.add.existing(itemQuantity)
                        
                        cellContainer =
                                        this.scene.rexUI.add
                                            .label({
                                                width: this.cellSize.width,
                                                height: this.cellSize.height,
                                                background,
                                                icon: itemQuantity,
                                                align: "center",
                                            })
                                            .setDepth(MODAL_DEPTH_2 + 2)
                        cellContainer.setData(CELL_SELECT_PRODUCT_DATA_KEY, cell.item)
                    }
                    return cellContainer
                },
                items,
            },
        })
            .setDepth(MODAL_DEPTH_2 + 1)
            .layout()
        this.scene.add.existing(this.gridTable)
        if (!this.background.container) {
            throw new Error("Background container not found")
        }
        this.background.container.addLocal(this.gridTable)
        return this.gridTable
    }
}
