import { mplCore } from "@metaplex-foundation/mpl-core"
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox"
import { createUmi as createUmiRaw } from "@metaplex-foundation/umi-bundle-defaults"
import {
    UninitializedWalletAdapterError,
} from "@metaplex-foundation/umi-signer-wallet-adapters"
import { UmiPlugin, signerIdentity, Transaction as UmiTransaction, Signer } from "@metaplex-foundation/umi"
import { Transaction, VersionedTransaction } from "@solana/web3.js"
import {
    fromWeb3JsTransaction,
    toWeb3JsTransaction,
} from "@metaplex-foundation/umi-web3js-adapters"
import { publicKey as umiPublicKey, PublicKey as UmiPublicKey } from "@metaplex-foundation/umi-public-keys"
export type Web3JsTransactionOrVersionedTransaction =
  | Transaction
  | VersionedTransaction;

export type CreateSignerFromWalletAdapterParams = {
  address: string;
  signMessage: (
    message: Uint8Array<ArrayBufferLike>
  ) =>
    | Promise<Uint8Array<ArrayBufferLike> | void>
    | (Uint8Array<ArrayBufferLike> | void);
  signTransaction: (
    transaction: Transaction
  ) => Promise<Transaction | void> | (Transaction | void);
  signAllTransactions: (
    transactions: Array<Transaction>
  ) => Promise<Array<Transaction> | void> | (Array<Transaction> | void);
};

export const createSignerFromWalletAdapter = (
    params: CreateSignerFromWalletAdapterParams
): Signer => {
    const { address, signMessage, signTransaction, signAllTransactions } = params

    return {
        get publicKey(): UmiPublicKey {
            if (!address) {
                throw new UninitializedWalletAdapterError()
            }

            return umiPublicKey(address)
        },
        signMessage: async (message: Uint8Array<ArrayBufferLike>) => {
            return (await signMessage?.(message)) as Uint8Array<ArrayBufferLike>
        },
        signTransaction: async (
            transaction: UmiTransaction
        ): Promise<UmiTransaction> => {
            const signedTransaction = (await signTransaction?.(
        toWeb3JsTransaction(transaction) as unknown as Transaction
            )) as unknown as VersionedTransaction
            if (!signedTransaction) {
                return transaction
            }
            return fromWeb3JsTransaction(signedTransaction)
        },
        signAllTransactions: async (
            transactions: Array<UmiTransaction>
        ): Promise<Array<UmiTransaction>> => {
            const signedTransactions = (await signAllTransactions?.(
        transactions.map(toWeb3JsTransaction) as unknown as Array<Transaction>
            )) as unknown as Array<VersionedTransaction>
            if (!signedTransactions) {
                return transactions
            }
            return signedTransactions.map(fromWeb3JsTransaction)
        },
    }
}

export const walletAdapterIdentity = (
    walletAdapter: CreateSignerFromWalletAdapterParams,
    setPayer = true
): UmiPlugin => ({
    install(umi) {
        const signer = createSignerFromWalletAdapter(walletAdapter)
        umi.use(signerIdentity(signer, setPayer))
    },
})
          

export interface GetUmiParams {
  walletParams: CreateSignerFromWalletAdapterParams;
  rpcUrl: string;
}
// umi utils to get umi instance
export const createUmi = ({ walletParams, rpcUrl }: GetUmiParams) => {
    return createUmiRaw(rpcUrl)
        .use(mplCore())
        .use(mplToolbox())
        .use(walletAdapterIdentity(walletParams))
}
