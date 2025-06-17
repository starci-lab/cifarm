import {
    BuyTileMessage,
    EmitterEventName,
    useWs,
    useSingletonHook,
    WS,
} from "@/singleton"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

export const useBuyTileEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestBuyTile,
            async (message: BuyTileMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.BuyTile, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestBuyTile)
        }
    }, [socket])
}
