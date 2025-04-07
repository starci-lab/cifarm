import { UseSWR } from "../../types"
import {
    queryStoredPlacedItems,
    QueryStoredPlacedItemsResponse,
    QueryStoredPlacedItemsParams,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import { useState } from "react"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { defaultRequest } from "../constants"
export const useGraphQLQueryStoredPlacedItemsSwr = (): UseSWR<
  ApolloQueryResult<QueryStoredPlacedItemsResponse>,
  QueryStoredPlacedItemsParams
> => {
    const [params, setParams] = useState<QueryStoredPlacedItemsParams>({
        request: defaultRequest
    })
    const authenticated = useAppSelector(
        (state) => state.sessionReducer.authenticated
    )
    const swr = useSWR(
        authenticated ? ["QUERY_STORED_PLACED_ITEMS", params] : null,
        async () => {
            return await queryStoredPlacedItems(params)
        }
    )

    //return the state and the data
    return {
        swr,
        setParams,
        params,
    }
} 