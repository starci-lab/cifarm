import { useSingletonHook, useWs, EmitterEventName, WS } from "@/singleton"
import { HelpUsePesticideMessage } from "@/singleton"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

export const useHelpUsePesticideEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestHelpUsePesticide,
            async (message: HelpUsePesticideMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.HelpUsePesticide, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestHelpUsePesticide
            )
        }
    }, [socket])
}
