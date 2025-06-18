import { UseSWR } from "../../types"
import {
    QueryStaticResponse,
    queryStatic,
} from "@/modules/apollo"
import { setStatic, useAppSelector, useAppDispatch } from "@/redux"
import { ApolloQueryResult } from "@apollo/client"
import useSWR from "swr"

export const useGraphQLQueryStaticSwr: () => UseSWR<
  ApolloQueryResult<QueryStaticResponse>,
  void
> = () => {
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const dispatch = useAppDispatch()
    const swr = useSWR(
        authenticated ? "QUERY_STATIC" : null,
        async () => {
            const response = await queryStatic()
            dispatch(setStatic(response.data))
            return response
        }
    )
    //return the state and the data
    return {
        swr,
    }
}
