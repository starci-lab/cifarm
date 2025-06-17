import { GRAPHQL_QUERY_INVENTORIES_SWR } from "@/singleton"
import { ExternalEventName, ExternalEventEmitter } from "@/modules/event-emitter"
import { useGraphQLQueryInventoriesSwr } from "@/hooks"
import { useSingletonHook } from "@/singleton"
import { useEffect } from "react"

export const useInventoriesEffects = () => {
    //get the singleton instance of the user swr
    const { swr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryInventoriesSwr>
  >(GRAPHQL_QUERY_INVENTORIES_SWR)

    // load inventory data
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.LoadInventories, async () => {
            //load inventory data
            ExternalEventEmitter.emit(
                ExternalEventName.InventoriesLoaded,
                swr.data?.data?.inventories
            )
        })

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.LoadInventories)
        }
    }, [swr])
}
