import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { useWs, EmitterEventName, SelectDogMessage } from "@/hooks"
import { WS } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useSelectDogEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<
        ReturnType<typeof useWs>
    >(WS)
    
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.RequestSelectDog, async (message: SelectDogMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.SelectDog, message)
        })
        
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestSelectDog)
        }
    }, [socket])
}