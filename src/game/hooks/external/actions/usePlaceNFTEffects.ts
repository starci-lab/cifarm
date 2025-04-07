import { WS } from "@/app/constants"
import { PlaceNFTMessage, useWs } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EmitterEventName } from "@/hooks"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const usePlaceNFTEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)

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
