import { GRAPHQL_MUTATION_USE_WATERING_CAN_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationUseWateringCanSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"
import { UseWateringCanRequest } from "@/modules/apollo"

export const useWaterCropEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationUseWateringCanSwrMutation>
      >(GRAPHQL_MUTATION_USE_WATERING_CAN_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestUseWateringCan, async (message: UseWateringCanRequest) => {
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
            EventBus.emit(EventName.UseWateringCanResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUseWateringCan)
        }
    }, [swrMutation])
}