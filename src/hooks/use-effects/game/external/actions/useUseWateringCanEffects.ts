import { EmitterEventName, ReceiverEventName, UseWateringCanMessage, useWs } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { WS } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useUseWateringCanEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        if (!socket) return
        socket?.on(ReceiverEventName.WateringCanUsed, (message: UseWateringCanMessage) => {
            ExternalEventEmitter.emit(ExternalEventName.WateringCanUsed, message)
        })
        
    }, [socket])

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestUseWateringCan,
            async (message: UseWateringCanMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UseWateringCan, message)
            }
        )
        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestUseWateringCan
            )
        }
    }, [socket])
}