import { Transaction } from "@solana/web3.js"
import { PhantomProvider, PhantomSignAndSendTransactionResult } from "../../../global"
import { Network } from "./common"

export interface TransferResult {
    txHash: string;
}

export interface SolanaWalletData {
    network: Network
    address: string
    // phantom session, will use in the future
    phantomSession?: string
    // phantom dapp key pair, will use in the future
    phantomDappKeyPair?: nacl.BoxKeyPair
    // phantom nonce, will use in the future
    phantomNonce?: Uint8Array
    // phantom shared secret, will use in the future
    phantomSharedSecret?: Uint8Array
    // phantom provider, will use in the future
    phantomProvider?: PhantomProvider
    isLoading: boolean
    isConnected: boolean
    connect: () => Promise<void> | void
    disconnect: () => Promise<void> | void
    signMessage: (message: Uint8Array<ArrayBufferLike>) => Promise<Uint8Array<ArrayBufferLike> | void> | (Uint8Array<ArrayBufferLike> | void)
    signTransaction: (transaction: Transaction) => Promise<Transaction | void> | (Transaction | void)
    signAndSendTransaction: (transaction: Transaction) => Promise<PhantomSignAndSendTransactionResult | void> | (PhantomSignAndSendTransactionResult | void)
    signAllTransactions: (transactions: Array<Transaction>) => Promise<Array<Transaction> | void> | (Array<Transaction> | void)
    walletName: WalletName
    // signed transaction, hook to trigger to frontend
    signedTransaction?: string
    // signed transactions, hook to trigger to frontend
    signedTransactions?: Array<string>
}

export enum WalletName {
    Phantom = "Phantom",
    Solflare = "Solflare",
    Backpack = "Backpack",
}