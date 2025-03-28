import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { Background, GridTable, GridTableFrame, CellSize, getCellSize, ItemQuantity, ModalBackground } from "../../elements"
import { BaseSizerBaseConstructorParams, CacheKey } from "../../../types"
import { SceneEventEmitter, SceneEventName, ModalName, ClaimItem } from "../../../events"

export class ClaimContent extends BaseSizer {
    private background: ModalBackground
    private gridTable: GridTable<ClaimItem> | undefined
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
                    SceneEventEmitter.emit(SceneEventName.CloseModal, {
                        modalName: ModalName.Claim,
                    })
                },
                mainButton: {
                    text: "OK",
                    onPress: () => {
                        SceneEventEmitter.emit(SceneEventName.CloseModal, {
                            modalName: ModalName.Claim,
                        })
                    }
                }
            }
        })
        this.scene.add.existing(this.background)
        this.addLocal(this.background)

        SceneEventEmitter.on(SceneEventName.UpdateClaimModal, () => {
            const data = this.scene.cache.obj.get(CacheKey.ClaimData) as ClaimData
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
        this.gridTable = new GridTable<ClaimItem>({
            baseParams: {
                scene: this.scene,
                config: {
                    width: this.background.containerImage.width,
                    height: this.background.containerImage.height - 80,
                    originY: 0,
                }
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
                                            .setDepth(this.depth+ 2)
                        cellContainer.setData(CELL_SELECT_PRODUCT_DATA_KEY, cell.item)
                    }
                    return cellContainer
                },
                items,
            },
        })
            .setDepth(this.depth + 1)
            .layout()
        this.scene.add.existing(this.gridTable)
        if (!this.background.container) {
            throw new Error("Background container not found")
        }
        this.background.container.addLocal(this.gridTable)
        return this.gridTable
    }
}

export interface ClaimData {
    items: Array<ClaimItem>;
}

export const CELL_SELECT_PRODUCT_DATA_KEY = "cell_select_product_data_key"
