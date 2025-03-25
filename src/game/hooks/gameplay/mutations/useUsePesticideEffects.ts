import { GAMEPLAY_IO } from "@/app/constants"
import { EmitterEventName, useGameplayIo, UsePesticideMessage } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useUsePesticideEffects = () => {
    const { socket } =
               useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    useEffect(() => {
        EventBus.on(EventName.RequestUsePesticide, async (message: UsePesticideMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.UsePesticide, message) 
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUsePesticide)
        }
    }, [socket])
}