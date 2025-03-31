import { GAMEPLAY_IO } from "@/app/constants"
import {
    BuyAnimalMessage,
    useGameplayIo,
    EmitterEventName,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useBuyAnimalEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)

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
