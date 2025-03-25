import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import { useGameplayIo } from "@/hooks"
import { GAMEPLAY_IO } from "@/app/constants"

export const useHelpUseBugNetEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<
        ReturnType<typeof useGameplayIo>
    >(GAMEPLAY_IO)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpUseBugNet, async () => {
            if (!socket) {
                return
            }
            socket.emit(EventName.RequestHelpUseBugNet)
        })
        return () => {
            EventBus.removeListener(EventName.RequestHelpUseBugNet)
        }
    }, [socket])
}