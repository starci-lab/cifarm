import { GAMEPLAY_IO } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import { BuyBuildingMessage, useGameplayIo } from "@/hooks"
import { EmitterEventName } from "@/hooks/io/events"

export const useBuyBuildingEffects = () => {
    const { socket } =
        useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    useEffect(() => {
        EventBus.on(EventName.RequestBuyBuilding, async (message: BuyBuildingMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.BuyBuilding, message)
        })

        return () => {
            EventBus.removeListener(EventName.RequestBuyBuilding)
        }
    }, [socket])
}
