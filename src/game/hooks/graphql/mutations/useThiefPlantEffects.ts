import { GAMEPLAY_IO } from "@/app/constants"
import { useGameplayIo, ThiefPlantMessage, EmitterEventName } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useThiefPlantEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    
    useEffect(() => {
        EventBus.on(EventName.RequestThiefPlant, async (message: ThiefPlantMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.ThiefPlant, message)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestThiefPlant)
        }
    }, [socket])
}