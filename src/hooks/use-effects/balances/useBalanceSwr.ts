import { ChainKey, getBalance } from "@/modules/blockchain"
import { envConfig } from "@/env"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { UseSWR } from "../../swr/types"
import { useCurrentAccount } from "@mysten/dapp-kit"
import { useWallet } from "@solana/wallet-adapter-react"
import { TokenKey, Tokens } from "@/modules/entities"

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
    const chainKey = useAppSelector((state) => state.sidebarReducer.assetsChainKey)
    const network = envConfig().network
    //if tokenKey is set, tokenAddress is ignored
    const suiWalletAccount = useCurrentAccount()
    const { publicKey: solanaPublicKey } = useWallet()

    const swr = useSWR(
        [chainKey, network, tokenAddress, tokenKey, tokens, suiWalletAccount, solanaPublicKey],
        async () => {
            if (!tokenAddress && !tokenKey) {
                return 0
            }
            let accountAddress: string 
            switch (chainKey) {
            case ChainKey.Sui:
                accountAddress = suiWalletAccount?.address || ""
                break
            case ChainKey.Solana:
                accountAddress = solanaPublicKey?.toBase58() || ""
                break
            default:
                throw new Error("Invalid chain key")
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