import { GAMEPLAY_IO } from "@/app/constants"
import { BuyAnimalMessage, useGameplayIo } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import { EmitterEventName } from "@/hooks"

export const useBuyAnimalEffects = () => {
    const { socket } =
           useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    useEffect(() => {
        EventBus.on(EventName.RequestBuyAnimal, async (message: BuyAnimalMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.BuyAnimal, message)
        })
   
        return () => {
            EventBus.removeListener(EventName.RequestBuyAnimal)
        }
    }, [socket])
}