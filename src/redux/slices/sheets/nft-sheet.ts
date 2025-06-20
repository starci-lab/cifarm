import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum NFTSheetPage {
    Main = "Main",
    Transfer = "Transfer",
}

export interface NFTSheetState {
    page: NFTSheetPage
    nftAddress?: string
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
            return state
        },
        setNFTSheetNFTAddress: (state, action: PayloadAction<string>) => {
            state.nftAddress = action.payload
            return state
        }
    }
})

export const nftSheetReducer = nftSheetSlice.reducer
export const { setNFTSheetPage, setNFTSheetNFTAddress } = nftSheetSlice.actions