import { GAMEPLAY_IO } from "@/app/constants"
import { EmitterEventName, useWs, UsePesticideMessage } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useUsePesticideEffects = () => {
    const { socket } =
               useSingletonHook<ReturnType<typeof useWs>>(GAMEPLAY_IO)
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