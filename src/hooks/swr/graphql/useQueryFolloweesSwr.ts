import { UseSWR } from "../types"
import {
    queryFollowees,
    QueryFolloweesParams,
    QueryFolloweesResponse,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import useSWR from "swr"
import { useState } from "react"
import { useAppSelector } from "@/redux"
import { defaultArgs } from "./constants"

export const useQueryFolloweesSwr = (): UseSWR<
  ApolloQueryResult<QueryFolloweesResponse>,
  QueryFolloweesParams
> => {
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const [ params, setParams ] = useState<QueryFolloweesParams>({
        args: defaultArgs
    })
    const swr = useSWR(
        authenticated ? ["QUERY_FOLLOWEES", params] : null,
        async (
        ) => {
            return await queryFollowees(params)
        }
    )

    //return the state and the data
    return {
        swr,
        setParams,
        params
    }
}
