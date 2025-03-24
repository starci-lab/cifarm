import { GAMEPLAY_IO } from "@/app/constants"
import { useGameplayIo, HelpUsePesticideMessage, EmitterEventName } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useHelpUsePesticideEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpUsePesticide, async (message: HelpUsePesticideMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.HelpUsePesticide, message)
        })  
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpUsePesticide)
        }
    }, [socket])
}