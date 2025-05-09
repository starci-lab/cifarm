import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { SignUmiSerializedTxResponse } from "@/modules/blockchain"
import { useWallet } from "@solana/wallet-adapter-react"
import base58 from "bs58"
import { envConfig } from "@/env"
import { getUmi } from "@/modules/blockchain"
export interface UseSignSolanaTransactionTxSwrMutationArgs {
    serializedTx: string
}

export const useSignSolanaTransactionTxSwrMutation = (): UseSWRMutation<
    SignUmiSerializedTxResponse,
    UseSignSolanaTransactionTxSwrMutationArgs
> => {
    const network = envConfig().network
    const walletAdapter = useWallet()
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseSignSolanaTransactionTxSwrMutationArgs }
        ) => {
            const { serializedTx } = { ...extraArgs.arg }
            const umi = getUmi(network, walletAdapter)
            const tx = umi.transactions.deserialize(base58.decode(serializedTx))
            const signedTx = await umi.identity.signTransaction(
                tx
            )
            return {
                serializedTx: base58.encode(
                    umi.transactions.serialize(signedTx)
                ),
            }             
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
