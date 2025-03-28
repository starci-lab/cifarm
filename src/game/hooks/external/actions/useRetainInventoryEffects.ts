import { GAMEPLAY_IO } from "@/app/constants"
import {
    EmitterEventName,
    RetainInventoryMessage,
    useGameplayIo,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useRetainInventoryEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestRetainInventory,
            async (message: RetainInventoryMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.RetainInventory, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestRetainInventory
            )
        }
    }, [socket])
}
