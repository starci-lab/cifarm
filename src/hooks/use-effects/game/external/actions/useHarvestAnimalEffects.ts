import { WS } from "@/app/(core)/constants"
import { useWs, EmitterEventName, HarvestAnimalMessage } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useHarvestAnimalEffects = () => {
    const { socket } =
               useSingletonHook<ReturnType<typeof useWs>>(WS)  
    
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