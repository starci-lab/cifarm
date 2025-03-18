import { GRAPHQL_MUTATION_WATER_CROP_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationWaterCropSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"
import { WaterCropRequest } from "@/modules/apollo"

export const useWaterCropEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationWaterCropSwrMutation>
      >(GRAPHQL_MUTATION_WATER_CROP_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestWaterCrop, async (message: WaterCropRequest) => {
            let completedMessage: CompletedMessage
            try {
                await swrMutation.trigger({ request: message })
                completedMessage = {
                    success: true,
                }
            } catch (error) {
                console.error(error)
                completedMessage = {
                    success: false,
                }
            }
            // return the user to the phaser game
            EventBus.emit(EventName.WaterCropCompleted, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestWaterCrop)
        }
    }, [swrMutation])
}