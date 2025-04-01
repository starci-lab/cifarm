import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { useWs, EmitterEventName, SellMessage } from "@/hooks"
import { GAMEPLAY_IO } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useSellEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<
        ReturnType<typeof useWs>
    >(GAMEPLAY_IO)
    
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.RequestSell, async (message: SellMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.Sell, message)
        })
        
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestSell)
        }
    }, [socket])
}