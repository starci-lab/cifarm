import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ChainKey } from "@/modules/blockchain"

export interface WalletConnectionRequiredModalState {
  chainKey: ChainKey;
}

const initialState: WalletConnectionRequiredModalState = {
    chainKey: ChainKey.Solana,
}

export const walletConnectionRequiredModalSlice = createSlice({
    name: "walletConnectionRequiredModal",
    initialState,
    reducers: {
        setWalletConnectionRequiredModalContent: (
            state,
            action: PayloadAction<WalletConnectionRequiredModalState>
        ) => {
            state = action.payload
        },
    },
})

export const walletConnectionRequiredModalReducer =
  walletConnectionRequiredModalSlice.reducer
export const { setWalletConnectionRequiredModalContent } =
  walletConnectionRequiredModalSlice.actions
