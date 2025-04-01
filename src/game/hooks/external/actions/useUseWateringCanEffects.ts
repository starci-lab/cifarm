import { EmitterEventName, UseWateringCanMessage, useWs } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { GAMEPLAY_IO } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useUseWateringCanEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(GAMEPLAY_IO)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestUseWateringCan,
            async (message: UseWateringCanMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UseWateringCan, message)
            }
        )
        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestUseWateringCan
            )
        }
    }, [socket])
}