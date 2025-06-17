import { WS } from "@/singleton"
import { EmitterEventName, useWs} from "@/hooks"
import { useSingletonHook } from "@/singleton"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"
import { ForceSyncPlacedItemsMessage, ReceiverEventName } from "@/hooks"

export const useForceSyncPlacedItemsEffects = () => {
    const { socket } =
               useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        if (!socket) {
            return
        }
        socket.on(ReceiverEventName.ForceSyncPlacedItemsResponsed, () => {
            ExternalEventEmitter.emit(ExternalEventName.ForceSyncPlacedItemsResponsed)
        })
    }, [socket])

    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.RequestForceSyncPlacedItems, ({ ids }: ForceSyncPlacedItemsMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.ForceSyncPlacedItems, {
                ids,
            })
        })
        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestForceSyncPlacedItems
            )
        }
    }, [socket])
}