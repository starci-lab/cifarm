import {
    BadgeLabel,
    Label,
    Sizer,
} from "phaser3-rex-plugins/templates/ui/ui-components"
import {
    AvailableInType,
    InventoryEntity,
    InventoryTypeId,
    ToolEntity,
} from "@/modules/entities"
import { CacheKey, ContainerLiteBaseConstructorParams } from "../../types"
import {
    BaseAssetKey,
    inventoryTypeAssetMap,
    toolAssetMap,
} from "../../assets"
import { SCALE_TIME } from "../../constants"
import { EventName } from "@/game/event-bus"
import { getScreenBottomY, getScreenCenterX, onGameObjectPress } from "../utils"
import { getToolbarInventories } from "@/game/queries"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { BaseText } from "../elements"

// number of items to show
const NUM_ITEMS = 4
const SLOT_SIZE = 120

interface ToolLike {
  // id of the tool, base on either inventory id or tool id
  id: string;
  // name of the tool
  name: string;
  // asset key of the tool
  assetKey: string;
  // quantity of the tool, if not provided, do not show the quantity
  quantity?: number;
}

const defaultSelectedIndex = 0
// selected size of the tool
export const SELECTED_SIZE = 1.1
export const UNSELECTED_SIZE = 0.9

export class Toolbar extends ContainerLite {
    private startIndex = 0
    private endIndex = NUM_ITEMS - 1
    private slots: Record<number, BadgeLabel> = {}
    private itemSizer: Sizer
    private background: Phaser.GameObjects.Image
    private prevButton: Label
    private nextButton: Label

