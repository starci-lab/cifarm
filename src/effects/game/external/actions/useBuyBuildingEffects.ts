import { WS } from "@/singleton"
import { useSingletonHook } from "@/singleton"
import { useEffect } from "react"
import { BuyBuildingMessage, EmitterEventName, useWs } from "@/singleton"
import { ExternalEventEmitter, ExternalEventName, } from "@/modules/event-emitter"

export const useBuyBuildingEffects = () => {

    const { socket } =
        useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestBuyBuilding,
            async (message: BuyBuildingMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.BuyBuilding, message)
            })

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestBuyBuilding)
        }
    }, [socket])
}
