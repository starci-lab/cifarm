import { GAMEPLAY_IO } from "@/app/constants"
import { useEffect } from "react"
import { BuyFruitMessage, useGameplayIo, EmitterEventName } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useBuyFruitEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestBuyFruit,
            async (message: BuyFruitMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.BuyFruit, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestBuyFruit
            )
        }
    }, [socket])
}
