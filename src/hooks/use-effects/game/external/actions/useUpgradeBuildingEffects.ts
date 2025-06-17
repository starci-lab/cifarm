import { WS } from "@/app/(core)/constantsd"
import { useSingletonHook } from "@/singleton"
import { useEffect } from "react"
import { EmitterEventName, UpgradeBuildingMessage, useWs } from "@/hooks"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useUpgradeBuildingEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<
        ReturnType<typeof useWs>
    >(WS)
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