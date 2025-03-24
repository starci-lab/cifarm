import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import {
    DeliverInventoryMessage,
    EmitterEventName,
    useGameplayIo,
} from "@/hooks"
import { GAMEPLAY_IO } from "@/app/constants"

export const useDeliverInventoryEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)

    useEffect(() => {
        EventBus.on(
            EventName.RequestDeliverInventory,
            async (message: DeliverInventoryMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.DeliverInventory, message)
            }
        )

        return () => {
            EventBus.removeListener(EventName.RequestDeliverInventory)
        }
    }, [socket])
}
