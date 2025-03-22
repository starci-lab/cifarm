import { GRAPHQL_MUTATION_HARVEST_CROP_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationHarvestCropSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"
import { HarvestCropRequest } from "@/modules/apollo"

export const useHarvestCropEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationHarvestCropSwrMutation>
      >(GRAPHQL_MUTATION_HARVEST_CROP_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHarvestCrop, async (message: HarvestCropRequest) => {
            let completedMessage: ResponsedMessage
            try {
                // Call API
                await swrMutation.trigger({ request: message })
                // return success
                completedMessage = {
                    success: true
                }  
            } catch (error) {
                console.error(error)
                // return error
                completedMessage = {
                    success: false
                }
            }
            // return the user to the phaser game
            EventBus.emit(EventName.HarvestCropResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHarvestCrop)
        }
    }, [swrMutation])
}