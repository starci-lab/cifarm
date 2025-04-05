import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { useAppSelector } from "@/redux"
import { v4 } from "uuid"
import { sendUmiSerializedTx, TransferResult } from "@/modules/blockchain"

export interface UseSendUmiSerializedTxSwrMutationArgs {
    serializedTx: string
}

export const useSendUmiSerializedTxSwrMutation = (): UseSWRMutation<
    TransferResult,
    UseSendUmiSerializedTxSwrMutationArgs
> => {
    //get accounts
    const accounts = useAppSelector(
        (state) => state.sessionReducer.accounts.accounts
    )
    const currentId = useAppSelector(
        (state) => state.sessionReducer.accounts.currentId
    )
    const account = accounts.find((account) => account.id === currentId)
    const network = useAppSelector((state) => state.sessionReducer.network)
    
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseSendUmiSerializedTxSwrMutationArgs }
        ) => {
            const { serializedTx } = { ...extraArgs.arg }
            if (!account) throw new Error("No account found")
            
            return await sendUmiSerializedTx({
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
