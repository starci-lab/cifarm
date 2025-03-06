import { UseSWR } from "../types"
import {
    queryNeighbors,
    QueryNeighborsParams,
    QueryNeighborsResponse,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import useSWR from "swr"
import { useState } from "react"
import { useAppSelector } from "@/redux"
import { defaultArgs } from "./constants"

export const useQueryNeighborsSwr = (): UseSWR<
  ApolloQueryResult<QueryNeighborsResponse>,
  QueryNeighborsParams
> => {
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const [ params, setParams ] = useState<QueryNeighborsParams>({
        args: defaultArgs
    })
    const swr = useSWR(
        authenticated ? ["QUERY_NEIGHBORS", params] : null,
        async () => {
            return await queryNeighbors(params)
        }
    )

    //return the state and the data
    return {
        swr,
        params,
        setParams
    }
}
