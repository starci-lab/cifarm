import { GRAPHQL_MUTATION_UPDATE_FOLLOW_X_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationUpdateFollowXSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useUpdateFollowXEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationUpdateFollowXSwrMutation>
      >(GRAPHQL_MUTATION_UPDATE_FOLLOW_X_SWR_MUTATION)

    useEffect(() => {
        EventBus.on(EventName.RequestUpdateFollowX, async () => {
            await swrMutation.trigger({})
            EventBus.emit(EventName.UpdateFollowXCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUpdateFollowX)
        }
    }, [swrMutation])
}