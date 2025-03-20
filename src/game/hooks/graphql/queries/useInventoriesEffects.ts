import { GRAPHQL_QUERY_INVENTORIES_SWR } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useGraphQLQueryInventoriesSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const useInventoriesEffects = () => {
    //get the singleton instance of the user swr
    const { swr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryInventoriesSwr>
  >(GRAPHQL_QUERY_INVENTORIES_SWR)

    // load inventory data
    useEffect(() => {
        EventBus.on(EventName.LoadInventories, async () => {
            //load inventory data
            EventBus.emit(EventName.InventoriesLoaded, swr.data?.data?.inventories)
        })

        return () => {
            EventBus.removeListener(EventName.LoadInventories)
        }
    }, [swr])

    // refresh inventory data
    useEffect(() => {
        EventBus.on(EventName.RefreshInventories, async () => {
            //load inventory data
            const response = await swr.mutate()
            EventBus.emit(
                EventName.InventoriesRefreshed,
                response?.data?.inventories
            )
        })

        return () => {
            EventBus.removeListener(EventName.RefreshInventories)
        }
    }, [swr])
}
