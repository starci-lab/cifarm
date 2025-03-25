import { GAMEPLAY_IO } from "@/app/constants"
import { PlantSeedMessage, useGameplayIo } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import { EmitterEventName } from "@/hooks"

export const usePlantSeedEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)

    useEffect(() => {
        EventBus.on(
            EventName.RequestPlantSeed,
            async (message: PlantSeedMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.PlantSeed, message)
            }
        )
        return () => {
            EventBus.removeListener(EventName.RequestPlantSeed)
        }
    }, [socket])
}
