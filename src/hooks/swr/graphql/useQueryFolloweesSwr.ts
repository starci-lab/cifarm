import { UseSWR } from "../types"
import {
    queryFollowees,
    QueryFolloweesParams,
    QueryFolloweesResponse,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import { v4 } from "uuid"
import useSWR from "swr"
import { useState } from "react"
import { useAppSelector } from "@/redux"

export const useQueryFolloweesSwr = (): UseSWR<
  ApolloQueryResult<QueryFolloweesResponse>,
  QueryFolloweesParams
> => {
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    console.log(authenticated)
    const [ params, setParams ] = useState<QueryFolloweesParams>({})
    const swr = useSWR(
        authenticated ? [v4(), params] : null,
        async (
        ) => {
            return await queryFollowees(params)
        }
    )

    //return the state and the data
    return {
        swr,
        setParams
    }
}
