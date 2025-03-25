import { GAMEPLAY_IO } from "@/app/constants"
import { EmitterEventName, MoveMessage, useGameplayIo } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useMoveEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)  
    
    useEffect(() => {
        EventBus.on(EventName.RequestMove, async (message: MoveMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.Move, message) 
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestMove)
        }
    }, [socket])
}