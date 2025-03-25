import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import { GAMEPLAY_IO } from "@/app/constants"
import { BuySuppliesMessage, useGameplayIo } from "@/hooks"
import { EmitterEventName, ReceiverEventName } from "@/hooks"

export const useBuySuppliesEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    useEffect(() => {
        EventBus.on(
            EventName.RequestBuySupplies,
            async (message: BuySuppliesMessage) => {
                if (!socket) {
                    return
                }
                socket.on(ReceiverEventName.SuppliesBought, () => {
                    EventBus.emit(EventName.BuySuppliesResponsed)
                })
                socket.emit(EmitterEventName.BuySupplies, message)
            }
        )

        return () => {
            socket?.off(ReceiverEventName.SuppliesBought)
            EventBus.removeListener(EventName.RequestBuySupplies)
        }
    }, [socket])
}
