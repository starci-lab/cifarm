import {
    useSingletonHook,
    useWs,
    EmitterEventName,
    WS,
    UseFertilizerMessage,
} from "@/singleton"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

export const useUseFertilizerEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestUseFertilizer,
            async (message: UseFertilizerMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UseFertilizer, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestUseFertilizer
            )
        }
    }, [socket])
}
