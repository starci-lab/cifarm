import { GAMEPLAY_IO } from "@/app/constants"
import { EventBus, EventName, SyncPlacedItemsMessage } from "@/game/event-bus"
import {
    ACTION_EMITTED_EVENT,
    PLACED_ITEMS_SYNCED_EVENT,
    useGameplayIo,
    ActionEmittedMessage,
    INVENTORIES_SYNCED_EVENT,
    InventorySyncedMessage,
    PlacedItemsSyncedMessage,
    SHOW_FADE_EVENT,
    USER_SYNCED_EVENT,
    UserSyncedMessage,
    SYNC_PLACED_ITEMS_EVENT,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const useSyncPlacedItemsEffects = () => {
    //get the singleton instance of the thief crop mutation
    const { socket, connect } =
    useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)

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
        socket.on(USER_SYNCED_EVENT, ({ data }: UserSyncedMessage) => {
            EventBus.emit(EventName.UserSynced, data)
        })

        // listen for inventories synced
        socket.on(
            INVENTORIES_SYNCED_EVENT,
            ({ data }: InventorySyncedMessage) => {
                EventBus.emit(EventName.InventorySynced, data)
            }
        )

        socket.on(
            PLACED_ITEMS_SYNCED_EVENT,
            ({ data }: PlacedItemsSyncedMessage) => {
                EventBus.emit(EventName.PlacedItemsSynced, data)
            }
        )

        EventBus.on(EventName.SyncPlacedItems, ({ placedItemIds }: SyncPlacedItemsMessage) => {
            socket.emit(SYNC_PLACED_ITEMS_EVENT, {
                placedItemIds,
            })
        })

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
