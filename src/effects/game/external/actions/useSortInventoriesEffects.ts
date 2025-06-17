import { useSingletonHook, useWs, EmitterEventName, WS } from "@/singleton"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

export const useSortInventoriesEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestSortInventories,
            async () => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.SortInventories)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestSortInventories
            )
        }
    }, [socket])
}
