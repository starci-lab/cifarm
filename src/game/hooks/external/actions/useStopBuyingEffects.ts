import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { useWs, ReceiverEventName } from "@/hooks"
import { WS } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useStopBuyingEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<
        ReturnType<typeof useWs>
    >(WS)
    
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