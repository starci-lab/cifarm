import { WS } from "@/app/(core)/constants"
import { EmitterEventName, HarvestPlantMessage, useWs } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useHarvestPlantEffects = () => {
    const { socket } =
               useSingletonHook<ReturnType<typeof useWs>>(WS)
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.RequestHarvestPlant, async (message: HarvestPlantMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.HarvestPlant, message) 
        })
    
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestHarvestPlant)
        }
    }, [socket])
}