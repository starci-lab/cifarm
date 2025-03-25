import { GAMEPLAY_IO } from "@/app/constants"
import { EmitterEventName, useGameplayIo, UseHerbicideMessage } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useUseHerbicideEffects = () => {
    const { socket } =
               useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)  
    useEffect(() => {
        EventBus.on(EventName.RequestUseHerbicide, async (message: UseHerbicideMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.UseHerbicide, message) 
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUseHerbicide)
        }
    }, [socket])
}