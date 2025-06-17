import { useSingletonHook, useWs, EmitterEventName, WS } from "@/singleton"
import { HelpUseWateringCanMessage } from "@/singleton"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

export const useHelpUseWateringCanEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestHelpUseWateringCan,
            async (message: HelpUseWateringCanMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.HelpUseWateringCan, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestHelpUseWateringCan
            )
        }
    }, [socket])
}
