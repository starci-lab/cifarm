import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import base58 from "bs58"
import { useAppSelector } from "@/redux"

export interface UseSignSolanaTransactionTxSwrMutationArgs {
    serializedTxs: string | Array<string>
}

export interface UseSignSolanaTransactionTxSwrMutationResponse {
    serializedTxs: string | Array<string>
}

export const useSignSolanaTransactionTxSwrMutation = (): UseSWRMutation<
    UseSignSolanaTransactionTxSwrMutationResponse,
    UseSignSolanaTransactionTxSwrMutationArgs
> => {
    const umi = useAppSelector((state) => state.walletReducer.solanaWallet.umi)
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseSignSolanaTransactionTxSwrMutationArgs }
        ): Promise<UseSignSolanaTransactionTxSwrMutationResponse> => {
            const { serializedTxs } = { ...extraArgs.arg }
            if (!umi) throw new Error("Umi is not initialized")
            if (Array.isArray(serializedTxs)) {
                const txs = serializedTxs.map((serializedTx) => {
                    const tx = umi.transactions.deserialize(base58.decode(serializedTx))
                    return tx
                })
                const signedTxs = await umi.identity.signAllTransactions(txs)
                return {
                    serializedTxs: signedTxs.map((signedTx) => {
                        return base58.encode(
                            umi.transactions.serialize(signedTx)
                        )
                    }),
                }
            } else {
                const tx = umi.transactions.deserialize(base58.decode(serializedTxs))
                const signedTx = await umi.identity.signTransaction(tx)
                return {
                    serializedTxs: base58.encode(
                        umi.transactions.serialize(signedTx)
                    ),
                }
            }
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
