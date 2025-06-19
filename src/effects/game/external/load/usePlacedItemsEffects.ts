import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"
import { useAppDispatch, setPlacedItems } from "@/redux"
import { useAppSelector } from "@/redux"
import {
    GRAPHQL_QUERY_PLACED_ITEMS_SWR_MUTATION,
    useSingletonHook,
    useGraphQLQueryPlacedItemsSwrMutation,
} from "@/singleton"

export const usePlacedItemsEffects = () => {
    const { swrMutation: placedItemsSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryPlacedItemsSwrMutation>
  >(GRAPHQL_QUERY_PLACED_ITEMS_SWR_MUTATION)
  //get the singleton instance of the user swr
    const placedItems = useAppSelector(
        (state) => state.apiReducer.coreApi.placedItems
    )
    const dispatch = useAppDispatch()
    // load placed items data
    useEffect(() => {
        if (!placedItems) return
        ExternalEventEmitter.on(
            ExternalEventName.LoadPlacedItems,
            async (userId?: string) => {
                const response = await placedItemsSwrMutation.trigger({
                    request: {
                        userId,
                    },
                })
                dispatch(setPlacedItems(response.data?.placedItems))
                ExternalEventEmitter.emit(
                    ExternalEventName.PlacedItemsLoaded,
                    response.data?.placedItems
                )
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.LoadPlacedItems)
        }
    }, [placedItemsSwrMutation, dispatch])
}
