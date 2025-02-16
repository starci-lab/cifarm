import { API_CONSTRUCT_BUILDING_SWR_MUTATION } from "@/app/constants"
import { ConstructBuildingRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { useApiConstructBuildingSwrMutation } from "@/hooks"

export const useConstructBuildingEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiConstructBuildingSwrMutation>
      >(API_CONSTRUCT_BUILDING_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestConstructBuilding, async (message: ConstructBuildingRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.ConstructBuildingCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestConstructBuilding)
        }
    }, [swrMutation])
}