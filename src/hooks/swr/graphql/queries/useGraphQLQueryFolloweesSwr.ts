import { UseSWR } from "../../types"
import {
    queryFollowees,
    QueryFolloweesResponseWrapper,
    QueryFolloweesParams,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import { useState } from "react"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { defaultRequest } from "../constants"

export const useGraphQLQueryFolloweesSwr = (): UseSWR<
  ApolloQueryResult<QueryFolloweesResponseWrapper>,
  QueryFolloweesParams
> => {
    const [params, setParams] = useState<QueryFolloweesParams>({
        request: defaultRequest
    })
    const authenticated = useAppSelector(
        (state) => state.sessionReducer.authenticated
    )
    const swr = useSWR(
        authenticated ? ["QUERY_FOLLOWEES", params] : null,
        async () => {
            return await queryFollowees(params)
        }
    )

    //return the state and the data
    return {
        swr,
        setParams,
        params,
    }
} 