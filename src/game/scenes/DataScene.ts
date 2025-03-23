import { Scene } from "phaser"
import { EventBus, EventName } from "../event-bus"
import { InventorySchema, UserSchema, PlacedItemSchema } from "@/modules/entities"
import { CacheKey, PlacedItemsData } from "../types"
import { SceneName } from "../scene"
import { WithStatus, SchemaStatus } from "@/modules/common"
import { mergeObjects } from "swr/_internal"
import { DeepPartial } from "react-hook-form"

export class DataScene extends Scene {
    constructor() {
        super(SceneName.Data)
    }
    
    create() {
        EventBus.on(
            EventName.PlacedItemsSynced,
            async (placedItemsWithStatus: Array<WithStatus<PlacedItemSchema>>) => {
                const previousPlacedItemsData = this.cache.obj.get(CacheKey.PlacedItems) as PlacedItemsData
                const { placedItems } = previousPlacedItemsData
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
                        // update the placed item with partial data
                        const foundIndex = placedItems.findIndex(item => item.id === placedItemWithStatus.id)
                        if (foundIndex === -1) {
                            throw new Error("Placed item not found")
                        }
                        placedItems[foundIndex] = mergeObjects(placedItems[foundIndex], placedItemWithStatus)
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
                // get the user id
                const watchingUser = this.cache.obj.get(CacheKey.WatchingUser) as UserSchema | undefined
                const userId = watchingUser?.id ?? undefined
                // create the placed items data
                const placedItemsData: PlacedItemsData = {
                    placedItems,
                    userId,
                }
                // store the placed items in the cache
                this.cache.obj.add(CacheKey.PlacedItems, placedItemsData)
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
                    // merge the inventory with the existing inventory
                    const foundIndex = inventories.findIndex(inventory => inventory.id === inventoryWithStatus.id)
                    if (foundIndex === -1) {
                        throw new Error("Inventory not found")
                    }
                    inventories[foundIndex] = mergeObjects(inventories[foundIndex], inventoryWithStatus)
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

        EventBus.on(EventName.UserSynced, (user: DeepPartial<UserSchema>) => {
            // merge the user with the existing user
            const existingUser = this.cache.obj.get(CacheKey.User) as UserSchema
            const mergedUser = mergeObjects(existingUser, user)
            this.cache.obj.add(CacheKey.User, mergedUser)
            // emit the event to update the user
            EventBus.emit(EventName.UserRefreshed)
            console.log(mergedUser)
        })

        EventBus.on(EventName.PlacedItemsLoaded1, (placedItems: Array<PlacedItemSchema>) => {
            const watchingUser = this.cache.obj.get(CacheKey.WatchingUser) as UserSchema | undefined
            const userId = watchingUser?.id ?? undefined
            const placedItemsData: PlacedItemsData = {
                placedItems,
                userId,
            }
            this.cache.obj.add(CacheKey.PlacedItems, placedItemsData)
            // emit the event to update the placed items
            EventBus.emit(EventName.PlacedItemsRefreshed)
        })
    }
}

