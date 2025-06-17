import { TokenKey } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface TokenSheet {
    tokenKey?: TokenKey;
}

export interface NFTSheet {
    nftAddress?: string;
}

export interface GameItemSheet {
    gameItemKey?: string;
}

export interface BottomNavSheet {
    items?: Array<BottomNavSheetData>;
}

export interface BottomNavSheetData {
    name: string;
    icon: React.ElementType;
    path: string;
}

export enum NFTSheetPage {
    Main = "Main",
    Transfer = "Transfer",
}

export enum TokenSheetPage {
    Main = "Main",
    Transfer = "Transfer",
}

export interface WholesaleMarketBulkSheet {
    bulkId?: string;
}

export interface SheetSlice {
  tokenSheet: TokenSheet;
  nftSheet: NFTSheet;
  gameItemSheet: GameItemSheet;
  bottomNavSheet: BottomNavSheet;
  tokenSheetPage: TokenSheetPage;
  nftSheetPage: NFTSheetPage;
  wholesaleMarketBulkSheet: WholesaleMarketBulkSheet;
}

const initialState: SheetSlice = {
    tokenSheet: {},
    nftSheet: {},
    gameItemSheet: {},
    bottomNavSheet: {},
    tokenSheetPage: TokenSheetPage.Main,
    nftSheetPage: NFTSheetPage.Main,
    wholesaleMarketBulkSheet: {},
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
        setGameItemSheet: (state, action: PayloadAction<GameItemSheet>) => {
            state.gameItemSheet = action.payload
        },
        setBottomNavSheet: (state, action: PayloadAction<BottomNavSheet>) => {
            state.bottomNavSheet = action.payload
        },
        setWholesaleMarketBulkSheet: (state, action: PayloadAction<WholesaleMarketBulkSheet>) => {
            state.wholesaleMarketBulkSheet = action.payload
        },
    },
})

export const sheetReducer = sheetSlice.reducer
export const {
    setTokenSheet,
    setNFTSheet,
    setTokenSheetPage,
    setNFTSheetPage,
    setGameItemSheet,
    setBottomNavSheet,
    setWholesaleMarketBulkSheet,
} = sheetSlice.actions


