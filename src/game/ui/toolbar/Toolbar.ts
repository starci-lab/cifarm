import {
    Label,
    Sizer,
} from "phaser3-rex-plugins/templates/ui/ui-components"
import {
    InventorySchema,
    InventoryTypeSchema,
    InventoryTypeId,
    DefaultInfo,
    ToolId,
    ToolSchema,
    InventoryType,
    InventoryKind,
} from "@/modules/entities"
import { CacheKey, ContainerLiteBaseConstructorParams } from "../../types"
import {
    BaseAssetKey,
    inventoryTypeAssetMap,
    toolAssetMap,
} from "../../assets"
import { SCALE_TIME } from "../../constants"
import { EventBus, EventName } from "@/game/event-bus"
import {
    onGameObjectPress,
} from "../utils"
import {
    getDefaultTools,
    getFirstSeedInventory,
    getToolInventories,
} from "@/game/queries"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ItemQuantity } from "../elements"
import { IPaginatedResponse } from "@/modules/apollo"
import { restoreTutorialDepth, setTutorialDepth } from "../tutorial"

// number of items to show
const ITEM_COUNT = 4
const SLOT_WIDTH = 120
const SLOT_HEIGHT = 120

export interface ToolLike {
  // id of the tool, base on either inventory id or tool id
  id: string;
  // name of the tool
  name: string;
  // asset key of the tool
  assetKey: string;
  // is default
  default: boolean;
  // index
  index?: number;
  // stackable
  stackable: boolean;
  // quantity of the tool,
  quantity?: number;
  // inventory type id
  inventoryType?: InventoryTypeSchema;
}

const defaultSelectedIndex = 0
// selected size of the tool
export const SELECTED_SIZE = 1.1
export const UNSELECTED_SIZE = 1

export class Toolbar extends ContainerLite {
    private startIndex = 0
    private slotMap: Record<number, Sizer> = {}
    private background: Phaser.GameObjects.Image
    private prevButton: Label
    private nextButton: Label
    private tools: Array<ToolSchema> = []
    private inventories: Array<InventorySchema> = []
    // selected tool index
    private selectedIndex = defaultSelectedIndex
    private seedInventory: InventorySchema | undefined
    private toolItems: Array<ToolLike> = []
    private slots: Sizer | undefined
    // flags to check if the events are emitted
    private defaultInfo: DefaultInfo
    private mainContainer: ContainerLite | undefined
    private enableTutorial = false
    constructor({
        scene,
        x,
        y,
        width,
        height,
        children,
    }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        // create the toolbar background
        this.background = this.scene.add
            .image(0, 0, BaseAssetKey.UIToolbarBackground)
            .setOrigin(0.5, 1)
        this.addLocal(this.background)

        this.mainContainer = this.scene.rexUI.add.container(0, -(this.background.height/2 + 20))
        this.prevButton = this.createPrevButton()
        this.mainContainer.addLocal(this.prevButton)

        this.nextButton = this.createNextButton()
        this.mainContainer.addLocal(this.nextButton)

        this.slots = this.createSlots()
        this.mainContainer.addLocal(this.slots)
        this.addLocal(this.mainContainer)

       
        this.tools = this.scene.cache.obj.get(CacheKey.Tools)
        const { data } = this.scene.cache.obj.get(CacheKey.Inventories) as IPaginatedResponse<InventorySchema>
        this.inventories = data
        this.defaultInfo = this.scene.cache.obj.get(CacheKey.DefaultInfo)
        this.toolItems = this.getToolItems()
        // store the first selected tool

        // check number of tools
        if (this.toolItems.length <= ITEM_COUNT) {
            this.disableNextButton()
        }
        this.updateCacheSelectedTool()
        this.updateItemSizer()
        this.controlArrowVisibility()

        this.scene.events.on(EventName.TutorialHighlightToolbar, () => {
            this.seedInventory = getFirstSeedInventory({
                cropId: this.defaultInfo.defaultCropId,
                scene: this.scene,
                kind: InventoryKind.Tool
            })
            setTutorialDepth({
                gameObject: this,
            })
            this.enableTutorial = true
        })

        this.scene.events.on(EventName.TutorialResetToolbar, () => {
            // re update the item sizer
            this.updateItemSizer()
            restoreTutorialDepth({
                gameObject: this,
            })
            this.enableTutorial = false
        })

        EventBus.on(EventName.InventoriesRefreshed, ({ data }: IPaginatedResponse<InventorySchema>) => {
            this.inventories = data
            this.toolItems = this.getToolItems()
            // check if the selected index is still valid
            const lastIndex = this.toolItems.length - 1
            if (this.selectedIndex + this.startIndex > lastIndex) {
                this.selectedIndex = defaultSelectedIndex
                this.startIndex = 0
            }
            this.controlArrowVisibility()
            this.updateCacheSelectedTool()
            this.updateItemSizer()
        })
    }

