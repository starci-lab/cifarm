import {
    useSingletonHook,
    useWs,
    EmitterEventName,
    WS,
    SellMessage,
} from "@/singleton"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

export const useSellEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestSell,
            async (message: SellMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.Sell, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestSell)
        }
    }, [socket])
}
