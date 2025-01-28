import { ChainKey, defaultChainKey, defaultNetwork, getBalance, Network } from "@/modules/blockchain"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { UseSWR } from "./types"

export interface UseBalanceSWRParams {
    chainKey?: ChainKey
    network?: Network
    //if tokenKey is set, tokenAddress is ignored
    tokenKey?: string
    //use token address incase you want to get balance of a specific token
    tokenAddress?: string
}

export const useBalanceSWR = ({
    chainKey,
    network,
    tokenAddress,
    tokenKey
}: UseBalanceSWRParams): UseSWR<number> => {
    //default values
    chainKey = chainKey || defaultChainKey
    network = network || defaultNetwork
    
    const accountId = useAppSelector((state) => state.sessionReducer.accounts.currentId)
    const accounts = useAppSelector((state) => state.sessionReducer.accounts.accounts)
    const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    const account = accounts.find((account) => account.id === accountId)

    //if tokenKey is set, tokenAddress is ignored
    const swr = useSWR(
        [chainKey, network, tokenAddress, tokenKey],
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