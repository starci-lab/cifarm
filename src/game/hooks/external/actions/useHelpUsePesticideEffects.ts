import { WS } from "@/app/constants"
import {
    useWs,
    HelpUsePesticideMessage,
    EmitterEventName,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useHelpUsePesticideEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)

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
