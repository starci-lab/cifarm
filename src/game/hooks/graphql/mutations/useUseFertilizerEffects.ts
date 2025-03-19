import { useGraphQLMutationUseFertilizerSwrMutation } from "@/hooks"
import { UseFertilizerRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"
import { GRAPHQL_MUTATION_USE_FERTILIZER_SWR_MUTATION } from "@/app/constants"

export const useUseFertilizerEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationUseFertilizerSwrMutation>
      >(GRAPHQL_MUTATION_USE_FERTILIZER_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestUseFertilizer, async (message: UseFertilizerRequest) => {
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
            EventBus.emit(EventName.UseFertilizerCompleted, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUseFertilizer)
        }
    }, [swrMutation])
}