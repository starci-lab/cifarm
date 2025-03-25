import { EmitterEventName, UseWateringCanMessage, useGameplayIo } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import { GAMEPLAY_IO } from "@/app/constants"

export const useUseWateringCanEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)

    useEffect(() => {
        EventBus.on(
            EventName.RequestUseWateringCan,
            async (message: UseWateringCanMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UseWateringCan, message)
            }
        )
        return () => {
            EventBus.removeListener(EventName.RequestUseWateringCan)
        }
    }, [socket])
}