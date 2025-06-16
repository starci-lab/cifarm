import { ChainKey, Network, SolanaWalletData, WalletName } from "@/modules/blockchain"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PartialDeep } from "type-fest"

export interface WalletSlice {
    [ChainKey.Solana]: SolanaWalletData
}

const initialState: WalletSlice = {
    [ChainKey.Solana]: {
        network: Network.Mainnet,
        address: "",
        isLoading: false,
        isConnected: false,
        walletName: WalletName.Phantom,
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
        signAllTransactions: async () => {
            throw new Error("Not implemented")
        },
    },
}

export interface SetSolanaWalletPayload {
    chainKey: ChainKey
    walletData: PartialDeep<SolanaWalletData>
}

export const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        setSolanaWallet: (state, action: PayloadAction<SetSolanaWalletPayload>) => {
            if (action.payload.chainKey !== ChainKey.Solana) {
                return state
            }
            state[action.payload.chainKey] = {
                ...state[action.payload.chainKey],
                ...action.payload.walletData as SolanaWalletData,
            }
            return state
        },
        resetSolanaWallet: (state) => {
            state[ChainKey.Solana] = {
                ...state[ChainKey.Solana],
                address: "",
                // phantom session, will use in the future
                phantomSession: undefined,
                // phantom nonce, will use in the future
                phantomNonce: undefined,
                // phantom shared secret, will use in the future
                phantomSharedSecret: undefined,
                // phantom provider, will use in the future
                phantomProvider: undefined,
                // phantom provider, will use in the future
                isLoading: false,
                isConnected: false,
            }
            return state
        },
    },
})

export const walletReducer = walletSlice.reducer
export const { setSolanaWallet, resetSolanaWallet } = walletSlice.actions
