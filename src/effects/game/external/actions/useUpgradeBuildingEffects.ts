import {
    useSingletonHook,
    useWs,
    EmitterEventName,
    WS,
    UpgradeBuildingMessage,
} from "@/singleton"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

export const useUpgradeBuildingEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestUpgradeBuilding,
            async (message: UpgradeBuildingMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UpgradeBuilding, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestUpgradeBuilding
            )
        }
    }, [socket])
}
