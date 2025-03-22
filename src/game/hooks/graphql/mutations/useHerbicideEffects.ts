import { GRAPHQL_MUTATION_USE_HERBICIDE_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationHelpUseHerbicideSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"
import { HelpUseHerbicideRequest } from "@/modules/apollo"

export const useUseHerbicideEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationHelpUseHerbicideSwrMutation>
      >(GRAPHQL_MUTATION_USE_HERBICIDE_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestUseHerbicide, async (message: HelpUseHerbicideRequest) => {
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
            EventBus.emit(EventName.UseHerbicideResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUseHerbicide)
        }
    }, [swrMutation])
}