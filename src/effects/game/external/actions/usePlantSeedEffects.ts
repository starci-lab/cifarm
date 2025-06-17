import {
    useSingletonHook,
    useWs,
    EmitterEventName,
    WS,
    PlantSeedMessage,
} from "@/singleton"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

export const usePlantSeedEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestPlantSeed,
            async (message: PlantSeedMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.PlantSeed, message)
            }
        )
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestPlantSeed)
        }
    }, [socket])
}
