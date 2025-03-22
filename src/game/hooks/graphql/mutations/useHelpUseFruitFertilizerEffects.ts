import { GRAPHQL_MUTATION_HELP_USE_FRUIT_FERTILIZER_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationHelpUseFruitFertilizerSwrMutation } from "@/hooks"
import { HelpUseFruitFertilizerRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"

export const useHelpUseFruitFertilizerEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationHelpUseFruitFertilizerSwrMutation>
      >(GRAPHQL_MUTATION_HELP_USE_FRUIT_FERTILIZER_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpUseFruitFertilizer, async (message: HelpUseFruitFertilizerRequest) => {
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
            EventBus.emit(EventName.HelpUseFruitFertilizerResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpUseFruitFertilizer)
        }
    }, [swrMutation])
}