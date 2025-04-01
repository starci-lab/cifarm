import { GAMEPLAY_IO } from "@/app/constants"
import { PlantSeedMessage, useWs } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EmitterEventName } from "@/hooks"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const usePlantSeedEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(GAMEPLAY_IO)

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
