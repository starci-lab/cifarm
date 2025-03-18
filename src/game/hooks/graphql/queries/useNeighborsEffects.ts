import { GRAPHQL_QUERY_NEIGHBORS_SWR_MUTATION } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useGraphQLQueryNeighborsSwrMutation } from "@/hooks"
import { QueryNeighborsParams } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const useNeighborsEffects = () => {
    //get the singleton instance of the neighbors swr
    const { swrMutation } = useSingletonHook<ReturnType<typeof useGraphQLQueryNeighborsSwrMutation>>(
        GRAPHQL_QUERY_NEIGHBORS_SWR_MUTATION,
    )

    // load neighbors data
    useEffect(() => {
        EventBus.on(EventName.LoadNeighbors, async (params: QueryNeighborsParams) => {
            //load neighbors data
            const { data } = await swrMutation.trigger(params)
            EventBus.emit(EventName.NeighborsLoaded, data.neighbors)
        })

        return () => {
            EventBus.removeListener(EventName.LoadNeighbors)
        }
    }, [swrMutation])

    //refresh neighbors
    useEffect(() => {
        EventBus.on(EventName.RefreshNeighbors, async (params: QueryNeighborsParams) => {
            //refresh neighbors data
            const { data } = await swrMutation.trigger(params)
            EventBus.emit(EventName.NeighborsLoaded, data.neighbors)
        })

        return () => {
            EventBus.removeListener(EventName.RefreshNeighbors)
        }
    }, [swrMutation])
}