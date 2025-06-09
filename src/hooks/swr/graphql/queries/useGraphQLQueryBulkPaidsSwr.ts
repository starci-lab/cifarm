import { UseSWR } from "../../types"
import {
    queryBulkPaids,
    QueryBulkPaidsParams,
    QueryBulkPaidsResponseWrapper,
} from "@/modules/apollo"
import useSWR from "swr"
import { ApolloQueryResult } from "@apollo/client"

export const useGraphQLQueryBulkPaidsSwr = (): UseSWR<
    ApolloQueryResult<QueryBulkPaidsResponseWrapper>,
  QueryBulkPaidsParams
> => {
    const swr = useSWR(
        "QUERY_BULK_PAIDS",
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