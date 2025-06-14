import { ChainKey, Network } from "@/modules/blockchain"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PartialDeep } from "type-fest"
import nacl from "tweetnacl"
import { Transaction } from "@solana/web3.js"

export interface WalletData<T> {
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
    isLoading: boolean
    isConnected: boolean
    connect: () => Promise<void> | void
    disconnect: () => Promise<void> | void
    signMessage: (message: string) => Promise<void> | void
    signTransaction: (transaction: T) => Promise<void> | void
    signAndSendTransaction: (transaction: T) => Promise<void> | void
}

export interface WalletSlice {
    [ChainKey.Solana]: WalletData<Transaction>
}

const initialState: WalletSlice = {
    [ChainKey.Solana]: {
        network: Network.Mainnet,
        address: "",
        isLoading: false,
        isConnected: false,
        connect: async () => {
            throw new Error("Not implemented")
        },
        disconnect: async () => {},
        signMessage: async () => {
            throw new Error("Not implemented")
        },
        signTransaction: async () => {
            throw new Error("Not implemented")
        },
        signAndSendTransaction: async () => {
            throw new Error("Not implemented")
        },
    },
}

export interface SetWalletPayload<T> {
    chainKey: ChainKey
    walletData: PartialDeep<WalletData<T>>
}

export const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        setWallet: (state, action: PayloadAction<SetWalletPayload<Transaction>>) => {
            if (action.payload.chainKey !== ChainKey.Solana) {
                return state
            }
            state[action.payload.chainKey] = {
                ...state[action.payload.chainKey],
                ...action.payload.walletData as WalletData<Transaction>,
            }
            return state
        },
        resetWallet: (state, action: PayloadAction<ChainKey>) => {
            if (action.payload !== ChainKey.Solana) {
                return state
            }
            state[action.payload] = {
                ...state[action.payload],
                address: "",
                // phantom session, will use in the future
                phantomSession: undefined,
                // phantom dapp key pair, will use in the future
                phantomDappKeyPair: undefined,
                // phantom nonce, will use in the future
                phantomNonce: undefined,
                // phantom shared secret, will use in the future
                phantomSharedSecret: undefined,
                isLoading: false,
                isConnected: false,
            }
            return state
        },
    },
})

export const walletReducer = walletSlice.reducer
export const { setWallet, resetWallet } = walletSlice.actions
