import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { BaseSizerBaseConstructorParams, CacheKey } from "../../../types"
import { getScreenBottomY, getScreenCenterX } from "../../utils"
import { InventoryToolbar } from "./InventoryToolbar"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { InventoryStorage } from "./InventoryStorage"
import { DefaultInfo, InventoryKind, InventorySchema, InventoryTypeSchema } from "@/modules/entities"
import { IPaginatedResponse } from "@/modules/apollo"
import { MoveInventoryRequest } from "@/modules/axios"
import { EventBus, EventName } from "@/game/event-bus"

export class InventoryModal extends BaseSizer {
    //private inventoryContent: InventoryContent
    private inventoryToolbar: InventoryToolbar
    private inventoryStorage: InventoryStorage
    private container: ContainerLite

    constructor({ scene, x, y, width, height, config}: BaseSizerBaseConstructorParams) {
        super(scene, x, y, width, height, config)

        this.container = this.scene.rexUI.add.container(getScreenCenterX(this.scene), getScreenBottomY(this.scene))
        this.add(this.container)
        // create the inventory toolbar
        this.inventoryToolbar = new InventoryToolbar(this.scene, 0, 0)
        this.scene.add.existing(this.inventoryToolbar)
        this.container.addLocal(this.inventoryToolbar)
        // create the inventory storage
        this.inventoryStorage = new InventoryStorage({
            scene: this.scene,
            y: -(this.inventoryToolbar.height - 20),
        })
        this.scene.add.existing(this.inventoryStorage)
        this.container.addLocal(this.inventoryStorage)

        EventBus.on(EventName.RequestMoveInventoryLocal, (request: MoveInventoryRequest) => {
            this.moveInventoryLocal(request)
        })
    }

    // client-process logic
    private async moveInventoryLocal({
        isTool,
        index,
        inventoryId,
    }: MoveInventoryRequest) {
        // Get the inventories from the cache
        const { data } = this.scene.cache.obj.get(CacheKey.Inventories) as IPaginatedResponse<InventorySchema>
        let inventories = data

        const updateInventories = () => {
            const inventoryTypes = this.scene.cache.obj.get(CacheKey.InventoryTypes) as Array<InventoryTypeSchema>

            const { storageCapacity, toolCapacity } = this.scene.cache.obj.get(CacheKey.DefaultInfo) as DefaultInfo
            const capacity = isTool ? toolCapacity : storageCapacity

            // Check if index is out of bounds
            if (index >= capacity) {
                throw new Error("Inventory index is out of range")
            }

            const kind = isTool ? InventoryKind.Tool : InventoryKind.Storage

            // Find the inventory by inventoryId
            const inventory = inventories.find((inventory) => inventory.id === inventoryId)
            if (!inventory) {
                throw new Error("Inventory not found")
            }

            const inventoryType = inventoryTypes.find((inventoryType) => inventoryType.id === inventory.inventoryType)
            if (!inventoryType) {
                throw new Error("Inventory type not found")
            }

            // Check if there is already an inventory at the target index
            const foundInventory = inventories.find((inventory) => inventory.kind === kind && inventory.index === index)
        
            if (foundInventory) {
                // If found inventory exists, perform logic based on inventory type
                if (foundInventory.id === inventoryId) {
                // If it's the same inventory, no changes
                    return
                }
                // If inventories are of the same type, update quantity or perform actions
                if (foundInventory.inventoryType === inventoryType.id) {
                    // if it react the max stack size, thus we create a new inventory
                    if (foundInventory.quantity + inventory.quantity <= inventoryType.maxStack) {
                        // Remove the old inventory
                        inventories = inventories.filter(inv => inv.id !== inventory.id)
                        // Update the quantity of the found inventory
                        foundInventory.quantity += inventory.quantity
                    } else {
                        // reduce the quantity of the inventory
                        inventory.quantity -= inventoryType.maxStack - foundInventory.quantity
                        foundInventory.quantity = inventoryType.maxStack
                    }
                } else {
                // Swap inventories
                    const { index: foundIndex, kind: foundKind } = foundInventory
                    // Swap index and kind between the two inventories
                    foundInventory.index = inventory.index
                    foundInventory.kind = inventory.kind
                    inventory.index = foundIndex
                    inventory.kind = foundKind
                }
            } else {
                // If no inventory exists at the target index, just update the index and kind
                inventory.index = index
                inventory.kind = kind
            }
        }
        updateInventories()
        // emit the update inventory event
        const eventMessage: IPaginatedResponse<InventorySchema> = {
            data: inventories,
            count: inventories.length,
        }
        EventBus.emit(EventName.InventoriesRefreshed, eventMessage)
    }
}