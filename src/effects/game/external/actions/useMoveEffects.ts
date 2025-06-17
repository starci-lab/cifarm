import { WS } from "@/singleton"
import { EmitterEventName, MoveMessage, useWs } from "@/hooks"
import { useSingletonHook } from "@/singleton"
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
