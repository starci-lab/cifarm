import { UseSWRMutation } from "../../types"
import {
    queryPlacedItems,
    QueryPlacedItemsResponse,
    QueryPlacedItemsParams,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import useSWRMutation from "swr/mutation"

export const useGraphQLQueryPlacedItemsSwrMutation = (): UseSWRMutation<
  ApolloQueryResult<QueryPlacedItemsResponse>,
  QueryPlacedItemsParams
> => {
    const swrMutation = useSWRMutation(
        "QUERY_PLACED_ITEMS_MUTATION",
        async (_: string, extraArgs: { arg: QueryPlacedItemsParams }) => {
            const { ...args } = { ...extraArgs.arg }
            return await queryPlacedItems({ ...args })
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
