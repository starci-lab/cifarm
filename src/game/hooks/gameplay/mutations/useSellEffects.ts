import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import { useGameplayIo } from "@/hooks"
import { GAMEPLAY_IO } from "@/app/constants"

export const useSellEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<
        ReturnType<typeof useGameplayIo>
    >(GAMEPLAY_IO)
    
    useEffect(() => {
        EventBus.on(EventName.RequestSell, async () => {
            if (!socket) {
                return
            }
            socket.emit(EventName.RequestSell)
        })
        
        return () => {
            EventBus.removeListener(EventName.RequestSell)
        }
    }, [socket])
}