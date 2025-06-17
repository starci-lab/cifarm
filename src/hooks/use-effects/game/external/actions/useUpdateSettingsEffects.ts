import { useSingletonHook } from "@/singleton"
import { useEffect } from "react"
import {
    EmitterEventName,
    UpdateSettingsMessage,
    useWs,
} from "@/hooks"
import { WS } from "@/app/(core)/constantsd"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useUpdateSettingsEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestUpdateSettings,
            async (message: UpdateSettingsMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UpdateSettings, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestUpdateSettings
            )
        }
    }, [socket])
}
