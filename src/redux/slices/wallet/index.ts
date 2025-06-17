import { combineReducers } from "@reduxjs/toolkit"
import { solanaWalletReducer } from "./solana-wallet"
// wallet slices
export * from "./solana-wallet"

export const walletReducer = combineReducers({
    solanaWallet: solanaWalletReducer,
})