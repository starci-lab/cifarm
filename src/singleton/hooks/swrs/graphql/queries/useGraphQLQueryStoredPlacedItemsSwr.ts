import { UseSWR } from "../../types"
import {
    queryStoredPlacedItems,
    QueryStoredPlacedItemsResponseWrapper,
    QueryStoredPlacedItemsParams,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import { useState } from "react"
import { setStoredPlacedItems, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"
import { defaultRequest } from "../constants"
export const useGraphQLQueryStoredPlacedItemsSwr = (): UseSWR<
  ApolloQueryResult<QueryStoredPlacedItemsResponseWrapper>,
  QueryStoredPlacedItemsParams
> => {
    const [params, setParams] = useState<QueryStoredPlacedItemsParams>({
        request: defaultRequest
    })
    const authenticated = useAppSelector(
        (state) => state.sessionReducer.authenticated
    )
    const dispatch = useAppDispatch()
    const swr = useSWR(
        authenticated ? ["QUERY_STORED_PLACED_ITEMS", params] : null,
        async () => {
            const response = await queryStoredPlacedItems(params)
            dispatch(setStoredPlacedItems(response.data?.storedPlacedItems ?? {
                data: [],
                count: 0,
            }))
            return response
        }
    )

    //return the state and the data
    return {
        swr,
        setParams,
        params,
    }
} 