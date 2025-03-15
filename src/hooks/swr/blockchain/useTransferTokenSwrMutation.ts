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
    const currentId = useAppSelector(
        (state) => state.sessionReducer.accounts.currentId
    )
    const account = accounts.find((account) => account.id === currentId)
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
            if (!account?.privateKey) throw new Error("No private key found")
            console.log({
                amount,
                tokenKey,
                recipientAddress,
                chainKey,
                network,
                privateKey: account?.privateKey,
            })
            return await transferToken({
                amount,
                tokenKey,
                recipientAddress,
                chainKey,
                network,
                privateKey: account?.privateKey,
                tokens
            })            
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
