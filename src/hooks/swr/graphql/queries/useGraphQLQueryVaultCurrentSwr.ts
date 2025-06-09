import { UseSWR } from "../../types"
import {
    queryVaultCurrent,
    QueryVaultCurrentParams,
    QueryVaultCurrentResponseWrapper,
} from "@/modules/apollo"
import useSWR from "swr"
import { ApolloQueryResult } from "@apollo/client"

export const useGraphQLQueryVaultCurrentSwr = (): UseSWR<
    ApolloQueryResult<QueryVaultCurrentResponseWrapper>,
  QueryVaultCurrentParams
> => {
    const swr = useSWR(
        "QUERY_VAULT_CURRENT",
        async () => {
            const response = await queryVaultCurrent({})
            return response
        }
    )

    //return the state and the data
    return {
        swr,
    }
} 