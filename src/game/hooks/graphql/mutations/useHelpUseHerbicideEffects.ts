import { GRAPHQL_MUTATION_HELP_USE_PESTICIDE_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationHelpUsePesticideSwrMutation } from "@/hooks"
import { HelpUseHerbicideRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"

export const useHelpUseHerbicideEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationHelpUsePesticideSwrMutation>
      >(GRAPHQL_MUTATION_HELP_USE_PESTICIDE_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpUseHerbicide, async (message: HelpUseHerbicideRequest) => {
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
            EventBus.emit(EventName.HelpUseHerbicideCompleted, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpUseHerbicide)
        }
    }, [swrMutation])
}