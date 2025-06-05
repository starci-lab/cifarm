import { UseSWR } from "../../types"
import {
    queryNeighbors,
    QueryNeighborsResponseWrapper,
    QueryNeighborsParams,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import { useState } from "react"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { defaultRequest } from "../constants"

export const useGraphQLQueryNeighborsSwr = (): UseSWR<
  ApolloQueryResult<QueryNeighborsResponseWrapper>,
  QueryNeighborsParams
> => {
    const [params, setParams] = useState<QueryNeighborsParams>({
        request: defaultRequest
    })
    const authenticated = useAppSelector(
        (state) => state.sessionReducer.authenticated
    )
    const swr = useSWR(
        authenticated ? ["QUERY_NEIGHBORS", params] : null,
        async () => {
            return await queryNeighbors(params)
        }
    )
    //return the state and the data
    return {
        swr,
        setParams,
        params,
    }
} 