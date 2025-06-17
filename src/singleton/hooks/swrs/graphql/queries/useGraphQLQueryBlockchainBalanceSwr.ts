import { UseSWR } from "../../types"
import {
    queryBlockchainBalances,
} from "@/modules/apollo"
import useSWR from "swr"
import { useState } from "react"
import { useGlobalAccountAddress } from "@/hooks/useGlobalAccountAddress"
import { ChainKey } from "@/modules/blockchain"
import { TokenKey } from "@/types"
import { useAppSelector, WrapperBlockchainBalanceData } from "@/redux"

export const useGraphQLQueryBlockchainBalanceSwr = (
    defaultTokenKey: TokenKey = TokenKey.Native,
): UseSWR<
    WrapperBlockchainBalanceData,
    TokenKey
> => {
    const { accountAddress } = useGlobalAccountAddress()
    const [params, setParams] = useState<TokenKey>(defaultTokenKey)
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const swr = useSWR<WrapperBlockchainBalanceData>(
        (authenticated && accountAddress) ? ["QUERY_BLOCKCHAIN_BALANCES", params, accountAddress] : null,
        async () => {
            if (!accountAddress) throw new Error("Account address is required")
            const _params = {
                request: {
                    accountAddress,
                    chainKey: ChainKey.Solana,
                    tokenKeys: [params],
                    refresh: true,
                }
            }
            const { data } = await queryBlockchainBalances(_params)
            return {
                balance: data?.blockchainBalances.tokens[0],
                cached: data?.blockchainBalances.cached,
                refreshInterval: data?.blockchainBalances.refreshInterval,
            }
        }
    )

    //return the state and the data
    return {
        params,
        setParams,
        swr,
    }
} 