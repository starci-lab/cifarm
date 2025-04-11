import { WS } from "@/app/constants"
import {
    EmitterEventName,
    RetrieveInventoryMessage,
    useWs,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useRetrieveInventoryEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestRetrieveInventory,
            async (message: RetrieveInventoryMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.RetrieveInventory, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestRetrieveInventory
            )
        }
    }, [socket])
}
