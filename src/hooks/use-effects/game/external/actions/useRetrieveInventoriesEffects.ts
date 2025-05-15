import { WS } from "@/app/constants"
import {
    EmitterEventName,
    RetrieveInventoriesMessage,
    useWs,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useRetrieveInventoriesEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestRetrieveInventories,
            async (message: RetrieveInventoriesMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.RetrieveInventories, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestRetrieveInventories
            )
        }
    }, [socket])
}
