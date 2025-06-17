import { WS } from "@/singleton"
import { useWs, HarvestFruitMessage, EmitterEventName } from "@/hooks"
import { useSingletonHook } from "@/singleton"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useHarvestFruitEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)
    
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.RequestHarvestFruit, async (message: HarvestFruitMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.HarvestFruit, message)
        })
    
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestHarvestFruit)
        }
    }, [socket])
}