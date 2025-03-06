import { BaseAssetKey, inventoryTypeAssetMap } from "../../../assets"
import { CacheKey, BaseSizerBaseConstructorParams } from "../../../types"
import { IPaginatedResponse } from "@/modules/apollo"
import { InventorySchema, InventoryTypeSchema } from "@/modules/entities"
import { GridSizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { onGameObjectPress } from "../../utils"
import { EventBus, EventName, ModalName, OpenModalMessage, ShowPressHereArrowMessage } from "../../../event-bus"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { getDeliveryInventories } from "@/game/queries"
import { MODAL_DEPTH_1 } from "../ModalManager"
import { Text, XButton } from "../../elements"
import { RetainProductRequest } from "@/modules/axios"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { SCALE_TIME } from "@/game/constants"
import { sleep } from "@/modules/common"
import { restoreTutorialDepth, setTutorialDepth } from "../../tutorial"

const ROW_COUNT = 3
const COLUMN_COUNT = 3
const CELL_COUNT = ROW_COUNT * COLUMN_COUNT
const MOVE_Y_ROW_1 = -46
const MOVE_Y_ROW_2 = -21
const MOVE_Y_ROW_3 = 0
const ADD_BUTTON_SCALE = 0.5

export interface ContainerData {
    hasItem: boolean;
    container: ContainerLite;
}

export class StandContent extends BaseSizer {
    private gridSizer: GridSizer | undefined
    private inventories: Array<InventorySchema> = []
    private inventoryTypes: Array<InventoryTypeSchema> = []
    private containerMap: Record<number, ContainerData> = {}
    constructor({
        scene,
        x,
        y,
        config,
        height,
        width
    }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config) 

        const { data } = this.scene.cache.obj.get(CacheKey.Inventories) as IPaginatedResponse<InventorySchema>
        this.inventories = data
        //this.createStandGrid()

        this.inventoryTypes = this.scene.cache.obj.get(CacheKey.InventoryTypes)

        this.updateStandGridSizer()

        EventBus.on(EventName.InventoriesRefreshed, ({ data }: IPaginatedResponse<InventorySchema>) => {
            this.inventories = data
            this.updateStandGridSizer()
        })

        this.scene.events.once(EventName.TutorialRoadsideStandButtonPressed, async () => {
            // wait for the scale time
            await sleep(SCALE_TIME)
            // get the first non empty cell
            const nonEmptyCell = Object.values(this.containerMap).find(({ hasItem }) => hasItem)
            if (nonEmptyCell) {
                this.scene.events.emit(EventName.TutorialPrepareCloseStand)
                return
            }
            // get the first empty cell
            const emptyCell = Object.values(this.containerMap).find(({ hasItem }) => !hasItem)
            // highlight the empty cell
            if (!emptyCell) {
                throw new Error("No empty cell found")
            }
            setTutorialDepth({
                gameObject: emptyCell.container,
            })
            // show the press here arrow
            const { x, y } = emptyCell.container.getCenter()
            const eventMessage: ShowPressHereArrowMessage = {
                originPosition: {
                    x: x + 60,
                    y: y,
                },
                targetPosition: {
                    x: x + 40,
                    y: y - 20,
                },
            }
            this.scene.events.emit(EventName.ShowPressHereArrow, eventMessage)
        })
    }

    // get the items
    private getItems = (): Array<InventorySchema | null> => {
        const deliveryInventories = getDeliveryInventories({ scene: this.scene, inventories: this.inventories })
        const result: Array<InventorySchema | null> = []
        for (let i = 0; i < CELL_COUNT; i++) {
            const found = deliveryInventories.find((inventory) => inventory.index === i)
            if (found) {
                result.push(found)
            } else {
                result.push(null)
            }
        }
        return result
    }

    private updateStandGridSizer() {
        if (this.gridSizer) {
            this.remove(this.gridSizer, true)
        }
        const items = this.getItems()
        const background = this.scene.add.image(0, 0, BaseAssetKey.UIModalStand)
        // Create Fixed Grid Table
        this.gridSizer = this.scene.rexUI.add
            .gridSizer({
                width: background.width,
                height: background.height,
                column: COLUMN_COUNT,
                row: ROW_COUNT,
                columnProportions: 1,
                rowProportions: 1,
                createCellContainerCallback: (scene, x, y) => {
                    const index = y * COLUMN_COUNT + x
                    const item = items[index]
                    const map: Record<number, number> = {
                        0: MOVE_Y_ROW_1,
                        1: MOVE_Y_ROW_2,
                        2: MOVE_Y_ROW_3,
                    }
                    const container = scene.rexUI.add.container(0, map[y])
                    this.containerMap[index] = {
                        hasItem: !!item,
                        container
                    }
                    const tagBackground = scene.add.image(0, 0, BaseAssetKey.UIModalStandTag)
                    
                    let tagText: Text | undefined
                    if (item) {
                        tagText = new Text({
                            baseParams: {
                                scene: this.scene,
                                x: 0,
                                y: 0,
                                text: `${item?.quantity}`
                            },
                            options: {
                                fontSize: 36,
                                enableStroke: true,
                            }
                        })
                        this.scene.add.existing(tagText)
                    }
                
                    const tag = scene.rexUI.add.label({
                        text: tagText,
                        background: tagBackground,
                        width: tagBackground.width,
                        height: tagBackground.height,
                        align: "center",
                        originY: 0,
                        space: { bottom: -30 }
                    }).layout()
                    container.addLocal(tag)
                    // if item is existed
                    if (item) {
                        // create the item card
                        container.addLocal(this.createProductBadgeLabel(item).setPosition(0, -25))
                    } else {
                        // no item, create the add button
                        const addButton = this.createAddButton(index)
                        container.addLocal(addButton)
                    }
                    return this.scene.rexUI.add.container(0, 0).addLocal(container)
                },
            })
            .addBackground(background)
            .setOrigin(0.5, 0.5).layout().setDepth(MODAL_DEPTH_1 + 1)
        this.addLocal(this.gridSizer)
    }

    private createAddButton(index: number) {
        const addButton = this.createAddButtonLabel({
            onPress: () => {
                this.scene.cache.obj.add(CacheKey.DeliveryIndex, index)
                this.scene.events.emit(EventName.UpdateSelectProductModal)
                // open the select product modal
                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.SelectProduct,
                }
                EventBus.emit(EventName.OpenModal, eventMessage)
                // close the arrow
                this.scene.events.emit(EventName.HidePressHereArrow)
                // remove the highlight
                if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                    const emptyCell = this.containerMap[index]
                    if (!emptyCell) {
                        throw new Error("No empty cell found")
                    }
                    restoreTutorialDepth({
                        gameObject: emptyCell.container,
                    })
                }
            }
        })
        addButton.setPosition(0, -addButton.height / 2 - 10)
        return addButton
    }

    private createProductBadgeLabel(inventory: InventorySchema) {
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
        
        const image = this.scene.add.image(0, 0, key)
        const xButton = new XButton({
            baseParams: {
                scene: this.scene, 
                config: {
                    x: 0,
                    y: 0
                }
            },
            options: {
                onPress: () => {
                    console.log("XButton pressed!")
                    // call retain method
                    EventBus.once(EventName.RetainProductCompleted, () => {
                        EventBus.emit(EventName.RefreshInventories)
                    })
                    const eventName: RetainProductRequest = {
                        inventoryId: inventory.id
                    }
                    EventBus.emit(EventName.RequestRetainProduct, eventName)
                }
            }
        })
        this.scene.add.existing(xButton)
        const xButtonContainer = this.scene.rexUI.add.container(0, 0).addLocal(xButton.setPosition(20, -20))

        const addButton = this.createAddButtonLabel({
            onPress: () => {
                // call release method
            },
            percentHeight: ADD_BUTTON_SCALE,
            percentWidth: ADD_BUTTON_SCALE
        })
        const addButtonContainer = this.scene.rexUI.add.container(0, 0).addLocal(addButton.setPosition(-5, 0))
        this.scene.add.existing(addButtonContainer)
        const badgeLabel = this.scene.rexUI.add.badgeLabel({
            width: image.width,
            height: image.height,
            background: image,
            center: image,
            rightTop: xButtonContainer,
            leftBottom: addButtonContainer,
            originY: 1
        }).layout()
        return badgeLabel
    }

    private createAddButtonLabel({ onPress, percentHeight = 1, percentWidth = 1 }: CreateAddButtonLabelParams) {
        //create a texture
        const background = this.scene.add.image(0, 0, BaseAssetKey.UIModalStandAddButton)
        const label = this.scene.rexUI.add.label({
            width: background.width * percentWidth,
            height: background.height * percentHeight,
            background,
        }).layout()
        label.setInteractive().on("pointerdown", () => {
            onGameObjectPress({
                gameObject: label,
                scene: this.scene,
                animate: false,
                onPress
            })
        })
        return label
    }
}

export interface CreateAddButtonLabelParams {
    onPress: () => void;
    percentWidth?: number;
    percentHeight?: number;
}

export interface CreateItemCardParams {
  assetKey: string;
  title: string;
  onPress: () => void;
}
