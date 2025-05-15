import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import {
    DeliverInventoryMessage,
    EmitterEventName,
    useWs,
} from "@/hooks"
import { WS } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useDeliverInventoryEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestDeliverInventory,
            async (message: DeliverInventoryMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.DeliverInventory, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestDeliverInventory
            )
        }
    }, [socket])
}
