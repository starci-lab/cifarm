import { useSingletonHook, useWs, EmitterEventName, WS } from "@/singleton"
import { MoveMessage } from "@/singleton"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useMoveEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestMove,
            async (message: MoveMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.Move, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestMove)
        }
    }, [socket])
}
