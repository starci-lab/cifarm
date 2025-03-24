import { GAMEPLAY_IO } from "@/app/constants"
import { EmitterEventName, RetainProductMessage, useGameplayIo } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useRetainProductEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)

    useEffect(() => {
        EventBus.on(EventName.RequestRetainProduct, async (message: RetainProductMessage) => {
            if (!socket) {
                return
            }   
            socket.emit(EmitterEventName.RetainProduct, message)
        })

        return () => {
            EventBus.removeListener(EventName.RequestRetainProduct)
        }
    }, [socket])
}
