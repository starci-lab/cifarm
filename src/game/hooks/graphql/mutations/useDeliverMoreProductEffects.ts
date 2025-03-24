import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import {
    DeliverMoreProductMessage,
    EmitterEventName,
    useGameplayIo,
} from "@/hooks"
import { GAMEPLAY_IO } from "@/app/constants"

export const useDeliverMoreProductEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)

    useEffect(() => {
        EventBus.on(
            EventName.RequestDeliverMoreProduct,
            async (message: DeliverMoreProductMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.DeliverMoreProduct, message)
            }
        )

        return () => {
            EventBus.removeListener(EventName.RequestDeliverMoreProduct)
        }
    }, [socket])
}
