import { UseSWR } from "../../types"
import {
    queryBulkPaids,
    QueryBulkPaidsParams,
    QueryBulkPaidsResponseWrapper,
} from "@/modules/apollo"
import useSWR from "swr"
import { ApolloQueryResult } from "@apollo/client"
import { useAppSelector } from "@/redux"

export const useGraphQLQueryBulkPaidsSwr = (): UseSWR<
    ApolloQueryResult<QueryBulkPaidsResponseWrapper>,
  QueryBulkPaidsParams
> => {
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const swr = useSWR(
        authenticated ? "QUERY_BULK_PAIDS" : null,
        async () => {
            const response = await queryBulkPaids({})
            return response
        }
    )

    //return the state and the data
    return {
        swr,
    }
} 