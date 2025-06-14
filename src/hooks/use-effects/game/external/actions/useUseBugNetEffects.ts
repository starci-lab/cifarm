import { WS } from "@/app/(core)/constants"
import { useWs, UseBugNetMessage, EmitterEventName } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useUseBugNetEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)
    
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestUseBugNet,
            async (message: UseBugNetMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UseBugNet, message)
            })
    
        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestUseBugNet
            )
        }
    }, [socket])
}