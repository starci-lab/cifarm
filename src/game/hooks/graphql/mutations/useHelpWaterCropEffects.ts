import { GRAPHQL_MUTATION_HELP_WATER_CROP_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationHelpWaterCropSwrMutation } from "@/hooks"
import { HelpUsePesticideRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"

export const useHelpWaterCropEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationHelpWaterCropSwrMutation>
      >(GRAPHQL_MUTATION_HELP_WATER_CROP_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpWaterCrop, async (message: HelpUsePesticideRequest) => {
            let completedMessage: ResponsedMessage
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
            EventBus.emit(EventName.HelpWaterCropResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpWaterCrop)
        }
    }, [swrMutation])
}