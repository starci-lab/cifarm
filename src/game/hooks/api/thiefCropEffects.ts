import { API_THIEF_CROP_SWR_MUTATION } from "@/app/constants"
import { useApiThiefCropSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { ThiefCropRequest } from "@/modules/axios"

export const useThiefCropEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiThiefCropSwrMutation>
      >(API_THIEF_CROP_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestThiefCrop, async (message: ThiefCropRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.ThiefCropCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestThiefCrop)
        }
    }, [swrMutation])
}