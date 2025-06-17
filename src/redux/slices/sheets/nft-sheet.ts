import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum NFTSheetPage {
    Main = "Main",
    Transfer = "Transfer",
}

export interface NFTSheetState {
    page: NFTSheetPage
}

const initialState: NFTSheetState = {
    page: NFTSheetPage.Main
}

export const nftSheetSlice = createSlice({
    name: "nftSheet",
    initialState,
    reducers: {
        setNFTSheetPage: (state, action: PayloadAction<NFTSheetPage>) => {
            state.page = action.payload
        }
    }
})

export const nftSheetReducer = nftSheetSlice.reducer
export const { setNFTSheetPage } = nftSheetSlice.actions