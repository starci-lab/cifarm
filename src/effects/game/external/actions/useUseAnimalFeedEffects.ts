import {
    useSingletonHook,
    useWs,
    EmitterEventName,
    WS,
    UseAnimalFeedMessage,
} from "@/singleton"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

export const useUseAnimalFeedEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestUseAnimalFeed,
            async (message: UseAnimalFeedMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UseAnimalFeed, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestUseAnimalFeed
            )
        }
    }, [socket])
}
