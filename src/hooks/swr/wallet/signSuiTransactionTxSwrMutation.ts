import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { useAppSelector } from "@/redux"
import { v4 } from "uuid"
import { signUmiSerializedTx, SignUmiSerializedTxResponse } from "@/modules/blockchain"

export interface UseSignSuiTransactionTxSwrMutationArgs {
    serializedTx: string
}

export const useSignSuiTransactionTxSwrMutation = (): UseSWRMutation<
    SignUmiSerializedTxResponse,
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
            
            return await signUmiSerializedTx({
                serializedTx,
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
