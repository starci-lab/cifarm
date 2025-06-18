import { UseSWR } from "../../types"
import {
    queryFollowees,
    QueryFolloweesResponseWrapper,
    QueryFolloweesParams,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import { useState } from "react"
import { setFollowees, useAppSelector } from "@/redux"
import { useAppDispatch } from "@/redux"
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
    const dispatch = useAppDispatch()
    const swr = useSWR(
        authenticated ? ["QUERY_FOLLOWEES", params] : null,
        async () => {
            const response = await queryFollowees(params)
            dispatch(setFollowees(response.data?.followees ?? {
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