import { UseSWR } from "../../types"
import {
    queryBulkPaids,
    QueryBulkPaidsParams,
    QueryBulkPaidsResponseWrapper,
} from "@/modules/apollo"
import useSWR from "swr"
import { ApolloQueryResult } from "@apollo/client"
import { useAppSelector } from "@/redux"
import { envConfig } from "@/env"

export const useGraphQLQueryBulkPaidsSwr = (): UseSWR<
    ApolloQueryResult<QueryBulkPaidsResponseWrapper>,
  QueryBulkPaidsParams
> => {
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const swr = useSWR(
        authenticated ? "QUERY_BULK_PAIDS" : null,
        async () => {
            return await queryBulkPaids({
                request: {
                    network: envConfig().network,
                }
            })
        }
    )
    //return the state and the data
    return {
        swr,
    }
} 