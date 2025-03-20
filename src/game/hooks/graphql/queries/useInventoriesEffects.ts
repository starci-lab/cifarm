import { GRAPHQL_QUERY_INVENTORIES_SWR_MUTATION } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useGraphQLQueryInventoriesSwrMutation } from "@/hooks"
import { QueryInventoriesParams } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const useInventoriesEffects = () => {
    //get the singleton instance of the user swr
    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryInventoriesSwrMutation>
  >(GRAPHQL_QUERY_INVENTORIES_SWR_MUTATION)

    // load inventory data
    useEffect(() => {
        EventBus.on(
            EventName.LoadInventories,
            async (params: QueryInventoriesParams) => {
                //load inventory data
                const { data } = await swrMutation.trigger(params)
                EventBus.emit(EventName.InventoriesLoaded, data)
            }
        )

        return () => {
            EventBus.removeListener(EventName.LoadInventories)
        }
    }, [swrMutation])

    // refresh inventory data
    useEffect(() => {
        EventBus.on(
            EventName.RefreshInventories,
            async (params: QueryInventoriesParams) => {
                //load inventory data
                const { data } = await swrMutation.trigger(params)
                EventBus.emit(EventName.InventoriesRefreshed, data)
            }
        )

        return () => {
            EventBus.removeListener(EventName.RefreshInventories)
        }
    }, [swrMutation])
}
