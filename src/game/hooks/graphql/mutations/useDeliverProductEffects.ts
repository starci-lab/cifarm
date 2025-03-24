import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import {
    DeliverProductMessage,
    EmitterEventName,
    useGameplayIo,
} from "@/hooks"
import { GAMEPLAY_IO } from "@/app/constants"

export const useDeliverProductEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)

    useEffect(() => {
        EventBus.on(
            EventName.RequestDeliverProduct,
            async (message: DeliverProductMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.DeliverProduct, message)
            }
        )

        return () => {
            EventBus.removeListener(EventName.RequestDeliverProduct)
        }
    }, [socket])
}
