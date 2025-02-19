import { QUERY_NEIGHBORS_SWR_MUTATION } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useQueryFolloweesSwrMutation } from "@/hooks"
import { QueryFolloweesParams } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
export const useFolloweesEffects = () => {
    //get the singleton instance of the user swr
    const { swrMutation } = useSingletonHook<ReturnType<typeof useQueryFolloweesSwrMutation>>(QUERY_NEIGHBORS_SWR_MUTATION)
    
    // load user data
    useEffect(() => {
        EventBus.on(EventName.LoadFollowees, async (params: QueryFolloweesParams) => {
            //load user data
            const { data } = await swrMutation.trigger(params)
            EventBus.emit(EventName.FolloweesLoaded, data?.neighbors)
        })

        return () => {
            EventBus.removeListener(EventName.LoadFollowees)
        }
    }, [swrMutation])

    // refresh user data
    useEffect(() => {
        EventBus.on(EventName.RefreshFollowees, async (params: QueryFolloweesParams) => {
            //load user data
            const { data } = await swrMutation.trigger(params)
            EventBus.emit(EventName.FolloweesLoaded, data.neighbors)
        })

        return () => {
            EventBus.removeListener(EventName.RefreshFollowees)
        }
    }, [swrMutation])
}