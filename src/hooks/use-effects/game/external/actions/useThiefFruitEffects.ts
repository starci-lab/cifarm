import { WS } from "@/app/(core)/constantsd"
import { useWs, ThiefFruitMessage, EmitterEventName } from "@/hooks"
import { useSingletonHook } from "@/singleton"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useThiefFruitEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)
    
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