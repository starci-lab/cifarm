import {
    useWs,
    EmitterEventName,
    BuyPetMessage,
    useSingletonHook,
    WS,
} from "@/singleton"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

export const useBuyPetEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestBuyPet,
            async (message: BuyPetMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.BuyPet, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestBuyPet)
        }
    }, [socket])
}
