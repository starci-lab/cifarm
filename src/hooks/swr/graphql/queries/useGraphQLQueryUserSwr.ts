import { UseSWR } from "../../types"
import {
    queryUser,
    QueryUserResponse,
    QueryUserParams,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import { useState } from "react"
import { setUser, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"

export const useGraphQLQueryUserSwr = (): UseSWR<
  ApolloQueryResult<QueryUserResponse>,
  QueryUserParams
> => {
    const [ params, setParams ] = useState<QueryUserParams>({})
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const dispatch = useAppDispatch()
    const swr = useSWR(
        authenticated ? ["QUERY_USER", params] : null,
        async () => {
            const response = await queryUser(params)
            dispatch(setUser(response.data.user))
            return response
        }
    )

    //return the state and the data
    return {
        swr,
        setParams,
        params
    }
} 