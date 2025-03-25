import { GAMEPLAY_IO } from "@/app/constants"
import { useGameplayIo, EmitterEventName, UseAnimalFeedMessage } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useUseAnimalFeedEffects = () => {
    const { socket } =
               useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    useEffect(() => {
        EventBus.on(EventName.RequestUseAnimalFeed, async (message: UseAnimalFeedMessage) => {
            if (!socket) {  
                return
            }
            socket.emit(EmitterEventName.UseAnimalFeed, message) 
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUseAnimalFeed)
        }
    }, [socket])
}