import { QUERY_NEIGHBORS_SWR_MUTATION } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useQueryNeighborsSwrMutation } from "@/hooks"
import { QueryNeighborsParams } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
export const useNeighborsEffects = () => {
    //get the singleton instance of the user swr
    const { swrMutation } = useSingletonHook<ReturnType<typeof useQueryNeighborsSwrMutation>>(QUERY_NEIGHBORS_SWR_MUTATION)
    
    // load user data
    useEffect(() => {
        EventBus.on(EventName.LoadNeighbors, async (params: QueryNeighborsParams) => {
            //load user data
            const { data } = await swrMutation.trigger(params)
            EventBus.emit(EventName.NeighborsLoaded, data?.neighbors)
        })

        return () => {
            EventBus.removeListener(EventName.LoadNeighbors)
        }
    }, [swrMutation])

    // refresh user data
    useEffect(() => {
        EventBus.on(EventName.RefreshNeighbors, async (params: QueryNeighborsParams) => {
            //load user data
            const { data } = await swrMutation.trigger(params)
            EventBus.emit(EventName.NeighborsLoaded, data.neighbors)
        })

        return () => {
            EventBus.removeListener(EventName.RefreshNeighbors)
        }
    }, [swrMutation])
}