import { getBalance } from "@/modules/blockchain"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { UseSWR } from "../../swr/types"

export interface UseBalanceSwrParams {
    //if tokenKey is set, tokenAddress is ignored
    tokenKey?: string
    //use token address incase you want to get balance of a specific token
    tokenAddress?: string
    //use honeycomb protocol
    useHoneycombProtocol?: boolean
}

export const useBalanceSwr = ({
    tokenAddress,
    tokenKey
}: UseBalanceSwrParams): UseSWR<number> => {
    //default values
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = useAppSelector((state) => state.sessionReducer.network)
    const accountId = useAppSelector((state) => state.sessionReducer.accounts.currentId)
    const accounts = useAppSelector((state) => state.sessionReducer.accounts.accounts)
    const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    const account = accounts.find((account) => account.id === accountId)
    const refreshTokensKey = useAppSelector((state) => state.hookDependencyReducer.refreshTokensKey)
    //if tokenKey is set, tokenAddress is ignored
    const swr = useSWR(
        [chainKey, network, tokenAddress, tokenKey, account, refreshTokensKey],
        async () => {
            if (!account) {
                return 0
            }
            const { address } = account
            try {
                return await getBalance({
                    chainKey,
                    network,
                    tokenAddress,
                    tokenKey,
                    accountAddress: address,
                    tokens,
                })
            } catch (error) {
                console.error(error)
                return 0
            }
        }
    )

    return {
        swr,
    }

}