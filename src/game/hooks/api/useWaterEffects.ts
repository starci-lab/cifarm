import { API_WATER_CROP_SWR_MUTATION } from "@/app/constants"
import { useApiWaterCropSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { WaterRequest } from "@/modules/axios"

export const useWaterEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiWaterCropSwrMutation>
      >(API_WATER_CROP_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestWaterCrop, async (message: WaterRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.WaterCropCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestWaterCrop)
        }
    }, [swrMutation])
}