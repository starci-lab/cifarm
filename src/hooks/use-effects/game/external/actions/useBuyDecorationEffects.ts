import { WS } from "@/app/(core)/constants"
import { useEffect } from "react"
import { useWs, EmitterEventName, BuyDecorationMessage } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useBuyDecorationEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)
    
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestBuyDecoration,
            async (message: BuyDecorationMessage) => {
                if (!socket) {
                    return
                }
                console.log("buy decoration", message)
                socket.emit(EmitterEventName.BuyDecoration, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestBuyDecoration
            )
        }
    }, [socket])
}
