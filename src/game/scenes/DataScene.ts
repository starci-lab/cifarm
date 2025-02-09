import { Scene } from "phaser"
import { EventBus, EventName } from "../event-bus"
import { InventoryEntity, UserEntity } from "@/modules/entities"
import { CacheKey } from "../types"
import { SceneName } from "../scene"
//import { EventName } from "../event-bus"

export class DataScene extends Scene {
    constructor() {
        super(SceneName.Data)
    }
    create() {
        EventBus.on(EventName.UserRefreshed, (user: UserEntity) => {
            this.cache.obj.add(CacheKey.User, user)
        })

        EventBus.on(
            EventName.InventoriesRefreshed,
            (inventories: Array<InventoryEntity>) => {
                this.cache.obj.add(CacheKey.Inventories, inventories)
            }
        )
    }
}
