import { UseSWR } from "../../types"
import {
    queryInventories,
    QueryInventoriesResponse,
    QueryInventoriesParams,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import { useState } from "react"
import { useAppSelector } from "@/redux"
import useSWR from "swr"

export const useGraphQLQueryInventoriesSwr = (): UseSWR<
  ApolloQueryResult<QueryInventoriesResponse>,
  QueryInventoriesParams
> => {
    const [ params, setParams ] = useState<QueryInventoriesParams>({})
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const swr = useSWR(
        authenticated ? ["QUERY_INVENTORIES", params] : null,
        async () => {
            return await queryInventories(params)
        }
    )
    //return the state and the data
    return {
        swr,
        setParams,
        params
    }
} 