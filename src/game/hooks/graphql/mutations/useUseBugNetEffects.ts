import { GRAPHQL_MUTATION_USE_BUG_NET_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationUseBugNetSwrMutation } from "@/hooks"
import { UseBugNetRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"

export const useUseBugNetEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationUseBugNetSwrMutation>
      >(GRAPHQL_MUTATION_USE_BUG_NET_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestUseBugNet, async (message: UseBugNetRequest) => {
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
            EventBus.emit(EventName.UseBugNetCompleted, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUseBugNet)
        }
    }, [swrMutation])
}