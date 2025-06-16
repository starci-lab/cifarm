import { SolanaWalletData } from "@/modules/blockchain"
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters"
import { PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js"
export type Web3JsTransactionOrVersionedTransaction = Transaction | VersionedTransaction
export const umiWalletAdapterIdentity = (walletData: SolanaWalletData) => {
    return walletAdapterIdentity({
        publicKey: new PublicKey(walletData.address ?? ""),
        signMessage: async (message) => {
            return await walletData.signMessage?.(message) as Uint8Array<ArrayBufferLike>
        },
        signTransaction: async <T extends Web3JsTransactionOrVersionedTransaction>(transaction: T) => {
            console.log(transaction)
            return await walletData.signTransaction?.(transaction as unknown as Transaction) as T
        },
        signAllTransactions: async <T extends Web3JsTransactionOrVersionedTransaction>(transactions: Array<T>) => {
            return await walletData.signAllTransactions?.(transactions as unknown as Array<Transaction>) as Array<T>
        },
    })
}
