import { GAMEPLAY_IO } from "@/app/constants"
import { useGameplayIo, HarvestFruitMessage, EmitterEventName } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useHarvestFruitEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    
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