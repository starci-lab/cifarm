import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { TransferResult, transferToken } from "@/modules/blockchain"
import { useCurrentWallet } from "@mysten/dapp-kit"
import { TokenKey } from "@/modules/entities"
import { useAppSelector } from "@/redux"
import { envConfig } from "@/env"
import { useGlobalAccountAddress, useGraphQLQueryStaticSwr } from "@/hooks"
import { QUERY_GRAPHQL_STATIC_SWR_MUTATION } from "@/app/(core)/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { ChainKey } from "@/modules/blockchain"

export interface UseTransferTokenSwrMutationArgs {
    amount: number
    tokenKey: TokenKey
    recipientAddress: string
}

export const useTransferTokenSwrMutation = (): UseSWRMutation<
  TransferResult,
  UseTransferTokenSwrMutationArgs
> => {
    //sui
    const { currentWallet: suiWallet } = useCurrentWallet()
    // solana
    const chainKey = useAppSelector(state => state.sessionReducer.chainKey)
    const network = envConfig().network

    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        QUERY_GRAPHQL_STATIC_SWR_MUTATION
    )
    const tokens = staticSwr.data?.data.tokens
    const { accountAddress } = useGlobalAccountAddress()
    const wallet = useAppSelector(state => state.walletReducer[ChainKey.Solana])
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseTransferTokenSwrMutationArgs }
        ) => {
            const { amount, recipientAddress, tokenKey } = { ...extraArgs.arg }
            if (!tokens) throw new Error("No tokens found")
            return await transferToken({
                amount,
                chainKey,
                network, 
                fromAddress: accountAddress,
                recipientAddress,
                tokenKey,
                tokens,
                //sui
                currentWallet: suiWallet,
                //solana
                walletData: wallet,
            })            
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
