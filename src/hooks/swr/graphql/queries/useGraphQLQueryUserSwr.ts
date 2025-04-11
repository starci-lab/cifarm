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
    const [synced, setSynced] = useState(false)
    const dispatch = useAppDispatch()
    const swr = useSWR(
        authenticated ? ["QUERY_USER", params] : null,
        async () => {
            const response = await queryUser(params)
            if (!synced) {
                dispatch(setUser(response.data.user))
                setSynced(true)
            }
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