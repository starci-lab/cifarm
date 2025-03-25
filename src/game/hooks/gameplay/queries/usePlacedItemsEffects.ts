import {
    GRAPHQL_QUERY_PLACED_ITEMS_SWR_MUTATION,
} from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import {
    useGraphQLQueryPlacedItemsSwrMutation,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const usePlacedItemsEffects = () => {
    //get the singleton instance of the user swr
    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryPlacedItemsSwrMutation>
  >(GRAPHQL_QUERY_PLACED_ITEMS_SWR_MUTATION)

    // load inventory data
    useEffect(() => {
        EventBus.on(EventName.LoadPlacedItems, async (userId?: string) => {
            const response = await swrMutation.trigger({
                request: {
                    userId,
                },
            })
            EventBus.emit(EventName.PlacedItemsLoaded, response.data?.placedItems)
        })

        return () => {
            EventBus.removeListener(EventName.LoadPlacedItems)
        }
    }, [swrMutation])

    // load inventory data
    useEffect(() => {
        EventBus.on(EventName.LoadPlacedItems, async (userId?: string) => {
            const response = await swrMutation.trigger({
                request: {
                    userId,
                },
            })
            EventBus.emit(EventName.PlacedItemsLoaded, response.data?.placedItems)
        })

        return () => {
            EventBus.removeListener(EventName.LoadPlacedItems)
        }
    }, [swrMutation])

    // load inventory data
    useEffect(() => {
        EventBus.on(EventName.LoadPlacedItems1, async (userId?: string) => {
            const response = await swrMutation.trigger({
                request: {
                    userId,
                },
            })
            console.log(response)
            EventBus.emit(EventName.PlacedItemsLoaded1, response.data?.placedItems)
        })

        return () => {
            EventBus.removeListener(EventName.LoadPlacedItems1)
        }
    }, [swrMutation])
}
