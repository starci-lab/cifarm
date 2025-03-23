import { GRAPHQL_MUTATION_HELP_USE_WATERING_CAN_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationHelpUseWateringCanSwrMutation } from "@/hooks"
import { HelpUseWateringCanRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"

export const useHelpUseWateringCanEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationHelpUseWateringCanSwrMutation>
        >(GRAPHQL_MUTATION_HELP_USE_WATERING_CAN_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpUseWateringCan, async (message: HelpUseWateringCanRequest) => {
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
            EventBus.emit(EventName.HelpUseWateringCanResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpUseWateringCan)
        }
    }, [swrMutation])
}