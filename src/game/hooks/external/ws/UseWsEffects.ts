import { GAMEPLAY_IO } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"
import {
    useWs,
    ActionEmittedMessage,
    InventorySyncedMessage,
    PlacedItemsSyncedMessage,
    UserSyncedMessage,
    ReceiverEventName,
    EmitterEventName,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const UseWsEffects = () => {
    //get the singleton instance of the thief crop mutation
    const { socket, connect } =
    useSingletonHook<ReturnType<typeof useWs>>(GAMEPLAY_IO)

    useEffect(() => {
        // connect
        connect()
        //if socket is null do nothing
        if (!socket) return
        // listen for action emitted
        socket.on(ReceiverEventName.ActionEmitted, (data: ActionEmittedMessage) => {
            ExternalEventEmitter.emit(ExternalEventName.ActionEmitted, data)
        })

        // listen for energy synced
        socket.on(ReceiverEventName.UserSynced, ({ data }: UserSyncedMessage) => {
            ExternalEventEmitter.emit(ExternalEventName.UserSynced, data)
        })

        // listen for inventories synced
        socket.on(
            ReceiverEventName.InventoriesSynced,
            ({ data }: InventorySyncedMessage) => {
                ExternalEventEmitter.emit(ExternalEventName.InventoriesSynced, data)
            }
        )

        socket.on(
            ReceiverEventName.PlacedItemsSynced,
            ({ data }: PlacedItemsSyncedMessage) => {
                ExternalEventEmitter.emit(ExternalEventName.PlacedItemsSynced, data)
            }
        )

        ExternalEventEmitter.on(ExternalEventName.RequestReturn, () => {
            socket.emit(EmitterEventName.Return)
        })

        return () => {
            socket.off(ReceiverEventName.PlacedItemsSynced)
            socket.off(ReceiverEventName.ActionEmitted)
            socket.off(ReceiverEventName.UserSynced)
            socket.off(ReceiverEventName.InventoriesSynced)
            socket.off(ReceiverEventName.PlacedItemsSynced)
        }
    }, [socket])
}
