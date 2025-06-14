import { WS } from "@/app/(core)/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"
import { EmitterEventName } from "@/hooks"
import { useWs } from "@/hooks"

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
            ExternalEventEmitter.removeListener(ExternalEventName.RequestSortInventories)
        }
    }, [socket])
}