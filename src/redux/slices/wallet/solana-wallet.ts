import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PartialDeep } from "type-fest"
import { Transaction } from "@solana/web3.js"
import { PhantomProvider, PhantomSignAndSendTransactionResult } from "@/types"
import { Umi } from "@metaplex-foundation/umi"

export enum SolanaWalletName {
    Phantom = "Phantom",
    Solflare = "Solflare",
    Backpack = "Backpack",
}

export interface SolanaWalletSlice  {
    address?: string
    // phantom session
    phantomSession?: string
    // phantom dapp key pair
    phantomDappKeyPair?: nacl.BoxKeyPair
    // phantom nonce
    phantomNonce?: Uint8Array
    // phantom shared secret
    phantomSharedSecret?: Uint8Array
    // phantom provider
    phantomProvider?: PhantomProvider
    isLoading: boolean
    isConnected: boolean
    // we return either value or void since in mobile deep link, we need to handle the case where the user is not connected to the wallet
    connect: () => Promise<void> | void
    disconnect: () => Promise<void> | void
    signMessage: (message: Uint8Array<ArrayBufferLike>) => Promise<Uint8Array<ArrayBufferLike> | void> | (Uint8Array<ArrayBufferLike> | void)
    signTransaction: (transaction: Transaction) => Promise<Transaction | void> | (Transaction | void)
    signAndSendTransaction: (transaction: Transaction) => Promise<PhantomSignAndSendTransactionResult | void> | (PhantomSignAndSendTransactionResult | void)
    signAllTransactions: (transactions: Array<Transaction>) => Promise<Array<Transaction> | void> | (Array<Transaction> | void)
    // wallet name in use
    walletName: SolanaWalletName
    // signed transactions, if one transaction is signed, we will store it here
    signedTransactions?: Array<string>
    // umi instance
    umi?: Umi
}

const initialState: SolanaWalletSlice = {
    isLoading: false,
    isConnected: false,
    walletName: SolanaWalletName.Phantom,
    // throw error for now, we will implement this in the future
    connect: async () => {
        throw new Error("Not implemented")
    },
    // throw error for now, we will implement this in the future
    disconnect: async () => {
        throw new Error("Not implemented")
    },
    // throw error for now, we will implement this in the future
    signMessage: async () => {
        throw new Error("Not implemented")
    },
    // throw error for now, we will implement this in the future
    signTransaction: async () => {
        throw new Error("Not implemented")
    },
    // throw error for now, we will implement this in the future
    signAndSendTransaction: async () => {
        throw new Error("Not implemented")
    },
    // throw error for now, we will implement this in the future
    signAllTransactions: async () => {
        throw new Error("Not implemented")
    },
}

export interface SetSolanaWalletPayload {
    data: PartialDeep<SolanaWalletSlice>
}

// solana wallet slice
export const solanaWalletSlice = createSlice({
    name: "solanaWallet",
    initialState,
    reducers: {
        setSolanaWallet: (state, action: PayloadAction<SetSolanaWalletPayload>) => {
            state = {
                ...state,
                ...action.payload,
            }
            return state
        },
        resetSolanaWallet: (state) => {
            state = {
                ...state,
                address: undefined,
                // reset phantom session
                phantomSession: undefined,
                // reset phantom nonce
                phantomNonce: undefined,
                // reset phantom shared secret
                phantomSharedSecret: undefined,
                // reset phantom provider
                phantomProvider: undefined,
                // reset is loading
                isLoading: false,
                isConnected: false,
            }
            return state
        },
        setUmi: (state, action: PayloadAction<Umi>) => {
            state = {
                ...state,
                umi: action.payload,
            }
            return state
        },
    },
})

export const solanaWalletReducer = solanaWalletSlice.reducer
export const { setSolanaWallet, resetSolanaWallet, setUmi } = solanaWalletSlice.actions
