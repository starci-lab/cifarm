import { WS } from "@/app/(core)/constantsd"
import {
    BuyAnimalMessage,
    useWs,
    EmitterEventName,
} from "@/hooks"
import { useSingletonHook } from "@/singleton"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useBuyAnimalEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestBuyAnimal,
            async (message: BuyAnimalMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.BuyAnimal, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestBuyAnimal)
        }
    }, [socket])
}
