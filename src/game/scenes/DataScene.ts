import { Scene } from "phaser"
import { EventBus, EventName } from "../event-bus"
import { InventorySchema, UserSchema, PlacedItemSchema } from "@/modules/entities"
import { CacheKey } from "../types"
import { SceneName } from "../scene"
import { mergeChangesToObjectsArray } from "@/modules/common"
export class DataScene extends Scene {
    constructor() {
        super(SceneName.Data)
    }
    
    create() {
        EventBus.on(EventName.UserRefreshed, (user: UserSchema) => {
            this.cache.obj.add(CacheKey.User, user)
        })

        EventBus.on(
            EventName.InventoriesRefreshed,
            (inventories: Array<InventorySchema>) => {
                this.cache.obj.add(CacheKey.Inventories, inventories)
            }
        )

        EventBus.on(EventName.UpdateVisitedNeighbor, (user: UserSchema) => {
            this.cache.obj.add(CacheKey.VisitedNeighbor, user)
        })

        EventBus.on(
            EventName.PlacedItemsSynced,
            async (changes: Array<PlacedItemSchema>) => {
                // append changes to the placed items
                const placedItems = this.cache.obj.get(CacheKey.PlacedItems)
                const mergedPlacedItems = mergeChangesToObjectsArray(placedItems, changes)
                // store the placed items in the cache
                this.cache.obj.add(CacheKey.PlacedItems, mergedPlacedItems)
                // emit the event to update the placed items
                EventBus.emit(EventName.UpdatePlacedItems)
            }
        )
    }
}
