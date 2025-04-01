import { GAMEPLAY_IO } from "@/app/constants"
import {
    useWs,
    HelpUseWateringCanMessage,
    EmitterEventName,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useHelpUseWateringCanEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(GAMEPLAY_IO)

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
