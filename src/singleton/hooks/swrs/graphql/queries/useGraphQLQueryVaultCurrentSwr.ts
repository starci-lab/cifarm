import { UseSWR } from "../../types"
import {
    queryVaultCurrent,
    QueryVaultCurrentParams,
    QueryVaultCurrentResponseWrapper,
} from "@/modules/apollo"
import useSWR from "swr"
import { ApolloQueryResult } from "@apollo/client"
import { setVaultCurrent, useAppSelector } from "@/redux"
import { useAppDispatch } from "@/redux"
import { envConfig } from "@/env"

export const useGraphQLQueryVaultCurrentSwr = (): UseSWR<
    ApolloQueryResult<QueryVaultCurrentResponseWrapper>,
  QueryVaultCurrentParams
> => {
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const dispatch = useAppDispatch()
    const swr = useSWR(
        authenticated ? "QUERY_VAULT_CURRENT" : null,
        async () => {
            const response = await queryVaultCurrent({
                request: {
                    network: envConfig().network,
                }
            })
            dispatch(setVaultCurrent(response.data?.vaultCurrent))
            return response
        }
    )

    //return the state and the data
    return {
        swr,
    }
} 