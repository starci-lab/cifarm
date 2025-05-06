import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { useAppSelector } from "@/redux"
import { v4 } from "uuid"
import { TransferResult, transferToken } from "@/modules/blockchain"

export interface UseTransferTokenSwrMutationArgs {
    amount: number
    tokenKey: string
    recipientAddress: string
}

export const useTransferTokenSwrMutation = (): UseSWRMutation<
  TransferResult,
  UseTransferTokenSwrMutationArgs
> => {
    //get accounts
    const accounts = useAppSelector(
        (state) => state.sessionReducer.accounts.accounts
    )
    const activateAccountId = useAppSelector(
        (state) => state.sessionReducer.accounts.activateAccountId
    )
    const account = accounts.find((account) => account.id === activateAccountId)
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = useAppSelector((state) => state.sessionReducer.network)
    const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseTransferTokenSwrMutationArgs }
        ) => {
            const { amount, recipientAddress, tokenKey } = { ...extraArgs.arg }
            if (!account) throw new Error("No account found")
            
            return await transferToken({
                fromAddress: account.address,
                tokenKey,
                recipientAddress,
                chainKey,
                network,
                privateKey: account?.privateKey,
                tokens,
                amount,
            })            
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
