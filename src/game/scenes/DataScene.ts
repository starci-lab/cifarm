import { Scene } from "phaser"
import {
    ExternalEventEmitter,
    ExternalEventName,
    SceneEventEmitter,
    SceneEventName,
    SelectToolMessage,
} from "@/modules/event-emitter"
import {
    InventorySchema,
    UserSchema,
    PlacedItemSchema,
} from "@/modules/entities"
import { CacheKey, PlacedItemsData } from "../types"
import { SceneName } from "../scene"
import { DeepPartial } from "react-hook-form"

//scene for handling all data
export class DataScene extends Scene {
    constructor() {
        super(SceneName.Data)
    }

    create() {
        ExternalEventEmitter.on(
            ExternalEventName.SelectTool,
            ({ tool }: SelectToolMessage) => {
                this.cache.obj.add(CacheKey.SelectedTool, tool)
            }
        )
        //emit immediately after the scene is created
        ExternalEventEmitter.emit(ExternalEventName.RequestSelectTool)

        ExternalEventEmitter.on(
            ExternalEventName.PlacedItemsSynced,
            async (placedItems: Array<PlacedItemSchema>) => {
                // store the placed items in the cache
                const eventMessage: PlacedItemsData = {
                    placedItems,
                    userId: this.cache.obj.get(CacheKey.WatchingUser)?.id,
                }
                this.cache.obj.add(CacheKey.PlacedItems, eventMessage)
                // emit the event to update the placed items
                SceneEventEmitter.emit(SceneEventName.PlacedItemsRefreshed)
            }
        )

        ExternalEventEmitter.on(
            ExternalEventName.InventoriesSynced,
            (inventories: Array<InventorySchema>) => {
                // emit the event to update the inventories
                this.cache.obj.add(CacheKey.Inventories, inventories)
                SceneEventEmitter.emit(SceneEventName.InventoriesRefreshed)
            }
        )

        ExternalEventEmitter.on(
            ExternalEventName.UserSynced,
            (user: DeepPartial<UserSchema>) => {
                this.cache.obj.add(CacheKey.User, user)
                // emit the event to update the user
                SceneEventEmitter.emit(SceneEventName.UserRefreshed)
            }
        )

        ExternalEventEmitter.on(
            ExternalEventName.PlacedItemsLoaded,
            (placedItems: Array<PlacedItemSchema>) => {
                const watchingUser = this.cache.obj.get(CacheKey.WatchingUser) as
          | UserSchema
          | undefined
                const userId = watchingUser?.id ?? undefined
                const placedItemsData: PlacedItemsData = {
                    placedItems,
                    userId,
                }
                this.cache.obj.add(CacheKey.PlacedItems, placedItemsData)
                // emit the event to update the placed items
                SceneEventEmitter.emit(SceneEventName.PlacedItemsRefreshed)
            }
        )
    }
}
