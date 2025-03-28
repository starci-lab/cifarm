import { GAMEPLAY_IO } from "@/app/constants"
import { useGameplayIo, ThiefPlantMessage, EmitterEventName } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useThiefPlantEffects = () => {
    //authentication useEffect
    const { socket } =
    useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestThiefPlant,
            async (message: ThiefPlantMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.ThiefPlant, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestThiefPlant)
        }
    }, [socket])
}
