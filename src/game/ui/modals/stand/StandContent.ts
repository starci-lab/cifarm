import { BaseAssetKey, inventoryTypeAssetMap, baseAssetMap } from "../../../assets"
import { CacheKey, BaseSizerBaseConstructorParams, DeliveryData } from "../../../types"
import { InventorySchema, InventoryTypeSchema } from "@/modules/entities"
import { GridSizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { onGameObjectPress } from "../../utils"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { getDeliveryInventories } from "../../../logic"
import { Text, XButton, XButtonColor } from "../../elements"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { RetainInventoryMessage } from "@/hooks"
import {
    SceneEventEmitter,
    SceneEventName,
    ModalName,
    OpenModalMessage,
    ExternalEventName,
    ExternalEventEmitter,
} from "../../../events"

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

        this.inventories = this.scene.cache.obj.get(CacheKey.Inventories)
        //this.createStandGrid()

        this.inventoryTypes = this.scene.cache.obj.get(CacheKey.InventoryTypes)

        this.updateStandGridSizer()

        SceneEventEmitter.on(SceneEventName.InventoriesRefreshed, () => {
            this.inventories = this.scene.cache.obj.get(CacheKey.Inventories)
            this.updateStandGridSizer()
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
        const background = this.scene.add.image(0, 0, baseAssetMap[BaseAssetKey.UIModalStand].base.textureConfig.key)
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
                    const tagBackground = scene.add.image(0, 0, baseAssetMap[BaseAssetKey.UIModalStandTag].base.textureConfig.key)
                    
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
            .setOrigin(0.5, 0.5).layout().setDepth(this.depth + 1)
        this.addLocal(this.gridSizer)
    }

    private createAddButton(index: number) {
        const addButton = this.createAddButtonLabel({
            onPress: () => {
                const data: DeliveryData = {
                    index,
                    isMore: false,
                }
                this.scene.cache.obj.add(CacheKey.DeliveryData, data)
                SceneEventEmitter.emit(SceneEventName.UpdateSelectProductModal)
                // open the select product modal
                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.SelectProduct,
                }
                SceneEventEmitter.emit(SceneEventName.OpenModal, eventMessage)
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
            base: { textureConfig: { key } },
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
                color: XButtonColor.White,
                onPress: () => {
                    console.log("XButton pressed!")
                    // call retain method
                    const eventMessage: RetainInventoryMessage = {
                        inventoryId: inventory.id,
                    }
                    ExternalEventEmitter.emit(ExternalEventName.RequestRetainInventory, eventMessage)
                }
            }
        })
        this.scene.add.existing(xButton)
        const xButtonContainer = this.scene.rexUI.add.container(0, 0).addLocal(xButton.setPosition(20, -20))

        const addButton = this.createAddButtonLabel({
            onPress: () => {
                const data: DeliveryData = {
                    index: inventory.index,
                    isMore: true,
                }
                this.scene.cache.obj.add(CacheKey.DeliveryData, data)
                SceneEventEmitter.emit(SceneEventName.UpdateSelectProductModal)
                // open the select product modal
                const eventMessage: OpenModalMessage = {
                    modalName: ModalName.SelectProduct,
                }
                SceneEventEmitter.emit(SceneEventName.OpenModal, eventMessage)
            },
            percentHeight: ADD_BUTTON_SCALE,
            percentWidth: ADD_BUTTON_SCALE
        })
        const addButtonContainer = this.scene.rexUI.add.container(0, 0).addLocal(addButton.setPosition(-5, 0))
        this.scene.add.existing(addButtonContainer)
        const badgeLabel = this.scene.rexUI.add.badgeLabel({
            width: image.width * 1.5,
            height: image.height * 1.5,
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
        const background = this.scene.add.image(0, 0, BaseAssetKey.UICommonPlus)
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
