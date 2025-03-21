import { Scene } from "phaser"
import { EventBus, EventName } from "../event-bus"
import { InventorySchema, UserSchema, PlacedItemSchema } from "@/modules/entities"
import { CacheKey } from "../types"
import { SceneName } from "../scene"
import { WithStatus, SchemaStatus } from "@/modules/common"

export class DataScene extends Scene {
    constructor() {
        super(SceneName.Data)
    }
    
    create() {
        EventBus.on(EventName.UpdateVisitedNeighbor, (user: UserSchema) => {
            this.cache.obj.add(CacheKey.VisitedNeighbor, user)
        })

        EventBus.on(
            EventName.PlacedItemsSynced,
            async (placedItemsWithStatus: Array<WithStatus<PlacedItemSchema>>) => {
                const placedItems = this.cache.obj.get(CacheKey.PlacedItems) as Array<PlacedItemSchema>
                // loop through the placed items and update the placed item
                for (let i = 0; i < placedItemsWithStatus.length; i++) {
                    const placedItemWithStatus = placedItemsWithStatus[i]
                    // if the placed item is created, add it to the cache
                    switch (placedItemWithStatus.status) {
                    case SchemaStatus.Created: {
                        // create the placed item without the status
                        const placedItem = {
                            ...placedItemWithStatus,
                            status: undefined
                        } as PlacedItemSchema
                        placedItems.push(placedItem)
                        break
                    }
                    case SchemaStatus.Updated: {
                        // update the placed item without the status
                        const placedItem = {
                            ...placedItemWithStatus,
                            status: undefined
                        } as PlacedItemSchema
                        const foundIndex = placedItems.findIndex(item => item.id === placedItem.id)
                        if (foundIndex === -1) {
                            throw new Error("Placed item not found")
                        }
                        placedItems[foundIndex] = placedItem
                        break
                    }
                    case SchemaStatus.Deleted: {
                        // delete the placed item without the status
                        const foundIndex = placedItems.findIndex(item => item.id === placedItemWithStatus.id)
                        if (foundIndex === -1) {
                            throw new Error("Placed item not found")
                        }
                    }
                    }
                }   
                //
                // store the placed items in the cache
                this.cache.obj.add(CacheKey.PlacedItems, placedItems)
                // emit the event to update the placed items
                EventBus.emit(EventName.PlacedItemsRefreshed)
            }
        )

        EventBus.on(EventName.InventorySynced, (inventoriesWithStatus: Array<WithStatus<InventorySchema>>) => {
            const inventories = this.cache.obj.get(CacheKey.Inventories) as Array<InventorySchema>
            // loop through the inventories and update the inventory
            for (let i = 0; i < inventoriesWithStatus.length; i++) {
                const inventoryWithStatus = inventoriesWithStatus[i]
                // if the inventory is created, add it to the cache
                switch (inventoryWithStatus.status) {
                case SchemaStatus.Created: {
                    // create the inventory without the status
                    const inventory = {
                        ...inventoryWithStatus,
                        status: undefined
                    } as InventorySchema
                    inventories.push(inventory)
                    break
                }
                case SchemaStatus.Updated:
                {
                    const inventory = {
                        ...inventoryWithStatus,
                        status: undefined
                    } as InventorySchema

                    const foundIndex = inventories.findIndex(inventory => inventory.id === inventoryWithStatus.id)
                    if (foundIndex === -1) {
                        throw new Error("Inventory not found")
                    }
                    inventories[foundIndex] = inventory
                    break
                }
                case SchemaStatus.Deleted:
                {
                    const foundIndex = inventories.findIndex(inventory => inventory.id === inventoryWithStatus.id)  
                    if (foundIndex === -1) {
                        throw new Error("Inventory not found")
                    }
                    inventories.splice(foundIndex, 1)
                    break
                }
                }
            }

            // emit the event to update the inventories
            this.cache.obj.add(CacheKey.Inventories, inventories)
            EventBus.emit(EventName.InventoriesRefreshed)
        })

        EventBus.on(EventName.UserSynced, (user: UserSchema) => {
            this.cache.obj.add(CacheKey.User, user)
            // emit the event to update the user
            EventBus.emit(EventName.UserRefreshed)
        })
    }
}
