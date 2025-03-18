import { GRAPHQL_MUTATION_USE_FRUIT_FERTILIZER_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationUseFruitFertilizerSwrMutation } from "@/hooks"
import { UseFruitFertilizerRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"

export const useUseFruitFertilizerEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationUseFruitFertilizerSwrMutation>
      >(GRAPHQL_MUTATION_USE_FRUIT_FERTILIZER_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestUseFruitFertilizer, async (message: UseFruitFertilizerRequest) => {
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
            EventBus.emit(EventName.UseFruitFertilizerCompleted, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUseFruitFertilizer)
        }
    }, [swrMutation])
}