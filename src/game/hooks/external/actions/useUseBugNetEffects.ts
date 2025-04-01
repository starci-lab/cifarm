import { GAMEPLAY_IO } from "@/app/constants"
import { useWs, UseBugNetMessage, EmitterEventName } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useUseBugNetEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(GAMEPLAY_IO)
    
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