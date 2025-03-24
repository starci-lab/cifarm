import { GAMEPLAY_IO } from "@/app/constants"
import { EmitterEventName, RetainInventoryMessage, useGameplayIo } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useRetainInventoryEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)

    useEffect(() => {
        EventBus.on(EventName.RequestRetainInventory, async (message: RetainInventoryMessage) => {
            if (!socket) {
                return
            }   
            socket.emit(EmitterEventName.RetainInventory, message)
        })

        return () => {
            EventBus.removeListener(EventName.RequestRetainInventory)
        }
    }, [socket])
}
