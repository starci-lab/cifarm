import { UseSWR } from "../../types"
import {
    queryNeighbors,
    QueryNeighborsResponseWrapper,
    QueryNeighborsParams,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import { useState } from "react"
import { setNeighbors, useAppDispatch, useAppSelector } from "@/redux"
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
    const dispatch = useAppDispatch()
    const swr = useSWR(
        authenticated ? ["QUERY_NEIGHBORS", params] : null,
        async () => {
            const response = await queryNeighbors(params)
            dispatch(setNeighbors(response.data?.neighbors ?? {
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