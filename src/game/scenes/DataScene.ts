import { Scene } from "phaser"
import { EventBus, EventName } from "../event-bus"
import { InventorySchema, UserSchema } from "@/modules/entities"
import { CacheKey } from "../types"
import { SceneName } from "../scene"
//import { EventName } from "../event-bus"

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
    }
}
