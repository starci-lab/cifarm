import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { useGameplayIo, ReceiverEventName } from "@/hooks"
import { GAMEPLAY_IO } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useStopBuyingEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<
        ReturnType<typeof useGameplayIo>
    >(GAMEPLAY_IO)
    
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