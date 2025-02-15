import { API_WATER_SWR_MUTATION } from "@/app/constants"
import { useApiWaterSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { WaterRequest } from "@/modules/axios"

export const useWaterEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiWaterSwrMutation>
      >(API_WATER_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestWater, async (message: WaterRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.WaterCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestWater)
        }
    }, [swrMutation])
}