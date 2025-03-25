import { GAMEPLAY_IO } from "@/app/constants"
import { useGameplayIo, ThiefFruitMessage, EmitterEventName } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useThiefFruitEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    
    useEffect(() => {
        EventBus.on(EventName.RequestThiefFruit, async (message: ThiefFruitMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.ThiefFruit, message)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestThiefFruit)
        }
    }, [socket])
}