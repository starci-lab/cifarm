import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { useAppSelector } from "@/redux"
import { v4 } from "uuid"
import { signUmiSerializedTxs, SignUmiSerializedTxsResponse } from "@/modules/blockchain"

export interface UseSignSuiTransactionTxSwrMutationArgs {
    serializedTx: string
}

export const useSignSuiTransactionTxSwrMutation = (): UseSWRMutation<
    SignUmiSerializedTxsResponse,
    UseSignSuiTransactionTxSwrMutationArgs
> => {
    //get accounts
    const accounts = useAppSelector(
        (state) => state.sessionReducer.accounts.accounts
    )
    const activateAccountId = useAppSelector(
        (state) => state.sessionReducer.accounts.activateAccountId
    )
    const account = accounts.find((account) => account.id === activateAccountId)
    const network = useAppSelector((state) => state.sessionReducer.network)
    
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseSignSuiTransactionTxSwrMutationArgs }
        ) => {
            const { serializedTx } = { ...extraArgs.arg }
            if (!account) throw new Error("No account found")
            
            return await signUmiSerializedTxs({
                serializedTxs: Array.isArray(serializedTx) ? serializedTx : [serializedTx],
                network,
                privateKey: account?.privateKey,
            })            
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
