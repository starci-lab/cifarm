import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { useGameplayIo, EmitterEventName } from "@/hooks"
import { GAMEPLAY_IO } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useHelpUseBugNetEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<
        ReturnType<typeof useGameplayIo>
    >(GAMEPLAY_IO)
    
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.RequestHelpUseBugNet, async () => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.HelpUseBugNet)
        })
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestHelpUseBugNet)
        }
    }, [socket])
}