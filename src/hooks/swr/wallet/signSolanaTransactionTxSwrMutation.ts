import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { ChainKey, SignUmiSerializedTxResponse, solanaHttpRpcUrl } from "@/modules/blockchain"
import { useWallet } from "@solana/wallet-adapter-react"
import { signerIdentity } from "@metaplex-foundation/umi"
import base58 from "bs58"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { mplCore } from "@metaplex-foundation/mpl-core"
import { envConfig } from "@/env"
import { createSignerFromWalletAdapter } from "@metaplex-foundation/umi-signer-wallet-adapters"

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
            const umi = createUmi(
                solanaHttpRpcUrl({ chainKey: ChainKey.Solana, network })
            ).use(mplCore()).use(signerIdentity(createSignerFromWalletAdapter(walletAdapter)))
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
