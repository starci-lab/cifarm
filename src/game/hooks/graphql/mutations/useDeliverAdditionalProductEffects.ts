import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import {
    DeliverAdditionalInventoryMessage,
    EmitterEventName,
    useGameplayIo,
} from "@/hooks"
import { GAMEPLAY_IO } from "@/app/constants"

export const useDeliverAdditionalInventoryEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)

    useEffect(() => {
        EventBus.on(
            EventName.RequestDeliverAdditionalInventory,
            async (message: DeliverAdditionalInventoryMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.DeliverAdditionalInventory, message)
            }
        )

        return () => {
            EventBus.removeListener(EventName.RequestDeliverAdditionalInventory)
        }
    }, [socket])
}
