import { GRAPHQL_MUTATION_FOLLOW_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationFollowSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"
import { FollowRequest } from "@/modules/apollo"

export const useFollowEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationFollowSwrMutation>
      >(GRAPHQL_MUTATION_FOLLOW_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestFollow, async (message: FollowRequest) => {
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
            EventBus.emit(EventName.FollowCompleted, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestFollow)
        }
    }, [swrMutation])
}