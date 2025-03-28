import { GAMEPLAY_IO } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EmitterEventName, useGameplayIo } from "@/hooks"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useUpgradeBuildingEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<
        ReturnType<typeof useGameplayIo>
    >(GAMEPLAY_IO)
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestUpgradeBuilding,
            async () => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UpgradeBuilding)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestUpgradeBuilding
            )
        }
    }, [socket])
}