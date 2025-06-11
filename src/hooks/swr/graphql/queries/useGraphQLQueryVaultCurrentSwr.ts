import { UseSWR } from "../../types"
import {
    queryVaultCurrent,
    QueryVaultCurrentParams,
    QueryVaultCurrentResponseWrapper,
} from "@/modules/apollo"
import useSWR from "swr"
import { ApolloQueryResult } from "@apollo/client"
import { useAppSelector } from "@/redux"

export const useGraphQLQueryVaultCurrentSwr = (): UseSWR<
    ApolloQueryResult<QueryVaultCurrentResponseWrapper>,
  QueryVaultCurrentParams
> => {
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const swr = useSWR(
        authenticated ? "QUERY_VAULT_CURRENT" : null,
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