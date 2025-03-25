import { EmitterEventName, UseFertilizerMessage, useGameplayIo } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import { GAMEPLAY_IO } from "@/app/constants"

export const useUseFertilizerEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)

    useEffect(() => {
        EventBus.on(EventName.RequestUseFertilizer, async (message: UseFertilizerMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.UseFertilizer, message)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUseFertilizer)
        }
    }, [socket])
}