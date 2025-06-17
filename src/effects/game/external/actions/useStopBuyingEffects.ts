import { useSingletonHook, useWs, ReceiverEventName, WS } from "@/singleton"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

export const useStopBuyingEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        if (!socket) {
            return
        }
        socket.on(ReceiverEventName.StopBuying, () => {
            ExternalEventEmitter.emit(ExternalEventName.StopBuying)
        })

        return () => {
            socket.off(ReceiverEventName.StopBuying)
        }
    }, [socket])
}
