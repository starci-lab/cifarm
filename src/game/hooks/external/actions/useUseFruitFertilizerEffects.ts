import { useWs, UseFruitFertilizerMessage } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { GAMEPLAY_IO } from "@/app/constants"
import { EmitterEventName } from "@/hooks"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"


export const useUseFruitFertilizerEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(GAMEPLAY_IO)

    useEffect(()    => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestUseFruitFertilizer,
            async (message: UseFruitFertilizerMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UseFruitFertilizer, message)
            })
    
        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestUseFruitFertilizer
            )
        }
    }, [socket])
}