import { getBalance } from "@/modules/blockchain"
import { envConfig } from "@/env"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { UseSWR } from "../../swr/types"
import { TokenKey, Tokens } from "@/modules/entities"
import { useGlobalAccountAddress } from "../../useGlobalAccountAddress"
export interface UseBalanceSwrParams {
    //if tokenKey is set, tokenAddress is ignored
    tokenKey?: TokenKey
    //use token address incase you want to get balance of a specific token
    tokenAddress?: string
    //use honeycomb protocol
    useHoneycombProtocol?: boolean
    //tokens
    tokens?: Tokens
}

export const useBalanceSwr = ({
    tokenAddress,
    tokenKey,
    tokens,
}: UseBalanceSwrParams): UseSWR<number> => {
    //default values
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const refreshTokensKey = useAppSelector((state) => state.hookDependencyReducer.refreshTokensKey)
    const network = envConfig().network

    const { accountAddress } = useGlobalAccountAddress()
    const swr = useSWR(
        [chainKey, network, tokenAddress, tokenKey, tokens, accountAddress, refreshTokensKey],
        async () => {
            if (!tokenAddress && !tokenKey) {
                return 0
            }

            if (!accountAddress) {
                return 0
            }

            try {
                return await getBalance({
                    chainKey,
                    network,
                    tokenAddress,
                    tokenKey,
                    accountAddress,
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