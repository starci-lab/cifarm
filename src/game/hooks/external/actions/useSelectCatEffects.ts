import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { useWs, EmitterEventName, SelectCatMessage } from "@/hooks"
import { WS } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useSelectCatEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<
        ReturnType<typeof useWs>
    >(WS)
    
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.RequestSelectCat, async (message: SelectCatMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.SelectCat, message)
        })
        
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestSelectCat)
        }
    }, [socket])
}