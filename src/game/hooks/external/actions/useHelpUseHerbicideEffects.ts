import { WS } from "@/app/constants"
import {
    useWs,
    HelpUseHerbicideMessage,
    EmitterEventName,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useHelpUseHerbicideEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestHelpUseHerbicide,
            async (message: HelpUseHerbicideMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.HelpUseHerbicide, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestHelpUseHerbicide
            )
        }
    }, [socket])
}
