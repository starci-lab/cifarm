import { WS } from "@/singleton"
import { EmitterEventName, useWs, UsePesticideMessage } from "@/hooks"
import { useSingletonHook } from "@/singleton"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useUsePesticideEffects = () => {
    const { socket } =
               useSingletonHook<ReturnType<typeof useWs>>(WS)
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestUsePesticide,
            async (message: UsePesticideMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UsePesticide, message) 
            })
    
        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestUsePesticide
            )
        }
    }, [socket])
}