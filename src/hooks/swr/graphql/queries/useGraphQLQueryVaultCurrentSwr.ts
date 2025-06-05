import { envConfig } from "@/env"
import { UseSWR } from "../../types"
import {
    queryVaultCurrent,
    QueryVaultCurrentParams,
    QueryVaultCurrentResponseWrapper,
} from "@/modules/apollo"
import { useState } from "react"
import useSWR from "swr"
import { ApolloQueryResult } from "@apollo/client"

export const useGraphQLQueryVaultCurrentSwr = (): UseSWR<
    ApolloQueryResult<QueryVaultCurrentResponseWrapper>,
  QueryVaultCurrentParams
> => {
    const network = envConfig().network
    const [ params, setParams ] = useState<QueryVaultCurrentParams>({
        request: {
            network
        }
    })
    const swr = useSWR(
        "QUERY_VAULT_CURRENT",
        async () => {
            const response = await queryVaultCurrent(params)
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