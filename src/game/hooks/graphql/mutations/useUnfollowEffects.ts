import { GRAPHQL_MUTATION_UNFOLLOW_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationUnfollowSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"
import { UnfollowRequest } from "@/modules/apollo"

export const useUnfollowEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationUnfollowSwrMutation>
      >(GRAPHQL_MUTATION_UNFOLLOW_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestUnfollow, async (message: UnfollowRequest) => {
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
            EventBus.emit(EventName.UnfollowCompleted, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUnfollow)
        }
    }, [swrMutation])
}