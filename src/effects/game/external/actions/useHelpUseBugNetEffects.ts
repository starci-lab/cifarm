import { useSingletonHook } from "@/singleton"
import { useEffect } from "react"
import { useWs, EmitterEventName } from "@/hooks"
import { WS } from "@/singleton"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useHelpUseBugNetEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<
        ReturnType<typeof useWs>
    >(WS)
    
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.RequestHelpUseBugNet, async () => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.HelpUseBugNet)
        })
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestHelpUseBugNet)
        }
    }, [socket])
}