import { GRAPHQL_MUTATION_RETURN_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationReturnSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"

export const useReturnEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationReturnSwrMutation>
      >(GRAPHQL_MUTATION_RETURN_SWR_MUTATION)

    useEffect(() => {
        EventBus.on(EventName.RequestReturn, async () => {
            let completedMessage: CompletedMessage
            try {
                await swrMutation.trigger({})
                completedMessage = {
                    success: true,
                }
            } catch (error) {
                console.error(error)
                completedMessage = {
                    success: false,
                }
            }
            EventBus.emit(EventName.ReturnCompleted, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestReturn)
        }
    }, [swrMutation])
}