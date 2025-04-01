import { GAMEPLAY_IO } from "@/app/constants"
import { useWs, EmitterEventName, HarvestAnimalMessage } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useHarvestAnimalEffects = () => {
    const { socket } =
               useSingletonHook<ReturnType<typeof useWs>>(GAMEPLAY_IO)  
    
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.RequestHarvestAnimal, async (message: HarvestAnimalMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.HarvestAnimal, message)
        })
        
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestHarvestAnimal)
        }
    }, [socket])
}