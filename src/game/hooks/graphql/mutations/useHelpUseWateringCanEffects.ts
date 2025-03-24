import { GAMEPLAY_IO } from "@/app/constants"
import { useGameplayIo, HelpUseWateringCanMessage, EmitterEventName } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useHelpUseWateringCanEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpUseWateringCan, async (message: HelpUseWateringCanMessage) => {
            console.log("useHelpUseWateringCanEffects", message)
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.HelpUseWateringCan, message)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpUseWateringCan)
        }
    }, [socket])
}