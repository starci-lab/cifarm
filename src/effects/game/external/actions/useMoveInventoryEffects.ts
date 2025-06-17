import { useSingletonHook, useWs, EmitterEventName, WS } from "@/singleton"
import { MoveInventoryMessage } from "@/singleton"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

export const useMoveInventoryEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestMoveInventory,
            async (message: MoveInventoryMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.MoveInventory, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestMoveInventory
            )
        }
    }, [socket])
}
