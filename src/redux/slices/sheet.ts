import { TokenKey } from "@/modules/entities"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface TokenSheet {
    tokenKey?: TokenKey;
}

export interface NFTSheet {
    nftAddress?: string;
}

export enum NFTSheetPage {
    Main = "Main",
    Transfer = "Transfer",
}

export enum TokenSheetPage {
    Main = "Main",
    Transfer = "Transfer",
}


export interface SheetSlice {
  tokenSheet: TokenSheet;
  nftSheet: NFTSheet;
  tokenSheetPage: TokenSheetPage;
  nftSheetPage: NFTSheetPage;
}

const initialState: SheetSlice = {
    tokenSheet: {},
    nftSheet: {},
    tokenSheetPage: TokenSheetPage.Main,
    nftSheetPage: NFTSheetPage.Main,
}

export const sheetSlice = createSlice({
    name: "sheet",
    initialState,
    reducers: {
        setTokenSheet: (state, action: PayloadAction<TokenSheet>) => {
            state.tokenSheet = action.payload
        },
        setNFTSheet: (state, action: PayloadAction<NFTSheet>) => {
            state.nftSheet = action.payload
        },
        setTokenSheetPage: (state, action: PayloadAction<TokenSheetPage>) => {
            state.tokenSheetPage = action.payload
        },
        setNFTSheetPage: (state, action: PayloadAction<NFTSheetPage>) => {
            state.nftSheetPage = action.payload
        },
    },
})

export const sheetReducer = sheetSlice.reducer
export const {
    setTokenSheet,
    setNFTSheet,
    setTokenSheetPage,
    setNFTSheetPage,
} = sheetSlice.actions


