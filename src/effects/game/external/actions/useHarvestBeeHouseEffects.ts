import {
    EmitterEventName,
    HarvestBeeHouseMessage,
    useSingletonHook,
    useWs,
    WS,
} from "@/singleton"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

export const useHarvestBeeHouseEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestHarvestBeeHouse,
            async (message: HarvestBeeHouseMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.HarvestBeeHouse, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestHarvestBeeHouse
            )
        }
    }, [socket])
}
