import { GAMEPLAY_IO } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import { BuyFruitMessage, useGameplayIo } from "@/hooks"
import { EmitterEventName } from "@/hooks/io/events"

export const useBuyFruitEffects = () => {
    const { socket } =
        useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    useEffect(() => {
        EventBus.on(EventName.RequestBuyFruit, async (message: BuyFruitMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.BuyFruit, message)
        })

        return () => {
            EventBus.removeListener(EventName.RequestBuyFruit)
        }
    }, [socket])
}
