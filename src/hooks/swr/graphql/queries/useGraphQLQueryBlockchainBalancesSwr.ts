import { UseSWR } from "../../types"
import {
    queryBlockchainBalances,
    QueryBlockchainBalancesParams,
    QueryBlockchainBalancesResponseWrapper,
} from "@/modules/apollo"
import useSWR from "swr"
import { ApolloQueryResult } from "@apollo/client"
import { useState } from "react"
import { useGlobalAccountAddress } from "@/hooks/useGlobalAccountAddress"
import { ChainKey } from "@/modules/blockchain"
import { TokenKey } from "@/modules/entities"
import _ from "lodash"
import { useAppSelector } from "@/redux"

export const useGraphQLQueryBlockchainBalancesSwr = (): UseSWR<
    ApolloQueryResult<QueryBlockchainBalancesResponseWrapper>,
  QueryBlockchainBalancesParams
> => {
    const { accountAddress } = useGlobalAccountAddress()
    const [params, setParams] = useState<QueryBlockchainBalancesParams>({})
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const swr = useSWR(
        (authenticated && accountAddress) ? ["QUERY_BLOCKCHAIN_BALANCES", params, accountAddress] : null,
        async () => {
            if (!accountAddress) throw new Error("Account address is required")
            const _params = _.isEmpty(params) ? {
                request: {
                    accountAddress: accountAddress ?? "",
                    chainKey: ChainKey.Solana,
                    tokenKeys: [
                        TokenKey.Native,
                        TokenKey.USDC,
                        TokenKey.USDT,
                        TokenKey.CIFARM
                    ],
                    refresh: true,
                }
            } : params
            const response = await queryBlockchainBalances(_params)
            return response
        }
    )

    //return the state and the data
    return {
        params,
        setParams,
        swr,
    }
} 