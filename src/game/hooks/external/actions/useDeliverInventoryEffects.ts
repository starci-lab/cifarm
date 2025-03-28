import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import {
    DeliverInventoryMessage,
    EmitterEventName,
    useGameplayIo,
} from "@/hooks"
import { GAMEPLAY_IO } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useDeliverInventoryEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestDeliverInventory,
            async (message: DeliverInventoryMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.DeliverInventory, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestDeliverInventory
            )
        }
    }, [socket])
}