    private movePage() {
        this.updateItemSizer()
        this.controlArrowVisibility()
    }

    private selectTool(index: number, animate: boolean = true) {
        // deselect the current selected item
        this.onDeselect({ index: this.selectedIndex, animate })
        // select the new item
        this.onSelect({ index, animate })
        // update the selected index
        this.selectedIndex = index
        this.updateCacheSelectedTool()
        if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
            const tool = this.toolItems[this.startIndex + index]
            // do nothing if the tool is not found
            if (!tool) {
                throw new Error(`Tool not found for index: ${index}`)
            }
            const inventoryType = tool.inventoryType
            if (!inventoryType) {
                // if inventory not found, mean that it is a default tool, skip
                return
            }
            switch (inventoryType.type) {
            case InventoryType.Seed: {
                // check if the tool is a seed
                if (tool.id === this.seedInventory?.id) {
                    this.scene.events.emit(EventName.TutorialSeedsPressed)
                }
                break
            }
            case InventoryType.Tool: {
                const toolType = this.tools.find(
                    ({ id }) => id === inventoryType.tool
                )
                console.log(this.tools)
                console.log(inventoryType)
                if (!toolType) {
                    throw new Error(
                        `Tool type not found for id: ${inventoryType.tool}`
                    )
                }
                switch (toolType.displayId) {
                case ToolId.WateringCan: {
                    this.scene.events.emit(EventName.TutorialWateringCanPressed)
                    break
                }
                case ToolId.Herbicide: {
                    this.scene.events.emit(EventName.TutorialHerbicidePressed)
                    break
                }
                case ToolId.Pesticide: {
                    this.scene.events.emit(EventName.TutorialPesiticidePressed)
                    break
                }
                case ToolId.Crate: {
                    this.scene.events.emit(EventName.TutorialCratePressed)
                    break
                }
                }
                break
            }
            }
        }
    }

    private updateCacheSelectedTool() {
    // store the first selected tool
        this.scene.cache.obj.add(
            CacheKey.SelectedTool,
            this.toolItems[this.startIndex + this.selectedIndex]
        )
    }

    private controlArrowVisibility() {
        if (this.startIndex <= 0) {
            this.disablePrevButton()
        } else {
            this.enablePrevButton()
        }
        if (this.getLastIndex() >= this.toolItems.length - 1) {
            this.disableNextButton()
        } else {
            this.enableNextButton()
        }
    }

    private getLastIndex() {
        return this.startIndex + ITEM_COUNT - 1
    }

    private createPrevButton() {
        const background = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UICommonPrevAvatar
        )
        const icon = this.scene.add.image(0, 0, BaseAssetKey.UICommonPrevIcon)
        const prevButton = this.scene.rexUI.add
            .label({
                originX: 0,
                x: -(this.background.width / 2 - 80),
                width: background.width,
                height: background.height,
                icon,
                align: "center",
                background,
            })
            .layout()
        prevButton.setInteractive().on("pointerdown", () => {
            onGameObjectPress({
                gameObject: prevButton,
                onPress: () => {
                    // update the start and end index
                    this.startIndex -= 1
                    this.movePage()
                    if (this.selectedIndex < ITEM_COUNT - 1) {
                        this.selectTool(this.selectedIndex, false)
                    } else {
                        this.selectTool(ITEM_COUNT - 1, false)
                    }
                },
                scene: this.scene,
                disableInteraction: false,
            })
        })
        // prev button is disabled by default
        return prevButton
    }

    private disablePrevButton() {
        this.prevButton.setVisible(false).setActive(false)
    }
    private enablePrevButton() {
        this.prevButton.setVisible(true).setActive(true)
    }
    private disableNextButton() {
        this.nextButton.setVisible(false).setActive(false)
    }
    private enableNextButton() {
        this.nextButton.setVisible(true).setActive(true)
    }

    private createNextButton() {
        const background = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UICommonNextAvatar
        )
        const icon = this.scene.add.image(0, 0, BaseAssetKey.UICommonNextIcon)
        const nextButton = this.scene.rexUI.add
            .label({
                align: "center",
                icon,
                originX: 1,
                x: this.background.width / 2 - 80,
                width: background.width,
                height: background.height,
                background,
            })
            .layout()
        nextButton.setInteractive().on("pointerdown", () => {
            onGameObjectPress({
                gameObject: nextButton,
                onPress: () => {
                    // update the start and end index
                    this.startIndex += 1
                    this.movePage()
                    // update the item sizer
                    if (this.selectedIndex > 0) {
                        this.selectTool(this.selectedIndex, false)
                    } else {
                        this.selectTool(0, false)
                    }
                },
                disableInteraction: false,
                scene: this.scene,
            })
        })
        return nextButton
    }

    private createSlots() {
    // left slots
        const leftSlots = this.scene.rexUI.add.sizer({
            orientation: "x",
            space: {
                item: 15,
            },
        })
        for (let i = 0; i < ITEM_COUNT - 1; i++) {
            const slot = this.scene.rexUI.add
                .sizer(0, 0, SLOT_HEIGHT, SLOT_WIDTH)
                .addBackground(
                    this.scene.add.rectangle(0, 0, SLOT_WIDTH, SLOT_HEIGHT, 0x000000)
                )
            this.slotMap[i] = slot
            leftSlots.add(slot)
        }
        leftSlots.layout()

        // right slots
        const rightSlots = this.scene.rexUI.add.sizer({
            orientation: "x",
            space: {
                item: 15,
            },
        })
        const slot = this.scene.rexUI.add
            .sizer(0, 0, SLOT_HEIGHT, SLOT_WIDTH)
            .addBackground(
                this.scene.add.rectangle(0, 0, SLOT_WIDTH, SLOT_HEIGHT, 0x000000)
            )
        this.slotMap[ITEM_COUNT - 1] = slot
        rightSlots.add(slot)
        rightSlots.layout()

        const slots = this.scene.rexUI.add
            .sizer({
                orientation: "x",
                space: {
                    item: 40,
                },
            })
            .add(leftSlots)
            .add(rightSlots)
            .layout()

        return slots
    }
    private onSelect({
        index,
        animate = true,
        enableSelectedArrow = true,
    }: OnSelectParams) {
        this.selectedIndex = index
        const slot = this.slotMap[this.selectedIndex]
        // activate the selected slot
        const [main] = slot.getChildren() as Array<ContainerLite>
        const [, selectedArrow] = main.getAllChildren()
        // enable the selected arrow
        if (enableSelectedArrow) {
            const _selectedArrow = selectedArrow as Phaser.GameObjects.Image
            _selectedArrow.setVisible(true).setActive(true)
        }
        // activate the selected slot
        if (animate) {
            this.scene.tweens.add({
                targets: main,
                scaleX: SELECTED_SIZE,
                scaleY: SELECTED_SIZE,
                duration: SCALE_TIME,
                ease: "Back",
            })
        } else {
            main.setScale(SELECTED_SIZE, SELECTED_SIZE)
        }
    }

    private onDeselect({ index, animate = true }: OnDeselectParams) {
        const slot = this.slotMap[index]
        // activate the selected slot
        const [main] = slot.getChildren() as Array<ContainerLite>
        const [,selectedArrow] = main.getAllChildren()
        const _selectedArrow = selectedArrow as Phaser.GameObjects.Image
        _selectedArrow.setVisible(false).setActive(false)
        // deactivate the selected slot
        if (animate) {
            this.scene.tweens.add({
                targets: main,
                scaleX: UNSELECTED_SIZE,
                scaleY: UNSELECTED_SIZE,
                duration: SCALE_TIME,
                ease: "Back",
            })
        } else {
            main.setScale(
                UNSELECTED_SIZE,
                UNSELECTED_SIZE
            )
        }
        // create mask for main
    }

    // method to reset the toolbar content based on the tools current and the tool that is selected
    private updateItemSizer() {
        // show the tools
        for (let i = 0; i < ITEM_COUNT; i++) {
            const actualIndex = this.startIndex + i
            const tool = this.toolItems[actualIndex]
            const slot = this.slotMap[i]
            // clear the slot
            slot.clear(true)
            // add the tool to the slot
            if (tool) {
                const item = new ItemQuantity({
                    baseParams: {
                        scene: this.scene,
                    },
                    options: {
                        assetKey: tool.assetKey,
                        quantity: tool.quantity,
                        showBadge: tool.stackable, 
                        scale: 1,
                    },
                }).layout()
                this.scene.add.existing(item)
                item.setInteractive().on("pointerdown", () => {
                    this.selectTool(i, true)
                })
                item.layout()
                const arrow = this.scene.add.image(0, -(item.height/2 + 20), BaseAssetKey.UIToolbarSelectedArrow)
                const itemContainer = this.scene.rexUI.add.container(0, 0)
                itemContainer.addLocal(item)
                itemContainer.addLocal(arrow)
                slot.addLocal(itemContainer)

                // check if the tool is selected
                if (i === this.selectedIndex) {
                    this.onSelect({ index: i, animate: false, enableSelectedArrow: false })
                } else {
                    this.onDeselect({ index: i, animate: false })
                }
            }
            if (this.scene.cache.obj.get(CacheKey.TutorialActive) && this.enableTutorial) {
                setTutorialDepth({
                    gameObject: this,
                })
            }
        }
    }

    private getToolItems(): Array<ToolLike> {
        const items: Array<ToolLike> = []
        const defaultTools = this.getToolsFromDefault()
        const inventoryTools = this.getToolsFromInventory()
        for (let i = 0; i < defaultTools.length; i++) {
            items.push(defaultTools[i])
        }
        for (const tool of inventoryTools) {
            items.push(tool)
        }
        return items
    }
    // create a list of tools to show
    private getToolsFromInventory(): Array<ToolLike> {
        const toolInventories = getToolInventories({
            scene: this.scene,
            inventories: this.inventories,
        })

        return toolInventories.map((inventory) => {
            const types = this.scene.cache.obj.get(
                CacheKey.InventoryTypes
            ) as Array<InventoryTypeSchema>
            const inventoryType = types.find(
                ({ id }) => id === inventory.inventoryType
            )
            if (!inventoryType) {
                throw new Error(
                    `Inventory type not found for id: ${inventory.inventoryType}`
                )
            }
            const {
                name,
                textureConfig: { key: assetKey },
            } = inventoryTypeAssetMap[inventoryType.displayId]
            return {
                assetKey,
                id: inventory.id,
                quantity: inventory.quantity,
                name,
                stackable: inventoryType.stackable,
                inventoryType,
                default: false,
                index: inventory.index,
            }
        }).sort((prev, next) => prev.index - next.index)
    }
    private getToolsFromDefault(): Array<ToolLike> {
        const defaultTools = getDefaultTools({
            scene: this.scene,
        })
        return defaultTools.map((tool) => {
            const {
                name,
                textureConfig: { key: assetKey },
            } = toolAssetMap[tool.displayId]
            return {
                assetKey,
                id: tool.id,
                name,
                stackable: false,
                default: true,
            }
        })
    }
}

export interface OnSelectParams {
  index: number;
  animate?: boolean;
  // enable the arrow
  enableSelectedArrow?: boolean;
}

export interface OnDeselectParams {
  index: number;
  animate?: boolean;
}

export interface SlotChildren {
  image: Phaser.GameObjects.Image;
  selectedImage: Phaser.GameObjects.Image;
}
