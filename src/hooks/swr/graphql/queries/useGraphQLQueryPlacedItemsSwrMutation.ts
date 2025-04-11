import { UseSWRMutation } from "../../types"
import {
    queryPlacedItems,
    QueryPlacedItemsResponse,
    QueryPlacedItemsParams,
} from "@/modules/apollo"
import { setPlacedItems, useAppDispatch } from "@/redux"
import { ApolloQueryResult } from "@apollo/client"
import useSWRMutation from "swr/mutation"
import { useState } from "react"

export const useGraphQLQueryPlacedItemsSwrMutation = (): UseSWRMutation<
  ApolloQueryResult<QueryPlacedItemsResponse>,
  QueryPlacedItemsParams
> => {
    const dispatch = useAppDispatch()
    const [synced, setSynced] = useState(false)
    const swrMutation = useSWRMutation(
        "QUERY_PLACED_ITEMS_MUTATION",
        async (_: string, extraArgs: { arg: QueryPlacedItemsParams }) => {
            const { ...args } = { ...extraArgs.arg }
            const data = await queryPlacedItems({ ...args })
            if (!synced) {
                dispatch(setPlacedItems(data.data.placedItems))
                setSynced(true)
            }
            return data
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
