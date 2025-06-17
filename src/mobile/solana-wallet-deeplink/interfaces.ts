import { Network } from "@/modules/blockchain"
import { Transaction } from "@solana/web3.js"

export interface IWalletData {
    network: Network
    address: string
    publicKey: string
    privateKey: string
    isLoading: boolean
    isConnected: boolean
    connect: () => Promise<void>
    disconnect: () => Promise<void>
    signMessage: (message: string) => Promise<void>
    signTransaction: (transaction: Transaction) => Promise<void>
    signAllTransactions: (transactions: Array<Transaction>) => Promise<void>
    signAndSendTransaction: (transaction: Transaction) => Promise<void>
}