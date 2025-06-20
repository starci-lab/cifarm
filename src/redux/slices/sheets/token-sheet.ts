export enum TokenSheetPage {
    Main = "Main",
    Transfer = "Transfer",
}

import { TokenKey } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface TokenSheetState {
    page: TokenSheetPage
    tokenKey?: TokenKey
}

const initialState: TokenSheetState = {
    page: TokenSheetPage.Main,
}

export const tokenSheetSlice = createSlice({
    name: "tokenSheet",
    initialState,
    reducers: {
        setTokenSheetPage: (state, action: PayloadAction<TokenSheetPage>) => {
            state.page = action.payload
            return state
        },
        setTokenSheetTokenKey: (state, action: PayloadAction<TokenKey>) => {
            state.tokenKey = action.payload
            return state
        }
    }
})

export const tokenSheetReducer = tokenSheetSlice.reducer
export const { setTokenSheetPage, setTokenSheetTokenKey } = tokenSheetSlice.actions