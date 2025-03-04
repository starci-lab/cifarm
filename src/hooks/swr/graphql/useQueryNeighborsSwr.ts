import { UseSWR } from "../types"
import {
    QueryFolloweesResponse,
    queryNeighbors,
    QueryNeighborsParams,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import { v4 } from "uuid"
import useSWR from "swr"
import { useState } from "react"
import { useAppSelector } from "@/redux"

export const useQueryNeighborsSwr = (): UseSWR<
  ApolloQueryResult<QueryFolloweesResponse>,
  QueryNeighborsParams
> => {
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const [ params, setParams ] = useState<QueryNeighborsParams>({})
    const swr = useSWR(
        authenticated ? [v4(), params] : null,
        async (
        ) => {
            return await queryNeighbors(params)
        }
    )

    //return the state and the data
    return {
        swr,
        setParams
    }
}
