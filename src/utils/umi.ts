import { mplCore } from "@metaplex-foundation/mpl-core"
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox"
import { createUmi as createUmiRaw } from "@metaplex-foundation/umi-bundle-defaults"
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters"
import { PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js"
export type Web3JsTransactionOrVersionedTransaction = Transaction | VersionedTransaction

export interface UmiWalletAdapterIdentityParams {
    address: string
    signMessage: (message: Uint8Array<ArrayBufferLike>) => Promise<Uint8Array<ArrayBufferLike> | void> | (Uint8Array<ArrayBufferLike> | void)
    signTransaction: (transaction: Transaction) => Promise<Transaction | void> | (Transaction | void)
    signAllTransactions: (transactions: Array<Transaction>) => Promise<Array<Transaction> | void> | (Array<Transaction> | void)
}
export const umiWalletAdapterIdentity = ({
    address,
    signMessage,
    signTransaction,
    signAllTransactions,
}: UmiWalletAdapterIdentityParams) => {
    return walletAdapterIdentity({
        publicKey: new PublicKey(address ?? ""),
        signMessage: async (message) => {
            return await signMessage?.(message) as Uint8Array<ArrayBufferLike>
        },
        signTransaction: async <T extends Web3JsTransactionOrVersionedTransaction>(transaction: T) => {
            console.log(transaction)
            return await signTransaction?.(transaction as unknown as Transaction) as T
        },
        signAllTransactions: async <T extends Web3JsTransactionOrVersionedTransaction>(transactions: Array<T>) => {
            return await signAllTransactions?.(transactions as unknown as Array<Transaction>) as Array<T>
        },
    })
}

export interface GetUmiParams {
    walletParams: UmiWalletAdapterIdentityParams
    rpcUrl: string
}
// umi utils to get umi instance
export const createUmi = ({ walletParams, rpcUrl }: GetUmiParams) => {
    return createUmiRaw(
        rpcUrl
    )
        .use(mplCore())
        .use(mplToolbox())
        .use(umiWalletAdapterIdentity(walletParams))
}