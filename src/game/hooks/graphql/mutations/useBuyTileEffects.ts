import { BuyTileMessage, EmitterEventName, useGameplayIo } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import { GAMEPLAY_IO } from "@/app/constants"

export const useBuyTileEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    useEffect(() => {
        EventBus.on(
            EventName.RequestBuyTile,
            async (message: BuyTileMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.BuyTile, message)
            }
        )
    
        return () => {
            EventBus.removeListener(EventName.RequestBuySupplies)
        }
    }, [socket])
}