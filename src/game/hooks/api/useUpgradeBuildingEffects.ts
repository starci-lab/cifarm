import { API_UPGRADE_BUILDING_SWR_MUTATION } from "@/app/constants"
import { useApiUpgradeBuildingSwrMutation } from "@/hooks"
import { UpgradeBuildingRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useUpgradeBuildingEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiUpgradeBuildingSwrMutation>
      >(API_UPGRADE_BUILDING_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestUpgradeBuilding, async (message: UpgradeBuildingRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.UpgradeBuildingCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUpgradeBuilding)
        }
    }, [swrMutation])
}