import { GRAPHQL_QUERY_FOLLOWEES_SWR_MUTATION } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useGraphQLQueryFolloweesSwrMutation } from "@/hooks"
import { QueryFolloweesParams } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const useFolloweesEffects = () => {
    //get the singleton instance of the user swr
    const { swrMutation } = useSingletonHook<ReturnType<typeof useGraphQLQueryFolloweesSwrMutation>>(
        GRAPHQL_QUERY_FOLLOWEES_SWR_MUTATION,
    )

    // load followees data
    useEffect(() => {
        EventBus.on(EventName.LoadFollowees, async (params: QueryFolloweesParams) => {
            //load followees data
            const { data } = await swrMutation.trigger(params)
            EventBus.emit(EventName.FolloweesLoaded, data.followees)
        })

        return () => {
            EventBus.removeListener(EventName.LoadFollowees)
        }
    }, [swrMutation])

    // refresh followees data
    useEffect(() => {
        EventBus.on(EventName.RefreshFollowees, async (params: QueryFolloweesParams) => {
            //load followees data
            const { data } = await swrMutation.trigger(params)
            EventBus.emit(EventName.FolloweesRefreshed, data.followees)
        })

        return () => {
            EventBus.removeListener(EventName.RefreshFollowees)
        }
    }, [swrMutation])
}