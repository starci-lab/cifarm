import { WS } from "@/app/constants"
import { useWs, EmitterEventName, MoveInventoryMessage } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

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
            ExternalEventEmitter.removeListener(ExternalEventName.RequestMoveInventory)
        }
    }, [socket])
}