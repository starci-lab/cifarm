import { SceneAbstract } from "../../SceneAbstract"
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { Scene } from "phaser"
import {
    AvailableInType,
    InventoryEntity,
    InventoryTypeEntity,
    ToolEntity,
} from "@/modules/entities"
import { CacheKey } from "../../types"
import { BaseAssetKey, toolAssetMap } from "../../assets"
import { GRAY_TINT_COLOR, SCALE_TIME } from "../../constants"
import { EventName } from "@/game/event-bus"
import { getScreenBottomY, getScreenCenterX } from "../utils"

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

export class ToolbarContent extends SceneAbstract {
    private startIndex = 0
    private endIndex = NUM_ITEMS - 1
    private slots: Record<number, Sizer> = {}
    private itemSizer: Sizer

    private inventories: Array<InventoryEntity> = []
    private tools: Array<ToolEntity> = []

    // selected tool index
    private selectedIndex = defaultSelectedIndex

    constructor(scene: Scene) {
        super(scene)
        // create the toolbar background
        this.itemSizer = this.createItemSizer()

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
    }

    // get the slot children
    private getSlotChidren(index: number): SlotChildren {
        const slot = this.slots[index]
        const container = slot.getChildren()[1] as Phaser.GameObjects.Container
        const [image, selectedImage] =
      container.getAll() as Array<Phaser.GameObjects.Image>
        return { image, selectedImage }
    }

    private onSelect({
        index,
        animate = true,
        clearTint = true,
    }: OnSelectParams) {
        this.selectedIndex = index
        const slot = this.slots[index]
        // activate the selected slot
        const { image, selectedImage } = this.getSlotChidren(index)
        if (animate) {
            this.scene.tweens.add({
                targets: slot,
                scaleX: SELECTED_SIZE,
                scaleY: SELECTED_SIZE,
                duration: SCALE_TIME,
                ease: "Back",
            })
        } else {
            slot.setScale(SELECTED_SIZE, SELECTED_SIZE)
        }
        if (clearTint) {
            // clear the tint of the selected slot
            image.clearTint()
        }
        selectedImage.setVisible(true)
    }

    private onDeselect({
        index,
        animate = true,
        hideSelected = true,
    }: OnDeselectParams) {
        const slot = this.slots[index]
        const { image, selectedImage } = this.getSlotChidren(index)
        // deactivate the selected slot
        if (animate) {
            this.scene.tweens.add({
                targets: slot,
                scaleX: UNSELECTED_SIZE,
                scaleY: UNSELECTED_SIZE,
                duration: SCALE_TIME,
                ease: "Back",
            })
        } else {
            slot.setScale(UNSELECTED_SIZE, UNSELECTED_SIZE)
        }
        // set the tint of the selected slot
        image.setTint(GRAY_TINT_COLOR)

        if (hideSelected) {
            selectedImage.setVisible(false)
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
            const slot = this.slots[actualIndex]
            if (!slot) {
                throw new Error(`Slot not found for index: ${i}`)
            }
            // get the container of the slot
            const slotContainer =
        slot.getChildren()[1] as Phaser.GameObjects.Container
            // clear the slot
            slotContainer.removeAll(true)
            // add the tool to the slot
            const image = this.scene.add.image(0, 0, tool.assetKey)
            slotContainer.add(image)
            const selectedImage = this.scene.add
                .image(0, 0, BaseAssetKey.ToolbarSelected)
                .setOrigin(0.5, 1)
                .setPosition(0, -(SLOT_SIZE / 2 + 30))
                .setVisible(false)
            slotContainer.add(selectedImage)
            // play the animation, if the slot is created for the selected index
            if (i === this.selectedIndex) {
                this.onSelect({
                    index: i,
                    animate: false,
                    clearTint: false,
                })
            } else {
                this.onDeselect({
                    index: i,
                    animate: false,
                    hideSelected: false,
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

        // load all inventory types from cache
        const inventoryTypes = this.scene.cache.obj.get(
            CacheKey.InventoryTypes
        ) as Array<InventoryTypeEntity>
        // filter out the tools from the inventories
        const toolFromInventories: Array<ToolLike> = this.inventories
            .filter((inventory) => {
                const inventoryType = inventoryTypes.find(
                    (inventoryType) => inventoryType.id === inventory.inventoryTypeId
                )
                if (!inventoryType) {
                    return false
                    throw new Error(
                        `Inventory type not found for inventory: ${inventory.id}`
                    )
                }

                // check if the inventory is a tool and available in the current location
                const asTool = inventoryType.asTool
                // check if the tool is available in the current location
                const specific = inHome
                    ? inventoryType.availableIn === AvailableInType.Home
                    : inventoryType.availableIn === AvailableInType.Neighbor
                const availableIn =
          inventoryType.availableIn === AvailableInType.Both || specific
                return asTool && availableIn
            })
            .map((inventory) => {
                const inventoryType = inventoryTypes.find(
                    (inventoryType) => inventoryType.id === inventory.inventoryTypeId
                )
                if (!inventoryType) {
                    throw new Error(
                        `Inventory type not found for inventory: ${inventory.id}`
                    )
                }
                return {
                    id: inventory.id,
                    name: "ABC",
                    assetKey: "ABC",
                    quantity: inventory.quantity,
                }
            })

        return [...tools, ...toolFromInventories]
    }

    // create slots for the items
    private createSlot(index: number = defaultSelectedIndex) {
        return this.scene.rexUI.add
            .sizer({
                width: SLOT_SIZE,
                height: SLOT_SIZE,
            })
            .addSpace()
            .add(this.scene.add.container(0, 0))
            .addSpace()
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.events.emit(EventName.SelectTool, index)
            })
    }

    // create a sizer holds all the items
    private createItemSizer(): Sizer {
        const itemSizer = this.scene.rexUI.add.sizer({
            orientation: "x",
            originY: 1,
            space: {
                item: 40,
            },
            x: getScreenCenterX(this.scene),
            y: getScreenBottomY(this.scene) - 160,
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
  // clear tint for the selected item
  clearTint?: boolean;
}

export interface OnDeselectParams {
  index: number;
  animate?: boolean;
  // hide the selected image
  hideSelected?: boolean;
}

export interface SlotChildren {
  image: Phaser.GameObjects.Image;
  selectedImage: Phaser.GameObjects.Image;
}
