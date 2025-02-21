import { API_HARVEST_CROP_SWR_MUTATION } from "@/app/constants"
import { useApiHarvestCropSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { HarvestCropRequest } from "@/modules/axios"

export const useHarvestCropEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiHarvestCropSwrMutation>
      >(API_HARVEST_CROP_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHarvestCrop, async (message: HarvestCropRequest) => {
            const response = await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.HarvestCropCompleted, response.data)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHarvestCrop)
        }
    }, [swrMutation])
}