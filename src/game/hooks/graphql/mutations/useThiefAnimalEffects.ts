import { GAMEPLAY_IO } from "@/app/constants"
import { useGameplayIo, ThiefAnimalMessage, EmitterEventName } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useThiefAnimalEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    
    useEffect(() => {
        EventBus.on(EventName.RequestThiefAnimal, async (message: ThiefAnimalMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.ThiefAnimal, message)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestThiefAnimal)
        }
    }, [socket])
}