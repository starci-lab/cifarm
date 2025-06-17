import { useSingletonHook, useWs, EmitterEventName, WS } from "@/singleton"
import { PlaceNFTMessage } from "@/singleton"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

export const usePlaceNFTEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestPlaceNFT,
            async (message: PlaceNFTMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.PlaceNFT, message)
            }
        )
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestPlaceNFT)
        }
    }, [socket])
}
