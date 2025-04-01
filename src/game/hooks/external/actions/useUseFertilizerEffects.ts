import { EmitterEventName, UseFertilizerMessage, useWs } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"
import { GAMEPLAY_IO } from "@/app/constants"

export const useUseFertilizerEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(GAMEPLAY_IO)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestUseFertilizer,
            async (message: UseFertilizerMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UseFertilizer, message)
            })
    
        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestUseFertilizer
            )
        }
    }, [socket])
}