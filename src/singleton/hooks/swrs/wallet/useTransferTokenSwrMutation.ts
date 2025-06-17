import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { TransferResult, transferToken } from "@/modules/blockchain"
import { TokenKey } from "@/types"
import { useAppSelector } from "@/redux"
import { useGlobalAccountAddress } from "@/hooks"

export interface UseTransferTokenSwrMutationArgs {
    amount: number
    tokenKey: TokenKey
    recipientAddress: string
}

export const useTransferTokenSwrMutation = (): UseSWRMutation<
  TransferResult,
  UseTransferTokenSwrMutationArgs
> => {
    // solana
    const chainKey = useAppSelector(state => state.sessionReducer.chainKey)
    const network = useAppSelector(state => state.sessionReducer.network)

    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    const tokens = staticData?.tokens
    const { accountAddress } = useGlobalAccountAddress()
    const umi = useAppSelector((state) => state.walletReducer.solanaWallet.umi)
    const swrMutation = useSWRMutation(
        "TRANSFER_TOKEN",
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
                //solana only
                umi,
            })            
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
