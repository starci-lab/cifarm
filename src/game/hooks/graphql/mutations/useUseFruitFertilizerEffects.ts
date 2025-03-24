import { useGameplayIo, UseFruitFertilizerMessage } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import { GAMEPLAY_IO } from "@/app/constants"
import { EmitterEventName } from "@/hooks/io/emitter"


export const useUseFruitFertilizerEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)

    useEffect(() => {
        EventBus.on(EventName.RequestUseFruitFertilizer, async (message: UseFruitFertilizerMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.UseFruitFertilizer, message)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUseFruitFertilizer)
        }
    }, [socket])
}