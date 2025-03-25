import { GAMEPLAY_IO } from "@/app/constants"
import { useGameplayIo, EmitterEventName, HarvestAnimalMessage } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useHarvestAnimalEffects = () => {
    const { socket } =
               useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)  
    
    useEffect(() => {
        EventBus.on(EventName.RequestHarvestAnimal, async (message: HarvestAnimalMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.HarvestAnimal, message)
        })
        
        return () => {
            EventBus.removeListener(EventName.RequestHarvestAnimal)
        }
    }, [socket])
}