    private inventories: Array<InventoryEntity> = []
    private tools: Array<ToolEntity> = []
    // selected tool index
    private selectedIndex = defaultSelectedIndex

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)
        // create the toolbar background
        this.background = this.scene.add.image(0, 0, BaseAssetKey.ToolbarBackground).setOrigin(0.5, 1)
        this.addLocal(this.background)

        // create the toolbar background
        this.itemSizer = this.createItemSizer()
        this.addLocal(this.itemSizer)

        this.inventories = this.scene.cache.obj.get(
            CacheKey.Inventories
        ) as Array<InventoryEntity>

        // get the tools from the cache
        this.tools = this.scene.cache.obj.get(CacheKey.Tools) as Array<ToolEntity>

        // update the sizer with the tools
        this.updateItemSizer()
        // layout the sizer
        this.itemSizer.layout()

        // listen for the next button click
        this.scene.events.on(EventName.SelectTool, (index: number) => {
            // deselect the current selected item
            this.onDeselect({ index: this.selectedIndex })
            // select the new item
            this.onSelect({ index })
            // update the selected index
            this.selectedIndex = index
        })

        this.add(this.itemSizer)

        this.prevButton = this.createPrevButton()
        // disable the prev button by default
        this.disablePrevButton()
        this.addLocal(this.prevButton)

        this.nextButton = this.createNextButton()
        this.addLocal(this.nextButton)

        // listen for the page moved event
        this.scene.events.on(EventName.PageMoved, () => {
            if (this.startIndex <= 0) {
                this.disablePrevButton()
            } else {
                this.enablePrevButton()
            }
            if (this.endIndex >= this.createToolList().length - 1) {
                this.disableNextButton()
            } else {
                this.enableNextButton()
            }
        })
    }

    private createPrevButton() {
        const background = this.scene.add.image(
            0,
            0,
            BaseAssetKey.ToolbarPrevAvatar
        )
        const icon = this.scene.add.image(0, 0, BaseAssetKey.ToolbarPrevIcon)
        const prevButton = this.scene.rexUI.add
            .label({
                originX: 0,
                x: -(this.background.width / 2 - 80),
                y: -(this.background.height / 2 + 20),
                width: background.width,
                height: background.height,
                icon,
                align: "center",
                background,
            })
            .layout()
        prevButton
            .setInteractive()
            .on("pointerdown", () => {
                onGameObjectPress({
                    gameObject: prevButton,
                    onPress: () => {
                        // update the start and end index
                        this.startIndex -= 1
                        this.endIndex -= 1
                        // update the item sizer
                        this.updateItemSizer()
                        this.scene.events.emit(EventName.PageMoved)
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
            BaseAssetKey.ToolbarNextAvatar
        )
        const icon = this.scene.add.image(0, 0, BaseAssetKey.ToolbarNextIcon)
        const nextButton = this.scene.rexUI.add
            .label({
                align: "center",
                icon,
                originX: 1,
                x: this.background.width / 2 - 80,
                y: -(this.background.height / 2 + 20),
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
                    this.endIndex += 1
                    // update the item sizer
                    this.updateItemSizer()
                    this.scene.events.emit(EventName.PageMoved)
                },
                disableInteraction: false,
                scene: this.scene,
            })
        })
        return nextButton
    }

    private onSelect({
        index,
        animate = true,
        enableSelectedArrow = true,
    }: OnSelectParams) {
        this.selectedIndex = index
        const slot = this.slots[index]
        // activate the selected slot
        const [ main ] = slot.getChildren() as Array<ContainerLite>
        const [ selectedArrow, icon ] = main.getAllChildren()
        // enable the selected arrow
        if (enableSelectedArrow) {
            const _selectedArrow = selectedArrow as Phaser.GameObjects.Image
            _selectedArrow.setVisible(true).setActive(true)
        }
        // activate the selected slot
        if (animate) {
            this.scene.tweens.add({
                targets: icon,
                scaleX: SELECTED_SIZE,
                scaleY: SELECTED_SIZE,
                duration: SCALE_TIME,
                ease: "Back",
            })
        } else {
            slot.setScale(SELECTED_SIZE, SELECTED_SIZE)
        }
    }

    private onDeselect({
        index,
        animate = true,
    }: OnDeselectParams) {
        const slot = this.slots[index]
        // activate the selected slot
        const [ main, badge ] = slot.getChildren() as Array<ContainerLite>
        const [ selectedArrow, icon ] = main.getAllChildren()
        const _selectedArrow = selectedArrow as Phaser.GameObjects.Image
        // set the tint of the selected slot
        badge.setVisible(true).setActive(true)
        _selectedArrow.setVisible(false).setActive(false)
        // deactivate the selected slot
        if (animate) {
            this.scene.tweens.add({
                targets: icon,
                scaleX: UNSELECTED_SIZE,
                scaleY: UNSELECTED_SIZE,
                duration: SCALE_TIME,
                ease: "Back",
            })
        } else {
            main.setScale(UNSELECTED_SIZE, UNSELECTED_SIZE)
        }
    }

    // method to reset the toolbar content based on the tools current and the tool that is selected
    private updateItemSizer() {
    // get the tools to show
        const tools = this.createToolList()
        // show the tools
        for (let i = 0; i < NUM_ITEMS; i++) {
            const actualIndex = this.startIndex + i
            const tool = tools[actualIndex]
            const slot = this.slots[i]
            if (!slot) {
                throw new Error(`Slot not found for index: ${i}`)
            }
            // get the container of the slot
            const [ main, rightBottom ] = slot.getChildren() as Array<ContainerLite>
            // clear the slot
            const [ , icon ] = main.getAllChildren()
            if (icon) {
                icon.destroy()
            }
            // add the tool to the slot
            const currentIcon = this.scene.add.image(0, 0, tool.assetKey)
            main.addLocal(currentIcon)

            if (rightBottom) {
                rightBottom.clear(true)
            }
            if (tool.quantity) {
                const quantityText = new BaseText({
                    baseParams: {
                        scene: this.scene,
                        x: 0,
                        y: 0,
                        text: tool.quantity.toString(),
                    },
                    options: {
                        enableStroke: true,
                        fontSize: 36,
                    },
                })
                this.scene.add.existing(quantityText)
                rightBottom.addLocal(quantityText)
            }
            // play the animation, if the slot is created for the selected index
            if (i === this.selectedIndex) {
                this.onSelect({
                    index: i,
                    animate: false,
                    enableSelectedArrow: false,
                })
            } else {
                this.onDeselect({
                    index: i,
                    animate: false,
                })
            }
        }
    }

    // create a list of tools to show
    private createToolList(inHome?: boolean): Array<ToolLike> {
    // by default, show your home tools
        const tools: Array<ToolLike> = this.tools
            .filter(
                (tool) =>
                    tool.availableIn === AvailableInType.Home ||
          tool.availableIn === AvailableInType.Both
            )
            .sort((prev, next) => prev.index - next.index)
            .map((tool) => ({
                id: tool.id,
                name: toolAssetMap[tool.id].name,
                assetKey: toolAssetMap[tool.id].textureConfig.key,
            }))

        const toolbarInventories = getToolbarInventories({
            inventories: this.inventories,
            scene: this.scene,
        })

        const additionalTools: Array<ToolLike> = toolbarInventories.map(
            (inventory) => {
                const {
                    name,
                    textureConfig: { key: assetKey },
                } = inventoryTypeAssetMap[inventory.inventoryTypeId as InventoryTypeId]
                return {
                    assetKey,
                    id: inventory.id,
                    quantity: inventory.quantity,
                    name,
                }
            }
        )

        return [...tools, ...additionalTools]
    }

    // create slots for the items
    private createSlot(index: number = defaultSelectedIndex) {
        // create the main container
        const main = this.scene.rexUI.add.container(0, 0)
        const selectedArrow = this.scene.add.image(0, -150, BaseAssetKey.ToolbarSelectedArrow).setOrigin(0.5, 0)
        main.addLocal(selectedArrow)

        // create the left bottom container
        return this.scene.rexUI.add
            .badgeLabel({
                width: SLOT_SIZE,
                height: SLOT_SIZE,
                main,
                rightBottom: this.scene.rexUI.add.container(0, 0),
            })
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.events.emit(EventName.SelectTool, index)
            })
    }

    // create a sizer holds all the items
    private createItemSizer(): Sizer {
        const itemSizer = this.scene.rexUI.add.sizer({
            orientation: "x",
            space: {
                item: 40,
            },
            x: 0,
            y: -(this.background.height/2 + 20),
        })

        // add the items to the sizer
        // left items
        const leftItemSizer = this.scene.rexUI.add.sizer({
            orientation: "x",
            space: {
                item: 15,
            },
            x: getScreenCenterX(this.scene),
            y: getScreenBottomY(this.scene) / 2 - 160,
        })

        for (let i = 0; i < NUM_ITEMS - 1; i++) {
            const slot = this.createSlot(i)
            // create the avatar of each slot
            this.slots[i] = slot
            leftItemSizer.add(slot)
        }

        // right items
        const rightItemSizer = this.scene.rexUI.add.sizer({
            orientation: "x",
            space: {
                item: 15,
            },
            x: getScreenCenterX(this.scene),
            y: getScreenBottomY(this.scene) / 2 - 160,
        })
        // get the last item
        const last = NUM_ITEMS - 1
        // create the slot
        const slot = this.createSlot(last)
        // create the avatar of each slot
        this.slots[last] = slot
        rightItemSizer.add(slot)
        itemSizer.add(leftItemSizer).add(rightItemSizer)
        itemSizer.layout()
        return itemSizer
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
