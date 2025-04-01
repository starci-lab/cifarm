import { GAMEPLAY_IO } from "@/app/constants"
import { useWs, EmitterEventName, UseAnimalFeedMessage } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useUseAnimalFeedEffects = () => {
    const { socket } =
               useSingletonHook<ReturnType<typeof useWs>>(GAMEPLAY_IO)
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestUseAnimalFeed,
            async (message: UseAnimalFeedMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UseAnimalFeed, message) 
            })
    
        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestUseAnimalFeed
            )
        }
    }, [socket])
}