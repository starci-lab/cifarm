import { GAMEPLAY_IO } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { ACTION_EMITTED_EVENT, PLACED_ITEMS_SYNCED_EVENT, SYNC_PLACED_ITEMS_EVENT, useGameplayIo, ActionEmittedMessage, INVENTORIES_SYNCED_EVENT, InventorySyncedMessage, PlacedItemsSyncedMessage, SHOW_FADE_EVENT, ShowFadeMessage, USER_SYNCED_EVENT, UserSyncedMessage } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const useSyncPlacedItemsEffects = () => {
    //get the singleton instance of the thief crop mutation
    const { socket, connect } = useSingletonHook<
        ReturnType<typeof useGameplayIo>
    >(GAMEPLAY_IO)

    useEffect(() => {
        // connect
        connect()
        //if socket is null do nothing
        if (!socket) return
        // listen for action emitted
        socket.on(ACTION_EMITTED_EVENT, (data: ActionEmittedMessage) => {
            EventBus.emit(EventName.ActionEmitted, data)
        })

        // listen for energy synced
        socket.on(USER_SYNCED_EVENT, ({ user }: UserSyncedMessage) => {
            console.log("user synced")
            EventBus.emit(EventName.UserRefreshed, user)
        })

        // listen for inventories synced
        socket.on(INVENTORIES_SYNCED_EVENT, ({ inventories }: InventorySyncedMessage) => {
            console.log("inventories synced")
            EventBus.emit(EventName.InventoriesRefreshed, inventories)
        })

        //listen for show fade event
        socket.on(SHOW_FADE_EVENT, ({ toNeighbor }: ShowFadeMessage) => {
            EventBus.emit(EventName.ShowFade, toNeighbor)
        })

        socket.on(PLACED_ITEMS_SYNCED_EVENT, ({ placedItems }: PlacedItemsSyncedMessage) => {
            EventBus.emit(EventName.PlacedItemsSynced, placedItems)
        })
        setInterval(() => {
            if (!socket) {
                return
            }      
            socket.emit(SYNC_PLACED_ITEMS_EVENT)
        }, 1000)

        return () => {
            socket.off(PLACED_ITEMS_SYNCED_EVENT)
            socket.off(ACTION_EMITTED_EVENT)
            socket.off(USER_SYNCED_EVENT)
            socket.off(INVENTORIES_SYNCED_EVENT)
            socket.off(SHOW_FADE_EVENT)
            socket.off(PLACED_ITEMS_SYNCED_EVENT)
        }
    }, [socket])        
}