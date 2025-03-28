import { GAMEPLAY_IO } from "@/app/constants"
import { useGameplayIo, ThiefFruitMessage, EmitterEventName } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useThiefFruitEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestThiefFruit,
            async (message: ThiefFruitMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.ThiefFruit, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestThiefFruit)
        }
    }, [socket])
}