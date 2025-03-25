import { GAMEPLAY_IO } from "@/app/constants"
import { useGameplayIo, HelpUseHerbicideMessage, EmitterEventName } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useHelpUseHerbicideEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpUseHerbicide, async (message: HelpUseHerbicideMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.HelpUseHerbicide, message)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpUseHerbicide)
        }
    }, [socket])
}