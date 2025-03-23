import { GAMEPLAY_IO } from "@/app/constants"
import { EmitterEventName, HarvestPlantMessage, useGameplayIo } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useHarvestPlantEffects = () => {
    const { socket } =
               useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    useEffect(() => {
        EventBus.on(EventName.RequestHarvestPlant, async (message: HarvestPlantMessage) => {
            if (!socket) {
                return
            }
            console.log("useHarvestPlantEffects")
            socket.emit(EmitterEventName.HarvestPlant, message) 
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHarvestPlant)
        }
    }, [socket])
}