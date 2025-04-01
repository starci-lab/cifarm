import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { GAMEPLAY_IO } from "@/app/constants"
import { BuySuppliesMessage, useWs } from "@/hooks"
import { EmitterEventName, ReceiverEventName } from "@/hooks"
import { ExternalEventName } from "@/game/events"
import { ExternalEventEmitter } from "@/game/events"

export const useBuySuppliesEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(GAMEPLAY_IO)

    useEffect(() => {
        socket?.on(ReceiverEventName.SuppliesBought, () => {
            ExternalEventEmitter.emit(ExternalEventName.BuySuppliesResponsed)
        })
        return () => {
            socket?.off(ReceiverEventName.SuppliesBought)
        }
    }, [socket])
    
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestBuySupplies,
            async (message: BuySuppliesMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.BuySupplies, message)
            }
        )

        return () => {
            socket?.off(ReceiverEventName.SuppliesBought)
            ExternalEventEmitter.removeListener(ExternalEventName.RequestBuySupplies)
        }
    }, [socket])
}
