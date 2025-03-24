import { GAMEPLAY_IO } from "@/app/constants"
import { useGameplayIo, UseBugNetMessage, EmitterEventName } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useUseBugNetEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    
    useEffect(() => {
        EventBus.on(EventName.RequestUseBugNet, async (message: UseBugNetMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.UseBugNet, message)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUseBugNet)
        }
    }, [socket])
}