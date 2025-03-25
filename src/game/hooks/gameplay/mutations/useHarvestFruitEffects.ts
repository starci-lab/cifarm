import { GAMEPLAY_IO } from "@/app/constants"
import { useGameplayIo, HarvestFruitMessage, EmitterEventName } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useHarvestFruitEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHarvestFruit, async (message: HarvestFruitMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.HarvestFruit, message)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHarvestFruit)
        }
    }, [socket])
}