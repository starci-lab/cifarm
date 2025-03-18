import { GRAPHQL_MUTATION_USE_PESTICIDE_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationHelpUsePesticideSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"
import { HelpUsePesticideRequest } from "@/modules/apollo"

export const useUsePesticideEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationHelpUsePesticideSwrMutation>
      >(GRAPHQL_MUTATION_USE_PESTICIDE_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestUsePesticide, async (message: HelpUsePesticideRequest) => {
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
            EventBus.emit(EventName.UsePesticideCompleted, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUsePesticide)
        }
    }, [swrMutation])
}