import { UseSWR } from "../../types"
import {
    queryUser,
    QueryUserResponse,
    QueryUserParams,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import { useState } from "react"
import { useAppSelector } from "@/redux"
import useSWR from "swr"

export const useGraphQLQueryUserSwr = (): UseSWR<
  ApolloQueryResult<QueryUserResponse>,
  QueryUserParams
> => {
    const [ params, setParams ] = useState<QueryUserParams>({})
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const swr = useSWR(
        authenticated ? ["QUERY_USER", params] : null,
        async () => {
            return await queryUser(params)
        }
    )

    //return the state and the data
    return {
        swr,
        setParams,
        params
    }
} 