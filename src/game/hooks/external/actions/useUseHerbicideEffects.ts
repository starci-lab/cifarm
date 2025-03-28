import { GAMEPLAY_IO } from "@/app/constants"
import { EmitterEventName, useGameplayIo, UseHerbicideMessage } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useUseHerbicideEffects = () => {
    const { socket } =
               useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)  
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestUseHerbicide,
            async (message: UseHerbicideMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UseHerbicide, message) 
            })
    
        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestUseHerbicide
            )
        }
    }, [socket])
}