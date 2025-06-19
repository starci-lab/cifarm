import { UseSWRMutation } from "../../types"
import {
    queryPlacedItems,
    QueryPlacedItemsResponseWrapper,
    QueryPlacedItemsParams,
} from "@/modules/apollo"
import { setPlacedItems, useAppDispatch } from "@/redux"
import useSWRMutation from "swr/mutation"
import { ApolloQueryResult } from "@apollo/client"

export const useGraphQLQueryPlacedItemsSwrMutation = (): UseSWRMutation<
  ApolloQueryResult<QueryPlacedItemsResponseWrapper>,
  QueryPlacedItemsParams
> => {
    const dispatch = useAppDispatch()
    const swrMutation = useSWRMutation(
        "QUERY_PLACED_ITEMS_MUTATION",
        async (_: string, extraArgs: { arg: QueryPlacedItemsParams }) => {
            const { ...args } = { ...extraArgs.arg }
            const data = await queryPlacedItems({ ...args })
            dispatch(setPlacedItems(data.data?.placedItems ?? []))
            return data
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
