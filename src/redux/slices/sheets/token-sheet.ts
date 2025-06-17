export enum TokenSheetPage {
    Main = "Main",
    Transfer = "Transfer",
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface TokenSheetState {
    page: TokenSheetPage
}

const initialState: TokenSheetState = {
    page: TokenSheetPage.Main
}

export const tokenSheetSlice = createSlice({
    name: "tokenSheet",
    initialState,
    reducers: {
        setTokenSheetPage: (state, action: PayloadAction<TokenSheetPage>) => {
            state.page = action.payload
        }
    }
})

export const tokenSheetReducer = tokenSheetSlice.reducer
export const { setTokenSheetPage } = tokenSheetSlice.actions