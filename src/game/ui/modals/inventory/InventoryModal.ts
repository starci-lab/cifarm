import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { BaseSizerBaseConstructorParams, CacheKey } from "../../../types"
import { getScreenBottomY, getScreenCenterX } from "../../utils"
import { InventoryToolbar } from "./InventoryToolbar"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { InventoryStorage } from "./InventoryStorage"
import { DefaultInfo, InventoryKind, InventorySchema, InventoryTypeSchema, UserSchema } from "@/modules/entities"
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

    private updateInvetories() {
        
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
            const user = this.scene.cache.obj.get(CacheKey.User) as UserSchema

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
            const foundInventory = inventories.find((inventory) => inventory.kind === kind && inventory.index === index && user.id === inventory.user)
        
            if (foundInventory) {
            // If found inventory exists, perform logic based on inventory type
                if (foundInventory.id === inventoryId) {
                // If it's the same inventory, no changes
                    return
                }
                // If inventories are of the same type, update quantity or perform actions
                if (foundInventory.inventoryType.toString() === inventoryType.id) {
                // Merge quantities or handle inventory item addition
                    foundInventory.quantity += inventory.quantity

                    // Remove the old inventory
                    inventories = inventories.filter(inv => inv.id !== inventory.id)
                } else {
                // Swap inventories
                    const tempIndex = foundInventory.index
                    const tempKind = foundInventory.kind

                    // Swap index and kind between the two inventories
                    foundInventory.index = inventory.index
                    foundInventory.kind = inventory.kind
                    inventory.index = tempIndex
                    inventory.kind = tempKind
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