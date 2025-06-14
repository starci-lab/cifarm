import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import {
    DeliverInventoriesMessage,
    EmitterEventName,
    useWs,
} from "@/hooks"
import { WS } from "@/app/(core)/constants"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useDeliverInventoriesEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestDeliverInventories,
            async (message: DeliverInventoriesMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.DeliverInventories, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestDeliverInventories
            )
        }
    }, [socket])
}
