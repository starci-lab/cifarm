import {
    GRAPHQL_QUERY_PLACED_ITEMS_SWR_MUTATION,
} from "@/app/constants"
import {
    useGraphQLQueryPlacedItemsSwrMutation,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const usePlacedItemsEffects = () => {
    //get the singleton instance of the user swr
    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryPlacedItemsSwrMutation>
  >(GRAPHQL_QUERY_PLACED_ITEMS_SWR_MUTATION)

    // load inventory data
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.LoadPlacedItems, async (userId?: string) => {
            const response = await swrMutation.trigger({
                request: {
                    userId,
                },
            })
            ExternalEventEmitter.emit(ExternalEventName.PlacedItemsLoaded, response.data?.placedItems)
        })

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.LoadPlacedItems)
        }
    }, [swrMutation])

    // load inventory data
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.LoadPlacedItems, async (userId?: string) => {
            const response = await swrMutation.trigger({
                request: {
                    userId,
                },
            })
            ExternalEventEmitter.emit(ExternalEventName.PlacedItemsLoaded, response.data?.placedItems)
        })

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.LoadPlacedItems)
        }
    }, [swrMutation])
}
