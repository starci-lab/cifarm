import { UseSWR } from "../../types"
import {
    QueryStaticResponse,
    queryStatic,
} from "@/modules/apollo"
import { useAppSelector } from "@/redux"
import { ApolloQueryResult } from "@apollo/client"
import useSWR from "swr"

export const useGraphQLQueryStaticSwr: () => UseSWR<
  ApolloQueryResult<QueryStaticResponse>,
  void
> = () => {
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const swr = useSWR(
        authenticated ? "QUERY_STATIC" : null,
        async () => {
            return await queryStatic()
        }
    )
    //return the state and the data
    return {
        swr,
    }
}
