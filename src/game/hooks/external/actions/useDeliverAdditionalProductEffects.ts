import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import {
    DeliverAdditionalInventoryMessage,
    EmitterEventName,
    useWs,
} from "@/hooks"
import { WS } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useDeliverAdditionalInventoryEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestDeliverAdditionalInventory,
            async (message: DeliverAdditionalInventoryMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.DeliverAdditionalInventory, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestDeliverAdditionalInventory
            )
        }
    }, [socket])
}
