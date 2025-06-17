import {
    useSingletonHook,
    useWs,
    EmitterEventName,
    WS,
    UseFruitFertilizerMessage,
} from "@/singleton"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

export const useUseFruitFertilizerEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestUseFruitFertilizer,
            async (message: UseFruitFertilizerMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UseFruitFertilizer, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestUseFruitFertilizer
            )
        }
    }, [socket])
}
